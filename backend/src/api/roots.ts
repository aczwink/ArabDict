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

import { APIController, Body, Delete, Get, Path, Post, Put, Query } from "acts-util-apilib";
import { RootCreationData, RootsController } from "../data-access/RootsController";
import { VerbsController } from "../data-access/VerbsController";
import { WordsController } from "../data-access/WordsController";

@APIController("roots")
class _api_
{
    constructor(private rootsController: RootsController)
    {
    }

    @Post()
    public async AddRoot(
        @Body data: RootCreationData
    )
    {
        return await this.rootsController.AddRoot(data);
    }

    @Get()
    public async QueryRoots(
        @Query prefix: string
    )
    {
        return await this.rootsController.QueryRoots(prefix);
    }
}

@APIController("roots/{rootId}")
class _api2_
{
    constructor(private rootsController: RootsController, private verbsController: VerbsController, private wordsController: WordsController)
    {
    }

    @Delete()
    public async DeleteRoot(
        @Path rootId: number
    )
    {
        await this.rootsController.DeleteRoot(rootId);
    }

    @Get()
    public async QueryRoot(
        @Path rootId: number
    )
    {
        return await this.rootsController.QueryRoot(rootId);
    }

    @Get("verbs")
    public async QueryVerbs(
        @Path rootId: number
    )
    {
        return await this.verbsController.QueryVerbs(rootId);
    }

    @Get("words")
    public async QueryRootDerivedWords(
        @Path rootId: number
    )
    {
        return (await this.wordsController.QueryRootDerivedWords(rootId)).PromiseAll();
    }

    @Put()
    public async UpdateRoot(
        @Path rootId: number,
        @Body data: RootCreationData
    )
    {
        await this.rootsController.UpdateRoot(rootId, data);
    }
}