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

import { Component, FormField, Injectable, JSX_CreateElement, LineEdit, ProgressSpinner, Router, RouterState, Select } from "acfrontend";
import { WordCreationData, WordType } from "../../dist/api";
import { APIService } from "../APIService";
import { WordEditorComponent } from "../words/WordEditorComponent";

@Injectable
export class AddWordComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = {
            type: WordType.Adjective,
            translations: [],
            word: "",
        };
        this.loading = false;
    }
    
    protected Render(): RenderValue
    {
        if(this.loading)
            return <ProgressSpinner />;

        return <fragment>
            <h1>Add word</h1>
            <WordEditorComponent data={this.data} onDataChanged={this.Update.bind(this)} />

            <button type="button" className="btn btn-primary" disabled={this.data.word.trim().length === 0} onclick={this.OnCreateWord.bind(this)}>Add</button>
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: WordCreationData;
    private loading: boolean;

    private async OnCreateWord()
    {
        this.loading = true;

        await this.apiService.words.post({
            type: this.data.type,
            word: this.data.word,
            verbId: this.verbId,
            translations: this.data.translations,
        });

        this.router.RouteTo("/verbs/" + this.verbId);
    }
}