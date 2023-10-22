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
    Phrase = 7,
    Particle = 8
}

enum WordRelationType
{
    //Relation from x to y means: x is plural of y
    Plural = 0,
    //Relation from x to y means: x is feminine version of male word y
    Feminine = 1,
}

interface WordRelation
{
    refWordId: number;
    relationType: WordRelationType;
}

interface WordBaseData
{
    word: string;
    type: WordType;
    isMale: boolean | null;
    outgoingRelations: WordRelation[];
    translations: TranslationEntry[];
}

interface WordVerbReferenceData
{
    verbId: number;
    isVerbalNoun: boolean;
}

export interface WordCreationData extends WordBaseData
{
    verbData?: WordVerbReferenceData;
}

interface VerbDerivedWordData extends WordBaseData, WordVerbReferenceData
{
    id: number;
}

interface UnderivedWordData extends WordBaseData
{
    id: number;
}

interface AnyWordData extends WordBaseData
{
    id: number;
    verbData?: WordVerbReferenceData;
    incomingRelations: WordRelation[];
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
            isMale: data.isMale
        });
        const wordId = result.insertId;

        if(data.verbData !== undefined)
        {
            await conn.InsertRow("words_verbs", { wordId, verbId: data.verbData.verbId, isVerbalNoun: data.verbData.isVerbalNoun });
        }

        await this.InsertRelations(wordId, data.outgoingRelations);

        await this.translationsController.UpdateWordTranslations(wordId, data.translations);

        return wordId;
    }

    public async DeleteWord(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("words_translations", "wordId = ?", wordId);
        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        await conn.DeleteRows("words", "id = ?", wordId);
    }

    public async QueryUnderivedWords(offset: number, limit: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale
        FROM words w
        LEFT JOIN words_verbs wv
            ON wv.wordId = w.id
        LEFT JOIN words_relations wr
            ON wr.fromWordId = w.id
        WHERE (wv.verbId IS NULL) AND (wr.toWordId IS NULL)
        LIMIT ?
        OFFSET ?
        `;
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<UnderivedWordData>(query, limit, offset);
        for (const row of rows)
        {
            row.isMale = (typeof row.isMale === "number") ? (row.isMale != 0) : null;
            row.translations = await this.translationsController.QueryWordTranslations(row.id);
        }

        return rows;
    }

    public async QueryVerbDerivedWords(verbId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale, wv.verbId, wv.isVerbalNoun
        FROM words w
        INNER JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE wv.verbId = ?
        `;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select(query, verbId);
        const result: VerbDerivedWordData[] = [];
        for (const row of rows)
        {
            result.push({
                id: row.id,
                isMale: (typeof row.isMale === "number") ? (row.isMale !== 0) : null,
                isVerbalNoun: row.isVerbalNoun,
                translations: await this.translationsController.QueryWordTranslations(row.id),
                type: row.type,
                verbId: row.verbId,
                word: row.word,
                outgoingRelations: await this.QueryRelationsOf(row.id)
            });
        }

        return result;
    }

    public async QueryWord(wordId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale, wv.verbId, wv.isVerbalNoun
        FROM words w
        LEFT JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE w.id = ?
        `;
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne(query, wordId);
        if(row !== undefined)
        {
            const result: AnyWordData = {
                id: row.id,
                isMale: (row.isMale === null) ? null : (row.isMale !== 0),
                translations: await this.translationsController.QueryWordTranslations(row.id),
                type: row.type,
                word: row.word,
                outgoingRelations: await this.QueryRelationsOf(row.id),
                incomingRelations: await this.QueryRelationsTo(row.id),
            };
            if(typeof row.verbId === "number")
            {
                result.verbData = {
                    isVerbalNoun: row.isVerbalNoun !== 0,
                    verbId: row.verbId,
                };
            }

            return result;
        }

        return undefined;
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

        await conn.UpdateRows("words", { type: data.type, word: data.word, isMale: data.isMale }, "id = ?", wordId);

        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        if(data.verbData !== undefined)
        {
            await conn.InsertRow("words_verbs", { wordId, verbId: data.verbData.verbId, isVerbalNoun: data.verbData.isVerbalNoun });
        }

        await conn.DeleteRows("words_relations", "fromWordId = ?", wordId);
        await this.InsertRelations(wordId, data.outgoingRelations);

        await this.translationsController.UpdateWordTranslations(wordId, data.translations);
    }

    //Private methods
    private async InsertRelations(wordId: number, relations: WordRelation[])
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        for (const relation of relations)
        {
            await conn.InsertRow("words_relations", { fromWordId: wordId, toWordId: relation.refWordId, relationship: relation.relationType });
        }
    }

    private async QueryRelationsOf(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT toWordId, relationship FROM words_relations WHERE fromWordId = ?", wordId)

        return rows.map<WordRelation>(x => ({
            refWordId: x.toWordId,
            relationType: x.relationship
        }));
    }

    private async QueryRelationsTo(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT fromWordId, relationship FROM words_relations WHERE toWordId = ?", wordId)

        return rows.map<WordRelation>(x => ({
            refWordId: x.fromWordId,
            relationType: x.relationship
        }));
    }
}