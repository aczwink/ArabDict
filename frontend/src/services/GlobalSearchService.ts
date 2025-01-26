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

import { Injectable } from "acfrontend";
import { APIService } from "./APIService";
import { FullWordData } from "../../dist/api";
import { CachedAPIService, FullVerbData } from "./CachedAPIService";
import { ConjugationService } from "./ConjugationService";
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense, Voice } from "arabdict-domain/src/Definitions";
import { Stem1DataToStem1ContextOptional } from "../verbs/model";
import { ReverseLookupService } from "./ReverseLookupService";
import { EqualsAny } from "../../../../ACTS-Util/core/dist/EqualsAny";
import { VerbReverseConjugationResult } from "arabdict-domain/src/Conjugator";
import { DisplayVocalized, ParseVocalizedText } from "arabdict-domain/src/Vocalization";
import { IsArabicText } from "../roots/general";
import { DialectsService } from "./DialectsService";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";

interface RootMatchData extends VerbReverseConjugationResult
{
    rootId: number;
}

interface VerbMatchData extends RootMatchData
{
    verbId: number;
}

interface ReverseConjugationMatches
{
    verbFound: VerbMatchData[];
    rootFound: RootMatchData[];
    notFound: VerbReverseConjugationResult[];
}

interface SearchResultEntryBase
{
    byTranslation: boolean;
    score: number;
}

export interface VerbByConjugationSearchResultEntry extends SearchResultEntryBase, VerbReverseConjugationResult
{
    type: "conjugated";
    rootId?: number;
    verbId?: number;
}

interface VerbSearchResultEntry extends SearchResultEntryBase
{
    type: "verb";
    verb: FullVerbData;
    conjugated: string;
}

interface WordSearchResultEntry extends SearchResultEntryBase
{
    type: "word";
    word: FullWordData;
    vocalized: DisplayVocalized[];
}

export type SearchResultEntry = VerbByConjugationSearchResultEntry | VerbSearchResultEntry | WordSearchResultEntry;

class SearchQuery
{
    constructor(private filter: string, private resultCallback: (newData: SearchResultEntry[]) => void)
    {
        this.resultSet = [];
    }

    //Public methods
    public Add(entry: SearchResultEntry)
    {
        this.resultSet.push(entry);
    }

    public Update()
    {
        this.RecomputeScores();

        const verbIds = new Set();
        const wordIds = new Set();
        const rootStems = new Set();

        const sorted = this.resultSet.Values().OrderByDescending(x => x.score).ToArray();
        for(let i = 0; i < sorted.length;)
        {
            const x = sorted[i];
            switch(x.type)
            {
                case "conjugated":
                {
                    if(x.verbId !== undefined)
                    {
                        if(verbIds.has(x.verbId))
                            sorted.Remove(i);
                        else
                        {
                            verbIds.add(x.verbId);
                            rootStems.add(x.root.ToString() + x.params.stem);
                            i++;
                        }
                    }
                    else
                    {
                        const rs = x.root.ToString() + x.params.stem;
                        if(rootStems.has(rs))
                            sorted.Remove(i);
                        else
                        {
                            rootStems.add(rs);
                            i++;
                        }
                    }
                }
                break;
                case "verb":
                    if(verbIds.has(x.verb.verbData.id))
                        sorted.Remove(i);
                    else
                    {
                        verbIds.add(x.verb.verbData.id);
                        i++;
                    }
                break;
                case "word":
                    if(wordIds.has(x.word.id))
                        sorted.Remove(i);
                    else
                    {
                        wordIds.add(x.word.id);
                        i++;
                    }
                break;
            }
        }
        this.resultCallback(sorted);
    }

    //State
    private resultSet: SearchResultEntry[];

    private RecomputeScores()
    {
        function GetWordLength(x: SearchResultEntry)
        {
            if(x.type === "word")
                return x.vocalized.length;
            return 0;
        }

        if(this.resultSet.length === 0)
            return;

        const filterLength = ParseVocalizedText(this.filter).length;
        const d_max = Math.max(this.resultSet.Values().Map(GetWordLength).Max() - filterLength, 1);
        this.resultSet.forEach(x => {
            if(x.byTranslation)
                x.score = 0;
            else
            {
                const l = GetWordLength(x);
                if(l > 0)
                {
                    const d = l - filterLength;
                    x.score = 1 - (d / d_max);
                }
            }
        });
    }
}

@Injectable
export class GlobalSearchService
{
    constructor(private apiService: APIService, private cachedAPIService: CachedAPIService, private conjugationService: ConjugationService,
        private reverseLookupService: ReverseLookupService, private dialectsService: DialectsService)
    {
    }

    public PerformSearch(filter: string, offset: number, limit: number, resultCallback: (newData: SearchResultEntry[]) => void)
    {
        const isArabic = IsArabicText(filter);

        const p2 = this.FindWordsByTranslation(filter, offset, limit);
        const p3 = this.FindVerbsByTranslation(filter, offset, limit);

        const sq = new SearchQuery(filter, resultCallback);

        p2.then(this.AddWordsToState.bind(this, sq, true));
        p3.then(this.AddVerbsByTranslationToState.bind(this, sq, true));

        const promises: Promise<any>[] = [p2, p3];

        if(isArabic)
        {
            const p1 = this.FindWords(filter, offset, limit);
            p1.then(this.AddWordsToState.bind(this, sq, false));

            const p4 = this.FindVerbByReverseConjugation(filter);
            p4.then(this.AddVerbsByConjugationToState.bind(this, sq));

            promises.push(p4);
        }

        return Promise.all(promises);
    }

