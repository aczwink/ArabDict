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
import { APIService } from "./services/APIService";
import { DialectStatistics, DictionaryStatistics, RootType } from "../dist/api";
import { DialectsService } from "./services/DialectsService";
import { Dictionary } from "../../../ACTS-Util/core/dist/Dictionary";
import { ObjectExtensions } from "../../../ACTS-Util/core/dist/ObjectExtensions";
import { ConjugationService } from "./services/ConjugationService";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Gender, Mood, Numerus, Person, Tense, Voice } from "arabdict-domain/src/Definitions";
import { Stem1DataToStem1Context } from "./verbs/model";
import { RomanNumberComponent, StemNumberComponent } from "./shared/RomanNumberComponent";

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
                rootType: this.RootTypeToString(x.rootType),
                pattern: this.RootTypeToPattern(x.rootType)
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
                rootType: this.RootTypeToString(x.rootType),
                pattern: this.RootTypeToPattern(x.rootType),
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
                rootType: this.RootTypeToString(x.rootType),
                pattern: this.RootTypeToPattern(x.rootType),
                stem: <StemNumberComponent rootType={x.rootType} stem={x.stem} />,
                form: (x.stemChoiceIndex === undefined) ? "" : this.BuildForm(x.rootType, x.stemChoiceIndex),
                verbalNoun: this.GenerateVerbalNoun(x.rootType, x.stem, x.verbalNounIndex),
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
        const choice = root.GetStem1ContextChoices().r2options[index];
        const past = this.conjugationService.ConjugateToString(root, {
            gender: Gender.Male,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: 1,
            stem1Context: Stem1DataToStem1Context({
                flags: 0,
                middleRadicalTashkil: choice.past,
                middleRadicalTashkilPresent: choice.present
            }),
            voice: Voice.Active
        });
        const present = this.conjugationService.ConjugateToString(root, {
            gender: Gender.Male,
            tense: Tense.Present,
            mood: Mood.Indicative,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: 1,
            stem1Context: Stem1DataToStem1Context({
                flags: 0,
                middleRadicalTashkil: choice.past,
                middleRadicalTashkilPresent: choice.present
            }),
            voice: Voice.Active
        });

        return past + " - " + present;
    }

    private GenerateVerbalNoun(rootType: RootType, stem: number, verbalNounIndex: number)
    {
        const radicals = this.GetExampleRootRadicals(rootType).join("");
        const generated = this.conjugationService.GenerateAllPossibleVerbalNouns(radicals, stem as any)[verbalNounIndex];
        if(generated === undefined)
            return <i>invalid</i>;
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
                <th>Number of verbs:</th>
                <td>{this.data!.verbsCount}</td>
            </tr>
            <tr>
                <th>Number of words (excluding verbs):</th>
                <td>{this.data!.wordsCount}</td>
            </tr>
            <tr>
                <th>Total number of words:</th>
                <td>{this.data!.verbsCount + this.data!.wordsCount}</td>
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
        this.data.rootCounts.SortByDescending(x => x.count);
        this.data.stemCounts.SortByDescending(x => x.count);

        this.data.stem1Freq.SortByDescending(x => x.count);
        this.data.stem1Freq = this.data.stem1Freq.Values().GroupBy(x => x.rootType)
            .Filter(x => x.value.length > 1)
            .Map(x => x.value.Values().OrderByDescending(x => x.count)).Flatten().ToArray();

        this.data.verbalNounFreq = this.data.verbalNounFreq.Values().GroupBy(x => x.rootType)
            .Filter(x => x.value.length > 1)
            .Map(x => x.value.Values().OrderBy(x => [x.stem, x.count])).Flatten().ToArray();
    }
}