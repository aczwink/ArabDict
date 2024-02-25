/**
 * ArabDict
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * */

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, Router, RouterButton, RouterState } from "acfrontend";
import { FullWordData, RootCreationData, VerbData } from "../../dist/api";
import { APIService } from "../APIService";
import { VerbPreviewComponent } from "../verbs/VerbPreviewComponent";
import { WordOverviewComponent } from "../words/WordOverviewComponent";
import { RootToString } from "./general";

interface ShowRootData
{
    root: RootCreationData;
    verbs: VerbData[];
}

@Injectable
export class ShowRootComponent extends Component
{
    constructor(routerState: RouterState, private apiService: APIService, private router: Router)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.data = null;
        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;
        
        return <fragment>
            <div className="row">
                <div className="col"><h2>Root: {RootToString(this.data.root)}</h2></div>
                <div className="col-auto">
                    <Anchor route={"roots/" + this.rootId + "/edit"}><MatIcon>edit</MatIcon></Anchor>
                    <a href="#" className="link-danger" onclick={this.OnDeleteRoot.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
                </div>
            </div>

            {this.data!.root.description}
            <h4>Verbs</h4>
            {this.data.verbs.map(x => <VerbPreviewComponent root={this.data!.root} verbData={x} />)}
            <RouterButton className="btn btn-primary" route={"/roots/" + this.rootId + "/addverb"}><BootstrapIcon>plus</BootstrapIcon></RouterButton>
            <h4>Words</h4>
            {this.RenderDerivedWords()}
            <RouterButton className="btn btn-primary" route={"/words/add?rootId=" + this.rootId}><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private data: ShowRootData | null;
    private derivedWords: FullWordData[] | null;

    //Private methods
    private RenderDerivedWords()
    {
        if(this.derivedWords === null)
            return <ProgressSpinner />;

        return <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Translation</th>
                </tr>
            </thead>
            <tbody>
                {this.derivedWords.map(x => <WordOverviewComponent word={x} />)}
            </tbody>
        </table>;
    }

    //Event handlers
    private async OnDeleteRoot(event: Event)
    {
        event.preventDefault();

        if(confirm("Are you sure that you want to delete the verb: " + RootToString(this.data!.root) + "?"))
        {
            this.data = null;
            await this.apiService.roots._any_.delete(this.rootId);
            
            this.router.RouteTo("/roots");
        }
    }

    override async OnInitiated(): Promise<void>
    {
        const response1 = await this.apiService.roots._any_.get(this.rootId);
        const response2 = await this.apiService.roots._any_.verbs.get(this.rootId);

        if(response1.statusCode != 200)
            throw new Error("TODO: implement me");

        this.data = {
            root: response1.data,
            verbs: response2.data
        };

        const response3 = await this.apiService.roots._any_.words.get(this.rootId);
        this.derivedWords = response3.data;
    }
}