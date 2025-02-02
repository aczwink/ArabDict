/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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
import { APIService } from "./services/APIService";
import { DialectStatistics, DictionaryStatistics, RootType, VerbalNounFrequencies } from "../dist/api";
import { DialectsService } from "./services/DialectsService";
import { Dictionary } from "../../../ACTS-Util/core/dist/Dictionary";
import { ObjectExtensions } from "../../../ACTS-Util/core/dist/ObjectExtensions";
import { ConjugationService } from "./services/ConjugationService";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { AdvancedStemNumber, Stem1Context } from "openarabicconjugation/src/Definitions";
import { RomanNumberComponent, StemNumberComponent } from "./shared/RomanNumberComponent";
import { KeyValuePair } from "../../../ACTS-Util/core/dist/KeyValuePair";
import { GetDialectMetadata } from "openarabicconjugation/src/DialectsMetadata";
import { DialectType } from "openarabicconjugation/src/Dialects";
import { VerbFormComponent } from "./verbs/VerbFormComponent";
import { RootTypeToPattern, RootTypeToString } from "./roots/general";

@Injectable
export class StatisticsComponent extends Component
{
    constructor(private apiService: APIService, private dialectsService: DialectsService, private conjugationService: ConjugationService)
    {
        super();

        this.data = null;
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <div className="container">
            <h3>Ingested data</h3>
            {this.RenderColumnTable("General", this.RenderGeneralStatsTable())}

            {this.RenderKeyValueTable("per dialect", {
                dialect: "Dialect",
                verbsCount: "Verbs",
                wordsCount: "Words (excluding verbs)",
                totalCount: "Total",
            }, this.data.dialectCounts.map(this.BuildDialectRows.bind(this)))}

            <h3>Data analysis</h3>

            {this.RenderKeyValueTable("Roots per type", {
                rootType: "Root type",
                pattern: "Pattern",
                count: "Count"
            }, this.data.rootCounts.map(x => ({
                ...x,
                rootType: RootTypeToString(x.rootType),
                pattern: RootTypeToPattern(x.rootType)
            })))}

            {this.RenderKeyValueTable("Verbs per Stem", {
                stem: "Stem",
                count: "Count"
            }, this.data.stemCounts.map(x => ({
                stem: <RomanNumberComponent num={x.stem} />,
                count: x.count
            })))}
            
            {this.RenderKeyValueTable("Stem 1 frequencies", {
                rootType: "Root type",
                pattern: "Pattern",
                form: "Form",
                count: "Count"
            }, this.data.stem1Freq.map(x => ({
                rootType: RootTypeToString(x.rootType),
                pattern: RootTypeToPattern(x.rootType),
                form: this.BuildForm(x.rootType, x.index),
                count: x.count,
            })))}
            
            {this.RenderKeyValueTable("Verbal noun frequencies", {
                rootType: "Root type",
                pattern: "Pattern",
                stem: "Stem",
                form: "Form",
                verbalNoun: "Verbal noun",
                count: "Count"
            }, this.data.verbalNounFreq.map(x => ({
                rootType: RootTypeToString(x.rootType),
                pattern: RootTypeToPattern(x.rootType),
                stem: <StemNumberComponent rootType={x.rootType} stem={x.stem} />,
                form: (x.stemChoiceIndex === undefined) ? "" : this.BuildForm(x.rootType, x.stemChoiceIndex),
                verbalNoun: this.GenerateVerbalNoun(x.rootType, x.stem, x.stemChoiceIndex, x.verbalNounIndex),
                count: x.count,
            })))}
        </div>;
    }

    //Private state
    private data: DictionaryStatistics | null;

    //Private methods
    private BuildDialectRows(dialectCounts: DialectStatistics)
    {
        const d = this.dialectsService.GetDialect(dialectCounts.dialectId);

        return {
            dialect: d.emojiCodes + " " + d.name,
            totalCount: dialectCounts.verbsCount + dialectCounts.wordsCount,
            verbsCount: dialectCounts.verbsCount,
            wordsCount: dialectCounts.wordsCount,
        };
    }

