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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, NavItem, ProgressSpinner, RouterButton, RouterState } from "acfrontend";
import { RootData } from "../../dist/api";
import { APIService } from "../APIService";

interface AlphabetRange
{
    first: number;
    count: number;
}

const alphabetChars: AlphabetRange[] = [
    { first: 0x0627, count: 2}, //alef and ba
    { first: 0x062A, count: 17}, //ta - ghain
    { first: 0x0641, count: 8}, //fa - waw
    { first: 0x064A, count: 1}, //ya
];

@Injectable
export class ListRootsComponent extends Component
{
    constructor(routerState: RouterState, private apiService: APIService)
    {
        super();

        this.queryChar = routerState.queryParams.char || null;
        this.data = null;
    }

    protected Render(): RenderValue
    {
        return <fragment>
            <ul className="nav nav-pills">
                {alphabetChars.map(this.RenderRange.bind(this))}
            </ul>
            {this.RenderTable()}
            <RouterButton route="/roots/add"><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>;
    }

    //Private state
    private queryChar: string | null;
    private data: RootData[] | null;

    //Private methods
    private RenderRange(range: AlphabetRange)
    {
        const elems = [];
        for(let i = 0; i < range.count; i++)
        {
            const char = String.fromCodePoint(range.first + i);
            elems.push(
                <li><Anchor class={"nav-link" + (char === this.queryChar ? " active" : "")} route={"/roots?char=" + char}>{char}</Anchor></li>
            );
        }
        return elems;
    }

    private RenderTable()
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th>Root</th>
                </tr>
            </thead>
            <tbody>
                {this.data.map(x => <tr><td><Anchor route={"/roots/" + x.id}>{x.radicals}</Anchor></td></tr>)}
            </tbody>
        </table>;
    }

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        if(this.queryChar !== null)
        {
            const response = await this.apiService.roots.get({ prefix: this.queryChar });
            this.data = response.data;
        }
        else
            this.data = [];
    }
}