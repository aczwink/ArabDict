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

import { Component, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState } from "acfrontend";
import { WordEditorComponent } from "./WordEditorComponent";
import { APIService } from "../APIService";
import { AnyWordData } from "../../dist/api";

@Injectable
export class EditWordComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.wordId = parseInt(routerState.routeParams.wordId!);
        this.data = null;
        this.origName = "";
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            <h1>Edit word: {this.origName}</h1>
            <WordEditorComponent data={this.data} onDataChanged={this.Update.bind(this)} />

            <button type="button" className="btn btn-primary" disabled={this.data.word.trim().length === 0} onclick={this.OnUpdateWord.bind(this)}>Save</button>
        </fragment>
    }

    //Private state
    private wordId: number;
    private data: AnyWordData | null;
    private origName: string;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.words._any_.get(this.wordId);
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");
            
        this.origName = response.data.word;
        this.data = response.data;
    }

    private async OnUpdateWord()
    {
        const data = this.data!;
        this.data = null;

        await this.apiService.words._any_.put(this.wordId, data);

        this.router.RouteTo("/words/" + this.wordId);
    }
}