    //Private methods
    private AddVerbsByConjugationToState(sq: SearchQuery, matches: ReverseConjugationMatches)
    {
        matches.notFound.forEach(x => sq.Add({
            type: "conjugated",
            byTranslation: false,
            ...x,
            score: x.score / 3,
        }));
        matches.rootFound.forEach(x => sq.Add({
            type: "conjugated",
            byTranslation: false,
            ...x,
            score: x.score / 2,
        }));
        matches.verbFound.forEach(x => sq.Add({
            type: "conjugated",
            byTranslation: false,
            ...x,
        }));

        sq.Update();
    }

    private AddVerbsByTranslationToState(sq: SearchQuery, byTranslation: boolean, verbs: FullVerbData[])
    {
        const ctx = this;
        function conj(x: FullVerbData)
        {
            const root = new VerbRoot(x.rootData.radicals);
            return ctx.conjugationService.ConjugateToString(ctx.dialectsService.MapIdToType(x.verbData.dialectId), root, {
                gender: Gender.Male,
                tense: Tense.Perfect,
                numerus: Numerus.Singular,
                person: Person.Third,
                stem: x.verbData.stem as any,
                stem1Context: Stem1DataToStem1ContextOptional(root.type, x.verbData.stem1Context),
                voice: Voice.Active
            });
        }

        verbs.forEach(x => sq.Add({
            type: "verb",
            verb: x,
            score: 0,
            byTranslation,
            conjugated: conj(x),
        }));

        sq.Update();
    }

    private AddWordsToState(sq: SearchQuery, byTranslation: boolean, words: FullWordData[])
    {
        words.forEach(x => sq.Add({
            type: "word",
            word: x,
            score: 0,
            byTranslation,
            vocalized: ParseVocalizedText(x.word),
        }));

        sq.Update();
    }

    private async FindVerbByReverseConjugation(filter: string): Promise<ReverseConjugationMatches>
    {
        const verbFound: VerbMatchData[] = [];
        const rootFound: RootMatchData[] = [];
        const notFound: VerbReverseConjugationResult[] = [];

        if(filter.endsWith(Letter.TaMarbuta))
        {
            return {
                notFound,
                rootFound,
                verbFound
            };
        }

        const analyzed = this.conjugationService.AnalyzeConjugation(filter);

        for (const entry of analyzed)
        {
            const rootId = await this.reverseLookupService.TryFindRootId(entry.root);
            if(rootId !== undefined)
            {
                const verbId = await this.TryFindVerb(rootId, entry.params);
                if(verbId !== undefined)
                    verbFound.push({ rootId, verbId, ...entry });
                else
                    rootFound.push({ rootId, ...entry });
            }
            else
                notFound.push(entry);
        }

        return {
            notFound,
            rootFound,
            verbFound
        };
    }

    private async FindVerbsByTranslation(filter: string, offset: number, limit: number)
    {
        const response = await this.apiService.verbs.search.get({ byTranslation: filter });
        const result = response.data;

        return result.Values().Map(x => this.cachedAPIService.QueryFullVerbDataForVerbData(x)).PromiseAll();
    }

    private async FindWords(filter: string, offset: number, limit: number): Promise<FullWordData[]>
    {
        const response = await this.apiService.words.get({
            derivation: "any",
            includeRelated: true,
            limit,
            offset,
            translation: "",
            type: null,
            wordFilter: filter
        });
        if((response.data.words.length === 0) && filter.endsWith(Letter.TaMarbuta))
            return this.FindWords(filter.substring(0, filter.length - 1), offset, limit);
        if((response.data.words.length === 0) && filter.startsWith(Letter.Alef + Letter.Lam))
            return this.FindWords(filter.substring(2), offset, limit);
        return response.data.words;
    }

    private async FindWordsByTranslation(filter: string, offset: number, limit: number)
    {
        const response = await this.apiService.words.get({
            derivation: "any",
            includeRelated: true,
            limit,
            offset,
            translation: filter,
            type: null,
            wordFilter: ""
        });
        return response.data.words;
    }

    private async TryFindVerb(rootId: number, params: ConjugationParams)
    {
        const verbs = await this.cachedAPIService.QueryVerbsOfRoot(rootId);
        const rootData = await this.cachedAPIService.QueryRootData(rootId);
        const root = new VerbRoot(rootData.radicals);

        for (const entry of verbs)
        {
            if(entry.stem === params.stem)
            {
                if(params.stem === 1)
                {
                    if(EqualsAny(Stem1DataToStem1ContextOptional(root.type, entry.stem1Context), params.stem1Context))
                        return entry.id;
                }
                else
                    return entry.id;
            }
        }

        return undefined;
    }
}