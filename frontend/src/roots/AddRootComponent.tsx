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

import { Component, FormField, Injectable, JSX_CreateElement, LineEdit, Router } from "acfrontend";
import { APIService } from "../APIService";

@Injectable
export class AddRootComponent extends Component
{
    constructor(private router: Router, private apiService: APIService)
    {
        super();

        this.radicals = "";
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            <FormField title="Radicals" description="The radicals that make up the root">
                <LineEdit value={this.radicals} onChanged={newValue => this.radicals = newValue} />
            </FormField>

            Root: {this.radicals.split("").join("-")}

            <button className="btn btn-primary" type="button" onclick={this.OnCreateRoot.bind(this)}>Create</button>
        </fragment>;
    }

    //Private state
    private radicals: string;

    //Event handlers
    private async OnCreateRoot()
    {
        const response = await this.apiService.roots.post({ radicals: this.radicals, description: "", flags: 0 });
        this.router.RouteTo("/roots/" + response.data);
    }
}