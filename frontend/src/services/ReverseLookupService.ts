/**
 * ArabDict
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
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Dictionary } from "../../../../ACTS-Util/core/dist/Dictionary";
import { APIService } from "./APIService";

@Injectable
export class ReverseLookupService
{
    constructor(private apiService: APIService)
    {
        this.cache = {};
    }

    //Public methods
    public async TryFindRootId(root: VerbRoot)
    {
        let rootId = this.cache[root.ToString()];
        if(rootId !== undefined)
            return rootId;
        
        const response = await this.apiService.roots.get({ prefix: root.radicalsAsSeparateLetters.join("") });
        if(response.data.length === 0)
            return undefined;
        if(response.data.length > 1)
            throw new Error("TODO: implement me");
        
        rootId = response.data[0].id;
        this.cache[root.ToString()] = rootId;
        
        return rootId;
    }

    //State
    private cache: Dictionary<number>;
}