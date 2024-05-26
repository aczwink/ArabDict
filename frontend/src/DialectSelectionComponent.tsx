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
import { DialectData } from "../dist/api";
import { ConjugationService } from "./services/ConjugationService";
import { DialectsService } from "./services/DialectsService";
import { DialectType } from "arabdict-domain/src/Conjugator";
import { GetDialectMetadata } from "arabdict-domain/src/DialectsMetadata";

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
                {this.FindEmoji()}
            </a>
            <ul className="dropdown-menu shadow">
                {this.RenderDialectChildrenOf(null, 0)}
            </ul>
        </div>;
    }

    //State
    private dialects: DialectData[];

    //Private methods
    private FindEmoji()
    {
        return this.dialects.find(x => this.MapDialectType(x) === this.conjugationService.globalDialect.Get())?.emojiCodes;
    }

    private MapDialectType(dialect: DialectData)
    {
        const types: DialectType[] = [DialectType.ModernStandardArabic, DialectType.Lebanese];
        for (const type of types)
        {
            const metaData = GetDialectMetadata(type);
            if( (dialect.iso639code === metaData.iso639code) && (dialect.glottoCode === metaData.glottoCode) )
                return type;
        }
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
        if(this.MapDialectType(x) === undefined)
            return null;
        
        const indention = "  ".repeat(level);
        return <li>
            <a className={(this.MapDialectType(x) === this.conjugationService.globalDialect.Get()) ? "dropdown-item active" : "dropdown-item"} onclick={this.OnChangeDialect.bind(this, x)} href="#" style="white-space: pre;">{indention}{x.emojiCodes} {x.name}</a>
        </li>;
    }

    //Event handlers
    private OnChangeDialect(dialect: DialectData, event: Event)
    {
        event.preventDefault();
        const dialectType = this.MapDialectType(dialect);
        if(dialectType !== undefined)
        {
            this.conjugationService.globalDialect.Set(dialectType);
            this.Update();
        }
    }

    override async OnInitiated(): Promise<void>
    {
        const dialects = await this.dialectsService.QueryDialects();
        this.dialects = dialects.Values().OrderBy(x => x.name).ToArray();
    }
}