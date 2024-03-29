/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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

import { APIController, Body, Delete, Get, NotFound, Path, Post, Put, Query } from "acts-util-apilib";
import { WordCreationData, WordFilterCriteria, WordType, WordsController } from "../data-access/WordsController";

type OptionalWordType = WordType | null;
type WordSearchDerivation = "any" | "none" | "root" | "verb";

@APIController("words")
class _api_
{
    constructor(private wordsController: WordsController)
    {
    }

    @Post()
    public async AddWord(
        @Body data: WordCreationData
    )
    {
        return await this.wordsController.CreateWord(data);
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
        const totalCount = await this.wordsController.FindWordsCount(filterCriteria);
        const words = await this.wordsController.FindWords(filterCriteria, offset, limit);

        return {
            totalCount,
            words,
        };
    }
}

@APIController("words/{wordId}")
class _api2_
{
    constructor(private wordsController: WordsController)
    {
    }

    @Delete()
    public async DeleteWord(
        @Path wordId: number,
    )
    {
        await this.wordsController.DeleteWord(wordId);
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

    @Put()
    public async UpdateWord(
        @Path wordId: number,
        @Body data: WordCreationData
    )
    {
        return await this.wordsController.UpdateWord(wordId, data);
    }
}