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

import { Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { VerbsController } from "./VerbsController";
import { WordsController } from "./WordsController";

@Injectable
export class RandomizationController
{
    constructor(private dbController: DatabaseController, private verbsController: VerbsController, private wordsController: WordsController)
    {
    }

    public async QueryRandomVerbId()
    {
        const count = await this.verbsController.QueryVerbsCount();
        const index = Math.floor(count * Math.random());

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT id FROM verbs LIMIT ?, 1", index);
        return row!.id as number;
    }

    public async QueryRandomWordId()
    {
        const count = await this.wordsController.QueryWordsCount();
        const index = Math.floor(count * Math.random());

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT id FROM words LIMIT ?, 1", index);
        return row!.id as number;
    }
}