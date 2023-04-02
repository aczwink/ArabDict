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

import { Component, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, Textarea } from "acfrontend";
import { VerbData } from "../../dist/api";
import { APIService } from "../APIService";

@Injectable
export class EditVerbTranslationComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = null;
        this.translation = "";
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;
        return <fragment>
            <Textarea value={this.translation} onChanged={newValue => this.translation = newValue} columns={80} rows={12} />
            <button type="button" onclick={this.OnSave.bind(this)}>Save</button>
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: VerbData | null;
    private translation: string;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.verbs.get({ verbId: this.verbId });
        if(response.statusCode !== 200)
            throw new Error("TODO implement me");
        this.translation = response.data.translation;
        this.data = response.data;
    }

    private async OnSave()
    {
        await this.apiService.verbs.translation.put({
            verbId: this.verbId,
            translation: this.translation
        });

        this.router.RouteTo("/verbs/" + this.verbId);
    }
}