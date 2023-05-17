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

import { APIController, BodyProp, Get, Post, Put, Query } from "acts-util-apilib";
import { UnderivedWordsController } from "../data-access/UnderivedWordsController";

@APIController("words/underived")
class _api_
{
    constructor(private underivedWordsController: UnderivedWordsController)
    {
    }

    @Post()
    public async AddWord(
        @BodyProp word: string
    )
    {
        return await this.underivedWordsController.CreateWord(word);
    }

    @Get()
    public async QueryWords(
        @Query offset: number,
        @Query limit: number
    )
    {
        return await this.underivedWordsController.QueryWords(offset, limit);
    }

    @Put()
    public async UpdateWordTranslation(
        @BodyProp wordId: number,
        @BodyProp translation: string
    )
    {
        return await this.underivedWordsController.UpdateWordTranslation(wordId, translation);
    }
}