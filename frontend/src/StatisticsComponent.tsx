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

import { Component, Injectable, JSX_CreateElement, ProgressSpinner } from "acfrontend";
import { APIService } from "./APIService";
import { DialectStatistics, DictionaryStatistics } from "../dist/api";
import { DialectToDisplayName, DialectToEmoji } from "./shared/dialects";

@Injectable
export class StatisticsComponent extends Component
{
    constructor(private apiService: APIService)
    {
        super();

        this.data = null;
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <table className="table table-striped-columns table-bordered">
            <tbody>
                <tr>
                    <th>Number of roots:</th>
                    <td>{this.data.rootsCount}</td>
                </tr>
                <tr>
                    <th>Number of verbs:</th>
                    <td>{this.data.verbsCount}</td>
                </tr>
                <tr>
                    <th>Number of words (excluding verbs):</th>
                    <td>{this.data.wordsCount}</td>
                </tr>
                {...this.data.dialectCounts.map(this.RenderDialectCounts.bind(this))}
            </tbody>
        </table>;
    }

    //Private state
    private data: DictionaryStatistics | null;

    //Private methods
    private RenderDialectCounts(dialectCounts: DialectStatistics)
    {
        return <fragment>
            <tr>
                <th>Number of verbs in dialect "{DialectToDisplayName(dialectCounts.dialect)}" {DialectToEmoji(dialectCounts.dialect)}:</th>
                <td>{dialectCounts.verbsCount}</td>
            </tr>
            <tr>
                <th>Number of words (excluding verbs) in dialect "{DialectToDisplayName(dialectCounts.dialect)}" {DialectToEmoji(dialectCounts.dialect)}:</th>
                <td>{dialectCounts.wordsCount}</td>
            </tr>
        </fragment>
    }

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.statistics.get();
        this.data = response.data;
        this.data.dialectCounts.SortBy(x => x.dialect);
    }
}