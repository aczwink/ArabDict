/**
 * OpenArabDictViewer
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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
import { FullWordData, RootCreationData, VerbData } from "../../dist/api";
import { NumberDictionary } from "../../../../ACTS-Util/core/dist/Dictionary";

export interface FullVerbData
{
    rootData: RootCreationData;
    verbData: VerbData;
}

interface RootCache
{
    data: RootCreationData;
    verbs?: VerbData[];
}

@Injectable
export class CachedAPIService
{
    constructor(private apiService: APIService)
    {
        this.rootsCache = {};
        this.rootVerbsCache = {};
        this.verbsCache = {};
        this.wordsCache = {};
    }

    //Public methods
    public async QueryFullVerbData(verbId: number): Promise<FullVerbData>
    {
        const verbData = await this.QueryVerb(verbId);
        return await this.QueryFullVerbDataForVerbData(verbData);
    }

    public async QueryFullVerbDataForVerbData(verbData: VerbData): Promise<FullVerbData>
    {
        return {
            rootData: await this.QueryRootData(verbData.rootId),
            verbData
        };
    }

    public async QueryRootData(rootId: number)
    {
        const cached = this.rootsCache[rootId];
        if(cached !== undefined)
            return cached;

        const response = await this.apiService.roots._any_.get(rootId);
        if(response.statusCode !== 200)
            throw new Error("HERE");
        this.rootsCache[rootId] = response.data;
        return response.data;
    }

    public async QueryVerb(verbId: number)
    {
        const cached = this.verbsCache[verbId];
        if(cached !== undefined)
            return cached;

        const response = await this.apiService.verbs.get({ verbId });
        if(response.statusCode !== 200)
            throw new Error("HERE");
        this.verbsCache[verbId] = response.data;
        return response.data;
    }

    public async QueryVerbsOfRoot(rootId: number)
    {
        const cached = this.rootVerbsCache[rootId];
        if(cached !== undefined)
            return cached;

        const response = await this.apiService.roots._any_.verbs.get(rootId);
        this.rootVerbsCache[rootId] = response.data;

        return response.data;
    }

    public async QueryWord(wordId: number)
    {
        const cached = this.wordsCache[wordId];
        if(cached !== undefined)
            return cached;

        const response = await this.apiService.words._any_.get(wordId);
        if(response.statusCode !== 200)
            throw new Error("HERE");
        this.wordsCache[wordId] = response.data;

        return response.data;
    }

    //State
    private rootsCache: NumberDictionary<RootCreationData>;
    private rootVerbsCache: NumberDictionary<VerbData[]>;
    private verbsCache: NumberDictionary<VerbData>;
    private wordsCache: NumberDictionary<FullWordData>;
}