    private BuildForm(rootType: RootType, index: number)
    {
        if(index === -1)
            return <i>invalid</i>;

        const radicals = this.GetExampleRootRadicals(rootType);
        const root = new VerbRoot(radicals.join(""));
        
        return <VerbFormComponent dialectType={DialectType.ModernStandardArabic} root={root} index={index} stem={1} />;
    }

    private GenerateVerbalNoun(rootType: RootType, stem: number, stem1Context: number | undefined, verbalNounIndex: number)
    {
        if(verbalNounIndex === -1)
            return <i>invalid</i>;

        const radicals = this.GetExampleRootRadicals(rootType).join("");
        const root = new VerbRoot(radicals);
        const meta = GetDialectMetadata(DialectType.ModernStandardArabic);
        const choices = meta.GetStem1ContextChoices(root);
        const choice = choices.types[stem1Context ?? 0];
        const stemData: AdvancedStemNumber | Stem1Context = (stem1Context === undefined) ? (stem as AdvancedStemNumber) : meta.CreateStem1Context(root.type, choice);

        const generated = this.conjugationService.GenerateAllPossibleVerbalNouns(radicals, stemData)[verbalNounIndex];
        return generated;
    }

    private GetExampleRootRadicals(rootType: RootType)
    {
        switch(rootType)
        {
            case RootType.Quadriliteral:
                return ["ف", "ع", "ل", "ق"];
            case RootType.Assimilated:
                return ["و", "ع", "ل"];
            case RootType.Defective:
                return ["ف", "ع", "و"];
            case RootType.HamzaOnR1:
                return ["ء", "ع", "ل"];
            case RootType.Hollow:
                return ["ف", "و", "ل"];
            case RootType.SecondConsonantDoubled:
                return ["ف", "ل", "ل"];
        }
        return ["ف", "ع", "ل"];
    }

    private RenderColumnTable(heading: string, rows: any[])
    {
        return this.RenderTableWithHeading(heading, [], rows, true);
    }

    private RenderKeyValueTable(heading: string, headings: Dictionary<string>, values: any[])
    {
        const header = <fragment>
            <tr>
                {ObjectExtensions.Values(headings).Map(x => <th>{x}</th>).ToArray()}
            </tr>
        </fragment>;
        const rows = <fragment>
            {values.map(row => <tr>
                {ObjectExtensions.OwnKeys(headings).Map(x => <td>{row[x]}</td>).ToArray()}
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
                <th>Number of words:</th>
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

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        function FilterComplex(kv: KeyValuePair<RootType, VerbalNounFrequencies[]>)
        {
            const byStem = kv.value.Values().GroupBy(x => x.stem);
            const filtered = byStem.Filter(x => (x.value.length > 1) || (x.value[0].verbalNounIndex === -1));

            return filtered.Map(x => x.value.Values()).Flatten();
        }

        const response = await this.apiService.statistics.get();
        this.data = response.data;
        this.data.dialectCounts.SortByDescending(x => x.verbsCount + x.wordsCount);
        this.data.rootCounts.SortByDescending(x => x.count);
        this.data.stemCounts.SortByDescending(x => x.count);

        this.data.stem1Freq.SortByDescending(x => x.count);
        this.data.stem1Freq = this.data.stem1Freq.Values().GroupBy(x => x.rootType)
            .Filter(x => x.value.length > 1)
            .Map(x => x.value.Values().OrderByDescending(x => x.count)).Flatten().ToArray();

        this.data.verbalNounFreq = this.data.verbalNounFreq.Values().GroupBy(x => x.rootType)
            .Map(FilterComplex)
            .Map(x => x.OrderBy(x => [x.stem, x.count])).Flatten().ToArray();
    }
}