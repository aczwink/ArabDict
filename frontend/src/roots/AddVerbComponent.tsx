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

import { Component, FormField, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, Select, SingleSelect } from "acfrontend";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";
import { CreateVerb } from "arabdict-domain/src/CreateVerb";
import { RootCreationData } from "../../dist/api";
import { Stem1ContextData, VerbEditorComponent } from "../verbs/VerbEditorComponent";

@Injectable
export class AddVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.root = null;
        this.stem = 1;

        this.stem1Context = {
            stem1MiddleRadicalTashkil: "\u064E",
            stem1MiddleRadicalTashkilPresent: "\u064E"
        };
    }
    
    protected Render(): RenderValue
    {
        if(this.root === null)
            return <ProgressSpinner />;

        const stems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const verb = CreateVerb(this.root.radicals, this.stem, { middleRadicalTashkil: this.stem1Context.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: this.stem1Context.stem1MiddleRadicalTashkilPresent });

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={newValue => this.stem = parseInt(newValue[0])}>
                    {stems.map(x => <option value={x} selected={this.stem === x}><RomanNumberComponent num={x} /></option>)}
                </Select>
            </FormField>
            <VerbEditorComponent stem={this.stem} stem1Context={this.stem1Context} verb={verb} onChanged={this.Update.bind(this)} />
            
            <button className="btn btn-primary" type="button" onclick={this.OnCreateVerb.bind(this)}>Create</button>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private root: RootCreationData | null;
    private stem: number;
    private stem1Context: Stem1ContextData;

    //Event handlers
    private async OnCreateVerb()
    {
        await this.apiService.verbs.post({
            rootId: this.rootId,
            stem: this.stem,
            stem1MiddleRadicalTashkil: this.stem1Context.stem1MiddleRadicalTashkil,
            stem1MiddleRadicalTashkilPresent: this.stem1Context.stem1MiddleRadicalTashkilPresent
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