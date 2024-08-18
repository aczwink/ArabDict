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

import { Component, FormField, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, TextArea } from "acfrontend";
import { APIService } from "../services/APIService";
import { RootCreationData } from "../../dist/api";
import { RootEditorComponent } from "./RootEditorComponent";
import { DoRootCharactersFormValidRoot } from "./general";

@Injectable
export class EditRootComponent extends Component
{
    constructor(private router: Router, routerState: RouterState, private apiService: APIService)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.data = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            <RootEditorComponent data={this.data} onDataChanged={this.Update.bind(this)} />

            <FormField title="Description" description="Descriptive text about the root">
                <TextArea value={this.data.description} onChanged={newValue => {this.data!.description = newValue; this.Update();}} />
            </FormField>

            <button disabled={!DoRootCharactersFormValidRoot(this.data.radicals)} className="btn btn-primary" type="button" onclick={this.OnSaveRoot.bind(this)}>Save</button>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private data: RootCreationData | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.roots._any_.get(this.rootId);

        if(response.statusCode != 200)
            throw new Error("TODO: implement me");
        this.data = response.data;
    }

    private async OnSaveRoot()
    {
        await this.apiService.roots._any_.put(this.rootId, this.data!);
        this.router.RouteTo("/roots/" + this.rootId);
    }
}