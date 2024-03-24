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

import { Anchor, Component, FormField, Injectable, JSX_CreateElement, LineEdit, ProgressSpinner } from "acfrontend";
import { APIService } from "../services/APIService";
import { VerbPreviewComponent } from "./VerbPreviewComponent";
import { VerbReverseConjugationResult } from "arabdict-domain/src/Conjugator";
import { ConjugationService } from "../services/ConjugationService";
import { EqualsAny } from "../../../../ACTS-Util/core/dist/EqualsAny";
import { Stem1DataToStem1ContextOptional } from "./model";
import { CachedAPIService, FullVerbData } from "../services/CachedAPIService";
import { ReverseLookupService } from "../services/ReverseLookupService";
import { ConjugationParams, Gender, Mood, MoodString, Numerus, Person, Stem1Context, Tense } from "arabdict-domain/src/Definitions";

enum FilterCase
{
    ByBoth,
    ByConjugation,
    ByTranslation
}

interface RootMatchData extends VerbReverseConjugationResult
{
    rootId: number;
}

interface VerbMatchData extends RootMatchData
{
    verbId: number;
}

interface Matches
{
    verbFound: VerbMatchData[];
    rootFound: RootMatchData[];
    notFound: VerbReverseConjugationResult[];
}

@Injectable
export class SearchVerbsComponent extends Component
{
    constructor(private apiService: APIService, private conjugationService: ConjugationService, private cachedAPIService: CachedAPIService, private reverseLookupService: ReverseLookupService)
    {
        super();

        this.verbFilter = "";
        this.translationFilter = "";
        this.data = [];
        this.showAnyMatches = false;
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            <h3>Verbs</h3>

            <div className="row">
                <div className="col">
                    <FormField title="Verb" description="Any conjugation allowed">
                        <LineEdit value={this.verbFilter} onChanged={newValue => this.verbFilter = newValue} />
                    </FormField>
                </div>
                <div className="col">
                    <FormField title="Translation">
                        <LineEdit value={this.translationFilter} onChanged={newValue => this.translationFilter = newValue} />
                    </FormField>
                </div>
            </div>

            <button type="button" className="btn btn-primary" onclick={this.PerformSearch.bind(this)}>Search</button>

            {this.RenderResults()}
        </fragment>;
    }

    //Private state
    private verbFilter: string;
    private translationFilter: string;
    private data: Matches | FullVerbData[] | null;
    private showAnyMatches: boolean;

    //Private methods
    private get filterCase(): FilterCase
    {
        const t1 = this.verbFilter.trim();
        const t2 = this.translationFilter.trim();

        if((t1.length > 0) && (t2.length > 0))
            return FilterCase.ByBoth;
        else if(t1.length > 0)
            return FilterCase.ByConjugation;
        return FilterCase.ByTranslation;
    }

    private async LoadByBoth()
    {
        const results1 = await this.LoadByTranslationData();
        const results2 = await this.LoadByConjugationData();

        function DoesMatch(verbData: FullVerbData)
        {
            return results2.verbFound.find(x => x.verbId === verbData.verbData.id) !== undefined;
        }

        return results1.Values().Filter(DoesMatch).ToArray()
    }

    private async LoadByConjugationData(): Promise<Matches>
    {
        const analyzed = this.conjugationService.AnalyzeConjugation(this.verbFilter);

        const verbFound = [];
        const rootFound = [];
        const notFound = [];

        for (const entry of analyzed)
        {
            const rootId = await this.reverseLookupService.TryFindRootId(entry.root);
            const verbId = await this.TryFindVerb(rootId, entry.params);

            if(verbId !== undefined)
                verbFound.push({ rootId, verbId, ...entry });
            else if(rootId !== undefined)
                rootFound.push({ rootId, ...entry });
            else
                notFound.push(entry);
        }

        return {
            notFound,
            rootFound,
            verbFound
        };
    }

    private async LoadByTranslationData()
    {
        const response = await this.apiService.verbs.search.get({ byTranslation: this.translationFilter });
        const result = response.data;

        return result.Values().Map(x => this.cachedAPIService.QueryFullVerbData(x)).PromiseAll();
    }

