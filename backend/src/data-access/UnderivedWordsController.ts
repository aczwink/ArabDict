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

interface UnderivedWordData
{
    id: number;
    word: string;
    translation: string;
}

@Injectable
export class UnderivedWordsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async CreateWord(word: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("underived_words", {
            translation: "",
            word: word,
        });
        return result.insertId;
    }

    public async QueryWords(offset: number, limit: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<UnderivedWordData>("SELECT id, word, translation FROM underived_words LIMIT ? OFFSET ?", limit, offset);

        return rows;
    }

    public async UpdateWordTranslation(wordId: number, translation: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("underived_words", { translation }, "id = ?", wordId);
    }
}