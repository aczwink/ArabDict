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

import { Component, FormField, Injectable, JSX_CreateElement, LineEdit, ProgressSpinner } from "acfrontend";
import { APIService } from "../APIService";
import { RootCreationData, VerbData } from "../../dist/api";
import { VerbPreviewComponent } from "./VerbPreviewComponent";

@Injectable
export class SearchVerbsComponent extends Component
{
    constructor(private apiService: APIService)
    {
        super();

        this.filter = "";
        this.data = [];
        this.roots = [];
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            <h3>Verbs</h3>
            <FormField title="Translation">
                <LineEdit value={this.filter} onChanged={newValue => this.filter = newValue} />
            </FormField>
            <button type="button" onclick={this.LoadData.bind(this)}>Search</button>

            {this.RenderTable()}
        </fragment>;
    }

    //Private state
    private filter: string;
    private data: VerbData[] | null;
    private roots: RootCreationData[];

    //Private methods
    private async LoadData()
    {
        this.data = null;

        const response = await this.apiService.verbs.search.get({ byTranslation: this.filter });
        const result = response.data;

        const response2 = await result.Values().Map(async x => {
            const res = await this.apiService.roots._any_.get(x.rootId);
            if(res.statusCode !== 200)
                throw new Error("HERE");
            return res.data;
        }).PromiseAll();

        this.roots = response2;
        this.data = result;
    }

    private RenderTable()
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <div className="row">
            {this.data.map( (x, i) => <VerbPreviewComponent root={this.roots[i]} verbData={x} />)}
        </div>;
    }
}