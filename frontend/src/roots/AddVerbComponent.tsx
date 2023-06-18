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
import { APIService } from "../APIService";
import { RootCreationData, VerbUpdateData } from "../../dist/api";
import { VerbEditorComponent } from "../verbs/VerbEditorComponent";

@Injectable
export class AddVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.root = null;

        this.data = {
            stem: 1,
            stem1MiddleRadicalTashkil: "\u064E",
            stem1MiddleRadicalTashkilPresent: "\u064E",
            translations: [],
            verbalNounIds: []
        };
    }
    
    protected Render(): RenderValue
    {
        if(this.root === null)
            return <ProgressSpinner />;

        const stem1ctx = { middleRadicalTashkil: this.data.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: this.data.stem1MiddleRadicalTashkilPresent };
        return <fragment>
            <VerbEditorComponent data={this.data} rootRadicals={this.root.radicals} stem1ctx={stem1ctx} onChanged={this.Update.bind(this)} />
            
            <button className="btn btn-primary" type="button" onclick={this.OnCreateVerb.bind(this)}>Create</button>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private root: RootCreationData | null;
    private data: VerbUpdateData;

    //Event handlers
    private async OnCreateVerb()
    {
        await this.apiService.verbs.post({
            rootId: this.rootId,
            stem: this.data.stem,
            stem1MiddleRadicalTashkil: this.data.stem1MiddleRadicalTashkil,
            stem1MiddleRadicalTashkilPresent: this.data.stem1MiddleRadicalTashkilPresent,
            translations: this.data.translations,
            verbalNounIds: this.data.verbalNounIds
        });

        this.router.RouteTo("/roots/" + this.rootId);
    }

    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.roots._any_.get(this.rootId);
        if(response.statusCode !== 200)
            throw new Error("TODO implement me");

        this.root = response.data;
    }
}