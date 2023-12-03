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

import { Component, FormField, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, Select } from "acfrontend";
import { WordCreationData, WordType, WordVerbDerivationType } from "../../dist/api";
import { APIService } from "../APIService";
import { ConjugationService } from "../ConjugationService";

@Injectable
export class AddVerbalNounComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router, private conjugationService: ConjugationService)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = {
            type: WordType.Noun,
            translations: [],
            word: "",
            isMale: false,
            outgoingRelations: []
        };
        this.choices = [];
        this.loading = true;
    }
    
    protected Render(): RenderValue
    {
        if(this.loading)
            return <ProgressSpinner />;

        return <fragment>
            <h1>Add verbal noun / الْمَصَادِر</h1>

            <FormField title="Word">
                <Select onChanged={newValue => this.data.word = newValue[0]}>
                    {this.choices.map(x => <option selected={this.data.word === x}>{x}</option>)}
                </Select>
            </FormField>

            <FormField title="Gender">
                <div className="row">
                    <div className="col-auto"><label><input type="radio" checked={this.data.isMale === true} onclick={this.OnGenderChanged.bind(this, true)} /> Male</label></div>
                    <div className="col-auto"><label><input type="radio" checked={this.data.isMale === false} onclick={this.OnGenderChanged.bind(this, false)} /> Female</label></div>
                </div>
            </FormField>

            <button type="button" className="btn btn-primary" disabled={this.data.word.trim().length === 0} onclick={this.OnCreateWord.bind(this)}>Add</button>
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: WordCreationData;
    private loading: boolean;
    private choices: string[];

    private async OnCreateWord()
    {
        this.loading = true;

        await this.apiService.words.post({
            type: this.data.type,
            word: this.data.word,
            translations: this.data.translations,
            isMale: this.data.isMale,
            derivation: {
                type: WordVerbDerivationType.VerbalNoun,
                verbId: this.verbId,
            },
            outgoingRelations: this.data.outgoingRelations
        });

        this.router.RouteTo("/verbs/" + this.verbId);
    }

    private OnGenderChanged(newValue: boolean)
    {
        this.data.isMale = newValue;
        this.Update();
    }

    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.verbs.get({ verbId: this.verbId});
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");

        const response2 = await this.apiService.roots._any_.get(response.data.rootId);
        if(response2.statusCode !== 200)
            throw new Error("TODO: implement me");
        
        this.choices = this.conjugationService.GenerateAllPossibleVerbalNouns(response2.data.radicals, response.data.stem);
        this.data.word = this.choices[0];

        this.loading = false;
    }
}