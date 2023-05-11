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

import { Component, FormField, Injectable, JSX_CreateElement, LineEdit, ProgressSpinner, Router, RouterState } from "acfrontend";
import { APIService } from "../APIService";

@Injectable
export class EditRootComponent extends Component
{
    constructor(private router: Router, routerState: RouterState, private apiService: APIService)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.radicals = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.radicals === null)
            return <ProgressSpinner />;

        return <fragment>
            <FormField title="Radicals" description="The radicals that make up the root">
                <LineEdit value={this.radicals} onChanged={newValue => this.radicals = newValue} />
            </FormField>

            Root: {this.radicals.split("").join("-")}

            <button className="btn btn-primary" type="button" onclick={this.OnSaveRoot.bind(this)}>Save</button>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private radicals: string | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.roots._any_.get(this.rootId);

        if(response.statusCode != 200)
            throw new Error("TODO: implement me");
        this.radicals = response.data.radicals;
    }

    private async OnSaveRoot()
    {
        await this.apiService.roots._any_.put(this.rootId, { radicals: this.radicals! });
        this.router.RouteTo("/roots/" + this.rootId);
    }
}