    private MoodToString(mood: Mood): MoodString
    {
        switch(mood)
        {
            case Mood.Imperative:
                return "imperative";
            case Mood.Indicative:
                return "indicative";
            case Mood.Jussive:
                return "jussive";
            case Mood.Subjunctive:
                return "subjunctive";
        }
    }

    private async PerformSearch()
    {
        this.data = null;

        switch(this.filterCase)
        {
            case FilterCase.ByBoth:
                this.data = await this.LoadByBoth();
                break;
            case FilterCase.ByConjugation:
                this.data = await this.LoadByConjugationData();
                break;
            case FilterCase.ByTranslation:
                this.data = await this.LoadByTranslationData();
                break;
        }
    }

    private RenderByConjugationData(results: Matches)
    {
        return <fragment>
            <FormField title="Show only existing verbs">
                <input type="checkbox" checked={!this.showAnyMatches} onclick={() => this.showAnyMatches = !this.showAnyMatches} />
            </FormField>
            {this.RenderByConjugationTable(results)}
        </fragment>;
    }

    private RenderByConjugationTable(results: Matches)
    {
        return <table className="table table-sm">
            <thead>
                <th>Conjugated Verb</th>
                <th>Base Verb</th>
                <th>Score</th>
                <th>Root</th>
                <th>Parameters</th>
            </thead>
            <tbody>
                {results.verbFound.map(this.RenderRow.bind(this))}
                {this.showAnyMatches ? results.rootFound.map(this.RenderRow.bind(this)) : null}
                {this.showAnyMatches ? results.notFound.map(this.RenderRow.bind(this)) : null}
            </tbody>
        </table>;
    }

    private RenderByTranslationTable(data: FullVerbData[])
    {
        return <div className="row">
            {data.map( (x, i) => <VerbPreviewComponent root={x.rootData} verbData={x.verbData} />)}
        </div>;
    }

    private RenderResults()
    {
        if(this.data === null)
            return <ProgressSpinner />;

        if(Array.isArray(this.data))
            return this.RenderByTranslationTable(this.data);
        return this.RenderByConjugationData(this.data);
    }

    private RenderRow(result: VerbReverseConjugationResult | RootMatchData | VerbMatchData)
    {
        const conjugated = this.conjugationService.ConjugateToString(result.root, result.params);
        const stem1ctx = (result.params.stem === 1) ? result.params.stem1Context : undefined;
        const base = this.conjugationService.ConjugateToStringArgs(result.root.radicalsAsSeparateLetters.join(""), result.params.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);
        const ctx = (result.params.stem !== 1) ? "" : (" tashkil: " + result.params.stem1Context?.middleRadicalTashkil + " present: " + result.params.stem1Context?.middleRadicalTashkilPresent);

        const root = ("rootId" in result) ? <Anchor route={"/roots/" + result.rootId}>{result.root.ToString()}</Anchor> : result.root.ToString();
        const renderedVerb = ("verbId" in result) ? <Anchor route={"/verbs/" + result.verbId}>{base}</Anchor> : base;

        const moodString = (result.params.tense === Tense.Present) ? this.MoodToString(result.params.mood) : "";

        return <tr>
            <td>{conjugated}</td>
            <td>{renderedVerb}</td>
            <td>{result.score}</td>
            <td>{root}</td>
            <td>
                {result.params.person}-person {result.params.gender} {result.params.numerus} {result.params.tense} {result.params.voice} {moodString} {"stem " + result.params.stem} {ctx}
            </td>
        </tr>;
    }

    private async TryFindVerb(rootId: number | undefined, params: ConjugationParams)
    {
        if(rootId === undefined)
            return undefined;

        const verbs = await this.cachedAPIService.QueryVerbsOfRoot(rootId);

        for (const entry of verbs)
        {
            if(entry.stem === params.stem)
            {
                if(params.stem === 1)
                {
                    if(EqualsAny(Stem1DataToStem1ContextOptional(entry.stem1Data), params.stem1Context))
                        return entry.id;
                }
                else
                    return entry.id;
            }
        }

        return undefined;
    }
}