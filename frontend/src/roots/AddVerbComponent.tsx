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

import { Component, FormField, Injectable, JSX_CreateElement, Router, RouterState, Select, SingleSelect } from "acfrontend";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";

@Injectable
export class AddVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.rootId = parseInt(routerState.routeParams.rootId!);
        this.stem = 1;
        this.stem1tashkil = "\u064E";
    }
    
    protected Render(): RenderValue
    {
        const stems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={newValue => this.stem = parseInt(newValue[0])}>
                    {stems.map(x => <option value={x} selected={this.stem === x}><RomanNumberComponent num={x} /></option>)}
                </Select>
            </FormField>
            {this.RenderStem1TashkilSelect()}
            <button type="button" onclick={this.OnCreateVerb.bind(this)}>Create</button>
        </fragment>;
    }

    //Private state
    private rootId: number;
    private stem: number;
    private stem1tashkil: string;

    //Private methods
    private RenderStem1TashkilSelect()
    {
        const tashkil = ["\u064E", "\u064F", "\u0650"];
        const tashkilDisplayName = ["فتحة", "ضمة", "كسرة"];

        if(this.stem != 1)
            return null;
        return <FormField title="Tashkil for middle radical">
            <SingleSelect onSelectionChanged={newIndex => this.stem1tashkil = tashkil[newIndex]} selectedIndex={tashkil.indexOf(this.stem1tashkil)}>
                {tashkilDisplayName.map( (x, i) => x + ": " + tashkil[i])}
            </SingleSelect>
        </FormField>;
    }

    //Event handlers
    private async OnCreateVerb()
    {
        await this.apiService.verbs.post({
            rootId: this.rootId,
            stem: this.stem,
            stem1MiddleRadicalTashkil: this.stem1tashkil
        });

        this.router.RouteTo("/roots/" + this.rootId);
    }
}