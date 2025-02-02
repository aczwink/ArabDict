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

import { Anchor, CheckBox, Component, FormField, Injectable, JSX_CreateElement, LineEdit, ProgressSpinner, Select, Switch } from "acfrontend";
import { allWordTypes, WordTypeToText } from "./shared/words";
import { WordSearchDerivation, WordType } from "../dist/api";
import { GlobalSearchService, SearchResultEntry, VerbByConjugationSearchResultEntry } from "./services/GlobalSearchService";
import { APIService } from "./services/APIService";
import { WordOverviewComponent } from "./words/WordOverviewComponent";
import { VerbIdPreviewComponent, VerbPreviewComponent } from "./verbs/VerbPreviewComponent";
import { Gender, Person, Numerus, Mood } from "openarabicconjugation/src/Definitions";
import { ConjugationService } from "./services/ConjugationService";
import { DialectType } from "openarabicconjugation/src/Dialects";

@Injectable
export class GlobalSearchComponent extends Component
{
    constructor(private globalSearchService: GlobalSearchService, private apiService: APIService, private conjugationService: ConjugationService)
    {
        super();

        this.filter = "";

        this.extendedSearch = false;
        this.wordType = null;
        this.derivation = "any";
        this.includeRelated = true;

        this.isSearching = false;
        this.offset = 0;
        this.limit = 25;
        this.data = [];
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            {this.RenderFilterForm()}
            {this.isSearching ? <ProgressSpinner /> : null}
            {this.RenderResults()}
        </fragment>;
    }

    //State
    private filter: string;

    private extendedSearch: boolean;
    private wordType: WordType | null;
    private derivation: WordSearchDerivation;
    private includeRelated: boolean;

    private isSearching: boolean;
    private offset: number;
    private limit: number;
    private data: SearchResultEntry[];

    //Private methods
    private async PerformSearch()
    {
        this.isSearching = true;
        this.data = [];

        if(this.extendedSearch)
        {
            const response1 = await this.apiService.words.get({
                wordFilter: this.filter,
                derivation: this.derivation,
                includeRelated: this.includeRelated,
                translation: "",
                type: this.wordType,
                offset: this.offset,
                limit: this.limit
            });
            const response2 = await this.apiService.words.get({
                wordFilter: "",
                derivation: this.derivation,
                includeRelated: this.includeRelated,
                translation: this.filter,
                type: this.wordType,
                offset: this.offset,
                limit: this.limit
            });
            this.data = response1.data.words.concat(response2.data.words).map( (x, i) => ({
                type: "word",
                word: x,
                score: x.word.length - this.filter.length,
                byTranslation: (i > response1.data.words.length),
                vocalized: [],
            }));
            this.data.SortByDescending(x => x.score)
        }
        else
        {
            await this.globalSearchService.PerformSearch(this.filter, this.offset, this.limit, newData => this.data = newData);
        }
        this.isSearching = false;
    }

    private RenderExtendedFilterForm()
    {
        if(this.extendedSearch === false)
            return null;
        return <div className="row">
            <div className="col">
                <FormField title="Word type">
                    <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                        <option selected={this.wordType === null} value={"null"}>Any</option>
                        {allWordTypes.map(x => <option selected={x === this.wordType} value={x}>{WordTypeToText(x)}</option>)}
                    </Select>
                </FormField>
            </div>
            <div className="col">
                <FormField title="Derivation">
                    <Select onChanged={newValue => this.derivation = newValue[0] as any}>
                        <option value="any" selected={this.derivation === "any"}>Any</option>
                        <option value="none" selected={this.derivation === "none"}>None</option>
                        <option value="root" selected={this.derivation === "root"}>Root</option>
                        <option value="verb" selected={this.derivation === "verb"}>Verb</option>
                    </Select>
                </FormField>
            </div>
            <div className="col">
                <FormField title="Include related words">
                    <CheckBox value={this.includeRelated} onChanged={newValue => this.includeRelated = newValue} />
                </FormField>
            </div>
        </div>;
    }

    private RenderFilterForm()
    {
        return <form onsubmit={this.OnSubmit.bind(this)}>
            <div className="row">
                <div className="col">
                    <FormField title="Search..." description="Enter any conjugated verb, parts of a word, parts of a translation, etc.">
                        <LineEdit value={this.filter} onChanged={newValue => this.filter = newValue} />
                    </FormField>
                </div>
                <div className="col-auto">
                    <label className="small">Extended <Switch checked={this.extendedSearch} onChanged={newValue => this.extendedSearch = newValue} /></label>
                    <br />
                    <button className="btn btn-primary" type="submit">Search</button>                    
                </div>
            </div>
            {this.RenderExtendedFilterForm()}
        </form>;
    }

    private RenderResultEntry(entry: SearchResultEntry)
    {
        switch(entry.type)
        {
            case "conjugated":
                return this.RenderRow(entry);

            case "verb":
                return <tr>
                    <td colSpan="2"><VerbPreviewComponent root={entry.verb.rootData} verbData={entry.verb.verbData} /></td>
                </tr>;
                
            case "word":
                return <WordOverviewComponent word={entry.word} />;
        }
    }

    private RenderResults()
    {
        if(this.data.length === 0)
            return "nothing found";

        return <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th>Word / Verb</th>
                    <th>Translation / Root</th>
                </tr>
            </thead>
            <tbody>
                {this.data.map(this.RenderResultEntry.bind(this))}
            </tbody>
        </table>;
    }

    private RenderRow(result: VerbByConjugationSearchResultEntry)
    {
        if(result.verbId !== undefined)
        {
            return <tr>
                <td colSpan="2"><VerbIdPreviewComponent verbId={result.verbId} /></td>
            </tr>;
        }

        const stem1ctx = (result.params.stem === 1) ? result.params.stem1Context : undefined;
        const base = this.conjugationService.ConjugateToStringArgs(DialectType.ModernStandardArabic, result.root.radicalsAsSeparateLetters.join(""), result.params.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        const root = (result.rootId !== undefined) ? <Anchor route={"/roots/" + result.rootId}>{result.root.ToString()}</Anchor> : result.root.ToString();
        const renderedVerb = (result.verbId !== undefined) ? <Anchor route={"/verbs/" + result.verbId}>{base}</Anchor> : base;

        return <tr>
            <td>{renderedVerb}</td>
            <td>{root}</td>
        </tr>;
    }

    //Event handlers
    private OnSubmit(event: Event)
    {
        event.preventDefault();
        this.PerformSearch();
    }

    private OnWordTypeChanged(newValue: string[])
    {
        const x = newValue[0];
        if(x === "null")
            this.wordType = null;
        else
            this.wordType = parseInt(newValue[0]);
    }
}