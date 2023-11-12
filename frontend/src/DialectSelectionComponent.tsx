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

import { Component, Injectable, JSX_CreateElement } from "acfrontend";

import { DialectToDisplayName, DialectToEmoji, dialects } from "./shared/dialects";
import { DialectType } from "arabdict-domain/src/Conjugator";

import { DialectType as DialectTypeAPI } from "../dist/api";
import { ConjugationService } from "./ConjugationService";

function MapDialectType(type: DialectType): DialectTypeAPI
{
    switch(type)
    {
        case DialectType.ModernStandardArabic:
            return "msa";
        case DialectType.NorthLevantineArabic:
            return "apc";
    }
}

function MapDialectTypeBack(type: DialectTypeAPI)
{
    switch(type)
    {
        case "apc":
            return DialectType.NorthLevantineArabic;
        case "msa":
            return DialectType.ModernStandardArabic;
        case "eg":
        case "tn":
            throw new Error("TODO");
    }
}

@Injectable
export class DialectSelectionComponent extends Component
{
    constructor(private conjugationService: ConjugationService)
    {
        super();
    }
    
    protected Render(): RenderValue
    {
        return <div className="flex-shrink-0">
            <a href="#" className="text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                {DialectToEmoji(MapDialectType(this.conjugationService.globalDialect))}
            </a>
            <ul className="dropdown-menu shadow">
                {dialects.map(x => <li><a className={(x === MapDialectType(this.conjugationService.globalDialect)) ? "dropdown-item active" : "dropdown-item"} onclick={this.OnChangeDialect.bind(this, x)} href="#">{DialectToEmoji(x)} {DialectToDisplayName(x)}</a></li>)}
            </ul>
        </div>;
    }

    //Event handlers
    private OnChangeDialect(dialect: DialectTypeAPI, event: Event)
    {
        event.preventDefault();
        this.conjugationService.globalDialect = MapDialectTypeBack(dialect);
        this.Update();
    }
}