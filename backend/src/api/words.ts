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

import { APIController, Get, NotFound, Path, Query } from "acts-util-apilib";
import { WordFilterCriteria, WordsController } from "../data-access/WordsController";
import { OpenArabDictWordType } from "openarabdict-domain";

type OptionalWordType = OpenArabDictWordType | null;
type WordSearchDerivation = "any" | "none" | "root" | "verb";

@APIController("words")
class _api_
{
    constructor(private wordsController: WordsController)
    {
    }

    @Get()
    public async FindWords(
        @Query wordFilter: string,
        @Query derivation: WordSearchDerivation,
        @Query includeRelated: boolean,
        @Query translation: string,
        @Query type: OptionalWordType,
        @Query offset: number,
        @Query limit: number,
    )
    {
        const filterCriteria: WordFilterCriteria = {
            includeRelated,
            derivation,
            word: wordFilter,
            translation,
            type
        };
        const words = await this.wordsController.FindWords(filterCriteria, offset, limit);

        return words;
    }
}

@APIController("words/{wordId}")
class _api2_
{
    constructor(private wordsController: WordsController)
    {
    }

    @Get()
    public async QueryWord(
        @Path wordId: number,
    )
    {
        const word = await this.wordsController.QueryWord(wordId);
        if(word === undefined)
            return NotFound("word not found");
        return word;
    }
}