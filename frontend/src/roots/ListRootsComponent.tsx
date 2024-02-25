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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, ProgressSpinner, RouterButton, RouterState } from "acfrontend";
import { APIService } from "../APIService";
import { RootOverviewData } from "../../dist/api";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { RootToString } from "./general";

interface AlphabetRange
{
    first: number;
    count: number;
}

const alphabetChars: AlphabetRange[] = [
    { first: 0x0621, count: 1}, //hamza
    { first: 0x0628, count: 1}, //ba
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
            <RouterButton className="btn btn-primary" route="/roots/add"><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>;
    }

    //Private state
    private queryChar: string | null;
    private data: RootOverviewData[] | null;

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

    private RenderRootRow(rootData: RootOverviewData)
    {
        const root = new VerbRoot(rootData.radicals);
        return <tr>
            <td>{root.r4}</td>
            <td>{root.r3}</td>
            <td>{root.r2}</td>
            <td><Anchor route={"/roots/" + rootData.id}>{RootToString(rootData)}</Anchor></td>
        </tr>;
    }

    private RenderTable()
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <table className="table table-striped table-hover table-sm text-center" style="margin-left: auto; margin-right: auto; width: auto;">
            <thead>
                <tr>
                    <th>r4</th>
                    <th>r3</th>
                    <th>r2</th>
                    <th>Radicals</th>
                </tr>
            </thead>
            <tbody>
                {this.data.map(this.RenderRootRow.bind(this))}
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