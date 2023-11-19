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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, Router, RouterButton, RouterState, TitleService } from "acfrontend";
import { APIService } from "../APIService";
import { AnyWordData, VerbData, WordRelation, WordRelationType, WordVerbReferenceData } from "../../dist/api";
import { RenderTranslations } from "../shared/translations";
import { WordTypeToText } from "../shared/words";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { ConjugationService } from "../ConjugationService";
import { WordIdReferenceComponent } from "./WordReferenceComponent";

@Injectable
export class ShowWordComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router, private conjugationService: ConjugationService, private titleService: TitleService)
    {
        super();

        this.wordId = parseInt(routerState.routeParams.wordId!);
        this.data = null;
        this.rootRadicals = "";
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            <div className="row">
                <div className="col"><h1>Word: {this.data.word}</h1></div>
                <div className="col-auto">
                    <Anchor route={"words/" + this.data.id + "/edit"}><MatIcon>edit</MatIcon></Anchor>
                    <a href="#" className="link-danger" onclick={this.OnDeleteWord.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Type:</th>
                        <td>{WordTypeToText(this.data.type)}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>{this.RenderGender(this.data.isMale)}</td>
                    </tr>
                    {this.RenderVerbData(this.data.verbData)}
                    <tr>
                        <th>Translation:</th>
                        <td>{RenderTranslations(this.data.translations)}</td>
                    </tr>
                </tbody>
            </table>

            <br />
            <h5>Relationships to other words</h5>
            {this.RenderOutgoingRelations()}
            {this.RenderIncomingRelations()}

            <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(this.data.word)} target="_blank">See on Wiktionary</a>
            <br />
            <RouterButton className="btn btn-primary" route={"/words/add?relatedWordId=" + this.wordId}><BootstrapIcon>plus</BootstrapIcon> Add related word</RouterButton>
        </fragment>;
    }

    //Private state
    private wordId: number;
    private data: AnyWordData | null;
    private verb?: VerbData;
    private rootRadicals: string;

    //Private methods
    private RelationshipToText(relationType: WordRelationType, outgoing: boolean)
    {
        switch(relationType)
        {
            case WordRelationType.Feminine:
                return outgoing ? "female version" : "male version";
            case WordRelationType.Plural:
                return outgoing ? "plural" : "singular";
        }
    }

    private RenderGender(isMale: boolean | null)
    {
        if(isMale)
            return "male";
        else if(isMale === false)
            return "female";
        return "unknown";
    }

    private RenderRelation(outgoing: boolean, relation: WordRelation)
    {
        return <li>
            {this.RelationshipToText(relation.relationType, outgoing)} of <WordIdReferenceComponent wordId={relation.refWordId} />
        </li>;
    }

    private RenderIncomingRelations()
    {
        return <ul>
            {this.data!.incomingRelations.map(this.RenderRelation.bind(this, false))}
        </ul>;
    }

    private RenderOutgoingRelations()
    {
        return <ul>
            {this.data!.outgoingRelations.map(this.RenderRelation.bind(this, true))}
        </ul>;
    }

    private RenderVerbData(verbData: WordVerbReferenceData | undefined)
    {
        if(verbData === undefined)
            return null;

        const verbalNoun = verbData.isVerbalNoun ? "verbal noun of " : "";
        const conjugated = this.conjugationService.Conjugate(this.rootRadicals, this.verb!.stem, "perfect", "active", "male", "third", "singular", "indicative", this.verb!.stem1Context);

        return <tr>
            <th>Derived from verb:</th>
            <td>{verbalNoun}<Anchor route={"/verbs/" + verbData.verbId}>{conjugated}</Anchor></td>
        </tr>;
    }

    //Event handlers
    private async OnDeleteWord(event: Event)
    {
        event.preventDefault();

        if(confirm("Are you sure that you want to delete the word: " + this.data!.word + "?"))
        {
            const word = this.data!;
            this.data = null;
            await this.apiService.words._any_.delete(this.wordId);
            
            if(word.verbData === undefined)
                this.router.RouteTo("/underived_words");
            else
                this.router.RouteTo("/verbs/" + word.verbData.verbId);
        }
    }

    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.words._any_.get(this.wordId);
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");

        if(response.data.verbData !== undefined)
        {
            const response2 = await this.apiService.verbs.get({ verbId: response.data.verbData.verbId });
            if(response2.statusCode !== 200)
                throw new Error("TODO: implement me");
            this.verb = response2.data;

            const response3 = await this.apiService.roots._any_.get(response2.data.rootId);
            if(response3.statusCode !== 200)
                throw new Error("TODO: implement me");
            this.rootRadicals = response3.data.radicals;
        }
            
        this.data = response.data;
        this.titleService.title = this.data.word;
    }
}