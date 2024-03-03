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

import { Component, Injectable, JSX_CreateElement, Router } from "acfrontend";
import { APIService } from "../APIService";
import { RootEditorComponent } from "./RootEditorComponent";
import { RootCreationData } from "../../dist/api";
import { AreValidRootCharacters } from "./general";

@Injectable
export class AddRootComponent extends Component
{
    constructor(private router: Router, private apiService: APIService)
    {
        super();

        this.data = {
            description: "",
            flags: 0,
            radicals: ""
        };
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            <RootEditorComponent data={this.data} onDataChanged={this.Update.bind(this)} />

            <button disabled={!AreValidRootCharacters(this.data.radicals)} className="btn btn-primary" type="button" onclick={this.OnCreateRoot.bind(this)}>Create</button>
        </fragment>;
    }

    //Private state
    private data: RootCreationData;

    //Event handlers
    private async OnCreateRoot()
    {
        const response = await this.apiService.roots.post(this.data);
        this.router.RouteTo("/roots/" + response.data);
    }
}