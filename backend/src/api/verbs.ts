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

import { APIController, Body, BodyProp, Get, NotFound, Post, Put, Query } from "acts-util-apilib";
import { VerbCreationData, VerbUpdateData, VerbsController } from "../data-access/VerbsController";
import { WordsController } from "../data-access/WordsController";

@APIController("verbs")
class _api_
{
    constructor(private verbsController: VerbsController, private wordsController: WordsController)
    {
    }

    @Post()
    public async CreateVerb(
        @Body data: VerbCreationData
    )
    {
        return await this.verbsController.CreateVerb(data);
    }

    @Get()
    public async QueryVerb(
        @Query verbId: number
    )
    {
        const verb = await this.verbsController.QueryVerb(verbId);
        if(verb === undefined)
            return NotFound("verb not found");
        return verb;
    }

    @Get("search")
    public Search(
        @Query byTranslation: string
    )
    {
        return this.verbsController.SearchVerbs(byTranslation);
    }

    @Get("words")
    public async QueryVerbDerivedWords(
        @Query verbId: number
    )
    {
        return await this.wordsController.QueryVerbDerivedWords(verbId);
    }

    @Put()
    public async UpdateVerb(
        @BodyProp verbId: number,
        @BodyProp data: VerbUpdateData
    )
    {
        await this.verbsController.UpdateVerb(verbId, data);
    }
}