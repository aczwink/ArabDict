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
import { TranslationEntry, TranslationsController } from "./TranslationsController";

enum WordType
{
    Noun = 0,
    Preposition = 1,
    Adjective = 2,
    Conjunction = 3,
    /**
     * A verb that comes from an Arabic dialect or that was adopted by a foreign language and therefore does not base on a root, a stem etc.
     */
    ForeignVerb = 4,
    Adverb = 5,
    Pronoun = 6,
}

interface WordBaseData
{
    word: string;
    type: WordType;
    translations: TranslationEntry[];
}

export interface WordCreationData extends WordBaseData
{
    verbId?: number;
}

interface VerbDerivedWordData extends WordBaseData
{
    id: number;
    verbId: number;
}

interface UnderivedWordData extends WordBaseData
{
    id: number;
}

interface AnyWordData extends WordBaseData
{
    id: number;
    verbId?: number;
}

@Injectable
export class WordsController
{
    constructor(private dbController: DatabaseController, private translationsController: TranslationsController)
    {
    }

    //Public methods
    public async CreateWord(data: WordCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("words", {
            type: data.type,
            word: data.word,
        });
        const wordId = result.insertId;

        if(data.verbId !== undefined)
        {
            await conn.InsertRow("words_verbs", { wordId, verbId: data.verbId });
        }

        await this.translationsController.UpdateWordTranslations(wordId, data.translations);

        return wordId;
    }

    public async DeleteWord(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        await conn.DeleteRows("words", "id = ?", wordId);
    }

    public async QueryUnderivedWords(offset: number, limit: number)
    {
        const query = `
        SELECT w.id, w.word, w.type
        FROM words w
        LEFT JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE wv.verbId IS NULL
        LIMIT ?
        OFFSET ?
        `;
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<UnderivedWordData>(query, limit, offset);
        for (const row of rows)
        {
            row.translations = await this.translationsController.QueryWordTranslations(row.id);
        }

        return rows;
    }

    public async QueryVerbDerivedWords(verbId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, wv.verbId
        FROM words w
        INNER JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE wv.verbId = ?
        `;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<VerbDerivedWordData>(query, verbId);
        for (const row of rows)
        {
            row.translations = await this.translationsController.QueryWordTranslations(row.id);
        }

        return rows;
    }

    public async QueryWord(wordId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, wv.verbId
        FROM words w
        LEFT JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE w.id = ?
        `;
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne<AnyWordData>(query, wordId);
        if(row !== undefined)
        {
            row.verbId = (typeof row.verbId === "number") ? row.verbId : undefined;
            row.translations = await this.translationsController.QueryWordTranslations(row.id);
        }

        return row;
    }

    public async QueryWordsCount()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM words");
        if(row === undefined)
            return 0;
        return row.cnt as number;
    }

    public async UpdateWord(wordId: number, data: WordCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("words", { type: data.type, word: data.word }, "id = ?", wordId);

        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        if(data.verbId !== undefined)
        {
            await conn.InsertRow("words_verbs", { wordId, verbId: data.verbId });
        }

        await this.translationsController.UpdateWordTranslations(wordId, data.translations);
    }
}