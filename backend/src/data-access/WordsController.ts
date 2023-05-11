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

enum WordType
{
    Noun = 0,
    Preposition = 1
}

export interface WordCreationData
{
    verbId: number;
    word: string;
    type: WordType;
}

interface WordData extends WordCreationData
{
    id: number;
    translation: string;
}

@Injectable
export class WordsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async CreateWord(data: WordCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("words", {
            translation: "",
            type: data.type,
            verbId: data.verbId,
            word: data.word,
        });
        return result.insertId;
    }

    public async DeleteWord(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("words", "id = ?", wordId);
    }

    public async UpdateWordTranslation(wordId: number, translation: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("words", { translation }, "id = ?", wordId);
    }

    public async QueryVerbDerivedWords(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<WordData>("SELECT id, verbId, type, word, translation FROM words WHERE verbId = ?", verbId);

        return rows;
    }
}