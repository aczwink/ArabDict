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

import { Component, Injectable, JSX_CreateElement, ProgressSpinner } from "acfrontend";
import { APIService } from "./APIService";
import { DialectStatistics, DictionaryStatistics, RootType } from "../dist/api";
import { DialectsService } from "./DialectsService";
import { Dictionary } from "../../../ACTS-Util/core/dist/Dictionary";

@Injectable
export class StatisticsComponent extends Component
{
    constructor(private apiService: APIService, private dialectsService: DialectsService)
    {
        super();

        this.data = null;
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            {this.RenderColumnTable("General", this.RenderGeneralStatsTable())}

            {this.RenderKeyValueTable("Roots per type", {
                rootType: "Root type",
                pattern: "Pattern",
                count: "Count"
            }, this.data.rootCounts.Values().Map(x => ({ ...x, rootType: this.RootTypeToString(x.rootType), pattern: this.RootTypeToPattern(x.rootType) })).OrderByDescending(x => x.count).ToArray())}

            {this.RenderKeyValueTable("Verbs per Stem", {
                stem: "Stem",
                count: "Count"
            }, this.data.stemCounts)}

            {this.RenderKeyValueTable("per dialect", {
                dialect: "Dialect",
                verbsCount: "Verbs",
                wordsCount: "Words (excluding verbs)",
            }, this.data.dialectCounts.map(this.BuildDialectRows.bind(this)))}
        </fragment>;
    }

    //Private state
    private data: DictionaryStatistics | null;

    //Private methods
    private BuildDialectRows(dialectCounts: DialectStatistics)
    {
        const d = this.dialectsService.GetDialect(dialectCounts.dialectId);

        return {
            dialect: d.flagCode + " " + d.name,
            ...dialectCounts
        };
    }

    private RenderColumnTable(heading: string, rows: any[])
    {
        return this.RenderTableWithHeading(heading, [], rows, true);
    }

    private RenderKeyValueTable(heading: string, headings: Dictionary<string>, values: any[])
    {
        const header = <fragment>
            <tr>
                {headings.Values().Map(x => <th>{x}</th>).ToArray()}
            </tr>
        </fragment>;
        const rows = <fragment>
            {values.map(row => <tr>
                {headings.OwnKeys().Map(x => <td>{row[x]}</td>).ToArray()}
            </tr>)}
        </fragment>;
        return this.RenderTableWithHeading(heading, header, rows, false);
    }

    private RenderGeneralStatsTable()
    {
        return <fragment>
            <tr>
                <th>Number of roots:</th>
                <td>{this.data!.rootsCount}</td>
            </tr>
            <tr>
                <th>Number of verbs:</th>
                <td>{this.data!.verbsCount}</td>
            </tr>
            <tr>
                <th>Number of words (excluding verbs):</th>
                <td>{this.data!.wordsCount}</td>
            </tr>
        </fragment>;
    }

    private RenderTableWithHeading(heading: string, head: any, rows: any[], columnCentric: boolean)
    {
        const className = columnCentric ? "table-striped-columns" : "table-striped";
        return <fragment>
            <h4>{heading}</h4>
            <table className={"table table-bordered table-sm " + className}>
                <thead>{head}</thead>
                <tbody>{rows}</tbody>
            </table>
        </fragment>;
    }

    private RootTypeToPattern(rootType: RootType)
    {
        switch(rootType)
        {
            case RootType.Assimilated:
                return "(و|ي)-r2-r3";
            case RootType.Defective:
                return "r1-r2-(و|ي)";
            case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                return "و-r2-(و|ي)";
            case RootType.HamzaOnR1:
                return "ء-r2-r3";
            case RootType.Hollow:
                return "r1-(و|ي)-r3";
            case RootType.Quadriliteral:
                return "r1-r2-r3-r4";
            case RootType.SecondConsonantDoubled:
                return "r1-r2-r2";
            case RootType.Sound:
                return "r1-r2-r3";
        }
    }

    private RootTypeToString(rootType: RootType)
    {
        switch(rootType)
        {
            case RootType.Assimilated:
                return "Assimilated";
            case RootType.Defective:
                return "Defective";
            case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                return "Doubly weak";
            case RootType.HamzaOnR1:
                return "Hamza on first radical";
            case RootType.Hollow:
                return "Hollow";
            case RootType.Quadriliteral:
                return "Quadriliteral";
            case RootType.SecondConsonantDoubled:
                return "Second consonant doubled";
            case RootType.Sound:
                return "Sound";
        }
    }

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.statistics.get();
        this.data = response.data;
        this.data.dialectCounts.SortByDescending(x => x.verbsCount + x.wordsCount);
    }
}