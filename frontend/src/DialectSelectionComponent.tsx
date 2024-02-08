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

import { Component, Injectable, JSX_CreateElement } from "acfrontend";

import { DialectType } from "arabdict-domain/src/Conjugator";

import { DialectData } from "../dist/api";
import { ConjugationService } from "./ConjugationService";
import { DialectsService } from "./DialectsService";

function MapDialectType(type: DialectType): string
{
    switch(type)
    {
        case DialectType.ModernStandardArabic:
            return "arb";
        case DialectType.NorthLevantineArabic:
            return "apc";
    }
}

function MapDialectTypeBack(type: string)
{
    switch(type)
    {
        case "apc":
            return DialectType.NorthLevantineArabic;
        case "arb":
            return DialectType.ModernStandardArabic;
    }
}

@Injectable
export class DialectSelectionComponent extends Component
{
    constructor(private conjugationService: ConjugationService, private dialectsService: DialectsService)
    {
        super();

        this.dialects = [];
    }
    
    protected Render(): RenderValue
    {
        return <div className="flex-shrink-0">
            <a href="#" className="text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                {this.FindEmoji(MapDialectType(this.conjugationService.globalDialect))}
            </a>
            <ul className="dropdown-menu shadow">
                {this.RenderDialectChildrenOf(null, 0)}
            </ul>
        </div>;
    }

    //State
    private dialects: DialectData[];

    //Private methods
    private FindEmoji(isoCode: string)
    {
        return this.dialects.find(x => x.isoCode === isoCode)?.flagCode;
    }

    private RenderDialectChildrenOf(parent: number | null, level: number)
    {
        const filtered = this.dialects.filter(x => x.parent === parent);
        return filtered.map(x => <fragment>
            {this.RenderDialect(x, level)}
            {this.RenderDialectChildrenOf(x.id, level + 1)}
        </fragment>);
    }

    private RenderDialect(x: DialectData, level: number)
    {
        if(MapDialectTypeBack(x.isoCode) === undefined)
            return null;
        
        const indention = "  ".repeat(level);
        return <li>
            <a className={(x.isoCode === MapDialectType(this.conjugationService.globalDialect)) ? "dropdown-item active" : "dropdown-item"} onclick={this.OnChangeDialect.bind(this, x)} href="#" style="white-space: pre;">{indention}{x.flagCode} {x.name}</a>
        </li>;
    }

    //Event handlers
    private OnChangeDialect(dialect: DialectData, event: Event)
    {
        event.preventDefault();
        const dialectType = MapDialectTypeBack(dialect.isoCode);
        if(dialectType !== undefined)
        {
            this.conjugationService.globalDialect = dialectType;
            this.Update();
        }
    }

    override async OnInitiated(): Promise<void>
    {
        const dialects = await this.dialectsService.QueryDialects();
        this.dialects = dialects.Values().OrderBy(x => x.name).ToArray();
    }
}