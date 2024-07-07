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

import { Component, Injectable, JSX_CreateElement, ProgressSpinner, Router } from "acfrontend";
import { WordCreationData, WordType, WordVerbDerivationType, WordWordDerivationType } from "../../dist/api";
import { APIService } from "../services/APIService";
import { WordEditorComponent } from "./WordEditorComponent";

@Injectable
export class AddWordComponent extends Component
{
    constructor(private apiService: APIService, private router: Router)
    {
        super();

        this.data = {
            word: "",
            isMale: null,
            related: [],
            functions: [{
                id: -1,
                translations: [],
                type: WordType.Noun,
            }]
        };
        if(router.state.Get().queryParams.relatedWordId !== undefined)
        {
            this.data.derivation = {
                refWordId: parseInt(router.state.Get().queryParams.relatedWordId!),
                relationType: WordWordDerivationType.Feminine
            };
        }
        else if(router.state.Get().queryParams.rootId !== undefined)
        {
            this.data.derivation = {
                rootId: parseInt(router.state.Get().queryParams.rootId!)
            };
        }
        else if(router.state.Get().queryParams.verbId !== undefined)
        {
            this.data.derivation = {
                verbId: parseInt(router.state.Get().queryParams.verbId!),
                type: WordVerbDerivationType.VerbalNoun
            };
        }

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
    private data: WordCreationData;
    private loading: boolean;

    private async OnCreateWord()
    {
        this.loading = true;

        const response = await this.apiService.words.post({
            word: this.data.word,
            isMale: this.data.isMale,
            derivation: this.data.derivation,
            related: this.data.related,
            functions: this.data.functions
        });

        this.router.RouteTo("/words/" + response.data);
    }
}