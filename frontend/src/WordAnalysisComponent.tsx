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
import { ConjugationService } from "./ConjugationService";
import { VerbReverseConjugationResult } from "arabdict-domain/src/Conjugator";
import { APIService } from "./APIService";
import { Dictionary } from "../../../ACTS-Util/core/dist/Dictionary";
import { VerbData } from "../dist/api";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { EqualsAny } from "../../../ACTS-Util/core/dist/EqualsAny";
import { Stem1Context } from "arabdict-domain/src/rule_sets/msa/_legacy/CreateVerb";
import { Stem1DataToStem1ContextOptional } from "./verbs/model";

interface RootCache
{
    rootId: number;
    verbs: VerbData[];
}

interface Matches
{
    verbFound: VerbReverseConjugationResult[];
    rootFound: VerbReverseConjugationResult[];
    notFound: VerbReverseConjugationResult[];
}

@Injectable
export class WordAnalysisComponent extends Component
{    
    constructor(private conjugationService: ConjugationService, private apiService: APIService)
    {
        super();

        this.filter = "";
        this.results = {
            notFound: [],
            rootFound: [],
            verbFound: []
        };
        this.rootsCache = {};
        this.showAnyMatches = false;
    }
    
    protected Render(): RenderValue
    {
        if(this.results === null)
            return <ProgressSpinner />;

        return <fragment>
            <h3>Analyze conjugated verb</h3>
            <FormField title="Verb" description="Any conjugation allowed">
                <LineEdit value={this.filter} onChanged={newValue => this.filter = newValue} />
            </FormField>
            <button type="button" className="btn btn-primary" onclick={this.LoadData.bind(this)}>Analyze</button>
            <FormField title="Show only existing verbs">
                <input type="checkbox" checked={!this.showAnyMatches} onclick={() => this.showAnyMatches = !this.showAnyMatches} />
            </FormField>

            {this.RenderTable()}
        </fragment>;
    }

    //Private state
    private filter: string;
    private results: Matches | null;
    private rootsCache: Dictionary<RootCache>;
    private showAnyMatches: boolean;

    //Private methods
    private async LoadData()
    {
        this.results = null;
        const analyzed = this.conjugationService.AnalyzeConjugation(this.filter);

        const verbFound = [];
        const rootFound = [];
        const notFound = [];

        for (const entry of analyzed)
        {
            if( !(entry.root.ToString() in this.rootsCache) )
            {
                const response = await this.apiService.roots.get({ prefix: entry.root.radicalsAsSeparateLetters.join("") });
                if(response.data.length !== 1)
                    throw new Error("TODO: implement me");

                const rootId = response.data[0].id;

                const response2 = await this.apiService.roots._any_.verbs.get(rootId);

                this.rootsCache[entry.root.ToString()] = {
                    rootId,
                    verbs: response2.data
                };
            }

            if(this.TryFindVerb(entry.root, entry.params.stem, entry.params.stem1Context) !== undefined)
                verbFound.push(entry);
            else if(this.rootsCache[entry.root.ToString()] !== undefined)
                rootFound.push(entry);
            else
                notFound.push(entry);
        }

        this.results = {
            notFound,
            rootFound,
            verbFound
        };
    }

    private RenderRow(result: VerbReverseConjugationResult)
    {
        const conjugated = this.conjugationService.Conjugate(result.root.radicalsAsSeparateLetters.join(""), result.params.stem, result.params.tense, result.params.voice, result.params.gender, result.params.person, result.params.numerus, result.params.mood, result.params.stem1Context);
        const base = this.conjugationService.Conjugate(result.root.radicalsAsSeparateLetters.join(""), result.params.stem, "perfect", "active", "male", "third", "singular", "indicative", result.params.stem1Context);
        const cachedRoot = this.rootsCache[result.root.ToString()];
        const ctx = (result.params.stem !== 1) ? "" : (" tashkil: " + result.params.stem1Context?.middleRadicalTashkil + " present: " + result.params.stem1Context?.middleRadicalTashkilPresent);

        const root = (cachedRoot === undefined) ? result.root.ToString() : <Anchor route={"/roots/" + cachedRoot.rootId}>{result.root.ToString()}</Anchor>;
        const verbId = this.TryFindVerb(result.root, result.params.stem, result.params.stem1Context);
        const renderedVerb = (verbId === undefined) ? base : <Anchor route={"/verbs/" + verbId}>{base}</Anchor>;

        return <tr>
            <td>{conjugated}</td>
            <td>{renderedVerb}</td>
            <td>{result.score}</td>
            <td>{root}</td>
            <td>
                {result.params.person}-person {result.params.gender} {result.params.numerus} {result.params.tense} {result.params.voice} {result.params.mood} {"stem " + result.params.stem} {ctx}
            </td>
        </tr>;
    }

    private RenderTable()
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
                {this.results!.verbFound.map(this.RenderRow.bind(this))}
                {this.showAnyMatches ? this.results!.rootFound.map(this.RenderRow.bind(this)) : null}
                {this.showAnyMatches ? this.results!.notFound.map(this.RenderRow.bind(this)) : null}
            </tbody>
        </table>
    }

    private TryFindVerb(root: VerbRoot, stem: number, stem1Context?: Stem1Context)
    {
        const cached = this.rootsCache[root.ToString()];
        if(cached === undefined)
            return undefined;

        for (const entry of cached.verbs)
        {
            if(entry.stem === stem)
            {
                if(stem === 1)
                {
                    if(EqualsAny(Stem1DataToStem1ContextOptional(entry.stem1Data), stem1Context))
                        return entry.id;
                }
                else
                    return entry.id;
            }
        }

        return undefined;
    }
}