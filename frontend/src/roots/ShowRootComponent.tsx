/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, RouterButton, RouterState } from "acfrontend";
import { RootCreationData, VerbData } from "../../dist/api";
import { APIService } from "../APIService";
import { VerbComponent } from "./VerbComponent";
import { RootType, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { CreateVerb } from "arabdict-domain/src/CreateVerb";

interface ShowRootData
{
    root: RootCreationData;
    verbs: VerbData[];
}

@Injectable
export class ShowRootComponent extends Component
{
    constructor(routerState: RouterState, private apiService: APIService)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.data = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;
        
        const root = new VerbRoot(this.data!.root.radicals);
        return <fragment>
            <h2>Root: {root.radicalsAsSeparateLetters.join("-")} <Anchor route={"/roots/" + this.rootId + "/edit"}><MatIcon>edit</MatIcon></Anchor></h2>
            {this.data.verbs.map(x => <VerbComponent root={this.data!.root} verbData={x} />)}
            <RouterButton className="btn btn-primary" route={"/roots/" + this.rootId + "/addverb"}><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private data: ShowRootData | null;

    //Event handlers
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
    }
}