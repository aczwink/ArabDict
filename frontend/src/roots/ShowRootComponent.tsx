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
import { APIService } from "../services/APIService";
import { VerbPreviewComponent } from "../verbs/VerbPreviewComponent";
import { WordOverviewComponent } from "../words/WordOverviewComponent";
import { RootToString } from "./general";
import { LETTER_RA, Letter, QAF } from "arabdict-domain/src/Definitions";
import { ConjugationService } from "../services/ConjugationService";
import { Subscription } from "../../../../ACTS-Util/core/dist/main";

interface ShowRootData
{
    root: RootCreationData;
    verbs: VerbData[];
}

@Injectable
export class ShowRootComponent extends Component
{
    constructor(routerState: RouterState, private apiService: APIService, private router: Router, private conjugationService: ConjugationService)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.data = null;
        this.derivedWords = null;
        this.editSubscription = this.conjugationService.canEdit.Subscribe(this.Update.bind(this));
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const canEdit = this.conjugationService.canEdit.Get();
        return <fragment>
            <div className="row">
                <div className="col"><h2>Root: {RootToString(this.data.root)}</h2></div>
                <div className="col-auto">
                    {canEdit ? this.RenderEditControls() : null}
                </div>
            </div>
            {this.data!.root.description}
            <a href={"http://ejtaal.net/aa#bwq=" + this.ToBuckwalterTransilteration()} target="_blank">See on Mawrid reader</a>

            <h4>Verbs</h4>
            {this.data.verbs.map(x => <VerbPreviewComponent root={this.data!.root} verbData={x} />)}
            {canEdit ? <RouterButton className="btn btn-primary" route={"/roots/" + this.rootId + "/addverb"}><BootstrapIcon>plus</BootstrapIcon></RouterButton> : null}
            <h4>Words</h4>
            {this.RenderDerivedWords()}
            {canEdit ? <RouterButton className="btn btn-primary" route={"/words/add?rootId=" + this.rootId}><BootstrapIcon>plus</BootstrapIcon></RouterButton> : null}
        </fragment>;
    }

    //Private state
    private rootId: number;
    private data: ShowRootData | null;
    private derivedWords: FullWordData[] | null;
    private editSubscription: Subscription;

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

    private RenderEditControls()
    {
        return <fragment>
            <Anchor route={"roots/" + this.rootId + "/edit"}><MatIcon>edit</MatIcon></Anchor>
            <a href="#" className="link-danger" onclick={this.OnDeleteRoot.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
        </fragment>;
    }

    private ToBuckwalterTransilteration()
    {
        function ejtaal(char: string)
        {
            switch(char)
            {
                case Letter.Hamza:
                    return "A";
                case Letter.Ba:
                    return "b";
                case Letter.Tha:
                    return "v";
                case Letter.Jiim:
                    return "j";
                case Letter.Hha:
                    return "H";
                case Letter.Kha:
                    return "x";
                case Letter.Dal:
                    return "d";
                case LETTER_RA:
                    return "r";
                case Letter.Zay:
                    return "z";
                case Letter.Siin:
                    return "s";
                case Letter.Shiin:
                    return "$";
                case Letter.Saad:
                    return "S";
                case Letter.Daad:
                    return "D";
                case Letter.Tta:
                    return "T";
                case Letter.A3ein:
                    return "E";
                case Letter.Fa:
                    return "f";
                case QAF:
                    return "q";
                case Letter.Kaf:
                    return "k";
                case Letter.Lam:
                    return "l";
                case Letter.Nun:
                    return "n";
                case Letter.Ha:
                    return "h";
                case Letter.Ya:
                    return "y";
            }
        }
        return this.data!.root.radicals.split("").map(ejtaal).join("");
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

    override OnUnmounted(): void
    {
        this.editSubscription.Unsubscribe();
    }
}