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

import { DBQueryExecutor, Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { TranslationEntry, TranslationsController } from "./TranslationsController";
import { RemoveTashkil } from "arabdict-domain/src/Util";

export enum WordType
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

enum WordWordDerivationType
{
    //Relation from x to y means: x is plural of y
    Plural = 0,
    //Relation from x to y means: x is feminine version of male word y
    Feminine = 1,
    //Relation from adjective x to noun y means: x is nisba of y
    Nisba = 2,
    //Relation from x to y means: x is colloquial version of fus7a word y
    Colloquial = 3,
    //Relation from x to y means: x is an extension of word y (for example taking a word to a further meaning in a phrase)
    Extension = 4,
}

enum WordVerbDerivationType
{
    Unknown = 0,
    VerbalNoun = 1,
    ActiveParticiple = 2,
    PassiveParticiple = 3,
}

interface WordWordDerivationLink
{
    refWordId: number;
    relationType: WordWordDerivationType;
}

interface WordRootDerivationData
{
    rootId: number;
}

interface WordVerbDerivationData
{
    type: WordVerbDerivationType;
    verbId: number;
}

type WordDerivationData = WordRootDerivationData | WordVerbDerivationData | WordWordDerivationLink;

export interface WordCreationData
{
    word: string;
    type: WordType;
    isMale: boolean | null;
    translations: TranslationEntry[];
    derivation?: WordDerivationData;
}

interface FullWordData extends WordCreationData
{
    id: number;
    derivation?: WordDerivationData;
    derived: WordWordDerivationLink[];
}

export interface WordFilterCriteria
{
    includeRelated: boolean;
    translation: string;
    type: WordType | null;
    derivation: "any" | "none" | "root" | "verb";
    word: string;
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

        if(data.derivation !== undefined)
            await this.InsertDerivation(conn, data.derivation, wordId);

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

    public async FindWords(filterCriteria: WordFilterCriteria, offset: number, limit: number)
    {
        const builder = this.CreateQueryBuilder(filterCriteria);
        builder.offset = offset;
        builder.limit = limit;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select(builder.CreateSQLQuery());
        return rows.Values().Map(this.QueryFullWordData.bind(this)).PromiseAll();
    }

    public async FindWordsCount(filterCriteria: WordFilterCriteria)
    {
        const builder = this.CreateQueryBuilder(filterCriteria);
        const query = "SELECT COUNT(*) as cnt FROM (" + builder.CreateSQLQuery() + ") tbl";

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        const row = await conn.SelectOne(query);

        if(row === undefined)
            return 0;
        return row.cnt as number;
    }

    public async QueryRootDerivedWords(rootId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale, wr.rootId
        FROM words w
        INNER JOIN words_roots wr
            ON wr.wordId = w.id
        WHERE wr.rootId = ?
        `;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        const rows = await conn.Select(query, rootId);

        return rows.Values().Map(this.QueryFullWordData.bind(this));
    }

    public async QueryVerbDerivedWords(verbId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale, wv.verbId, wv.type AS derivationType
        FROM words w
        INNER JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE wv.verbId = ?
        `;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        const rows = await conn.Select(query, verbId);

        return rows.Values().Map(this.QueryFullWordData.bind(this));
    }

    public async QueryWord(wordId: number)
    {
        const query = `
        SELECT w.id, w.word, w.type, w.isMale, wv.verbId, wv.type AS derivationType, wr.rootId, wd.sourceWordId, wd.relationship
        FROM words w
        LEFT JOIN words_derivations wd
            ON wd.derivedWordId = w.id
        LEFT JOIN words_roots wr
            ON wr.wordId = w.id
        LEFT JOIN words_verbs wv
            ON wv.wordId = w.id
        WHERE w.id = ?
        `;
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne(query, wordId);
        if(row !== undefined)
            return await this.QueryFullWordData(row);

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

        await conn.DeleteRows("words_derivations", "derivedWordId = ?", wordId);
        await conn.DeleteRows("words_roots", "wordId = ?", wordId);
        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        if(data.derivation !== undefined)
            await this.InsertDerivation(conn, data.derivation, wordId);

        await this.translationsController.UpdateWordTranslations(wordId, data.translations);
    }

    //Private methods
    private CreateQueryBuilder(filterCriteria: WordFilterCriteria)
    {
        const builder = this.dbController.CreateQueryBuilder();
        const wordsTable = builder.SetPrimaryTable("words");

        const wordsRootsTable = builder.AddJoin({
            type: (filterCriteria.derivation === "root") ? "INNER" : "LEFT",
            tableName: "words_roots",
            conditions: [
                {
                    column: "wordId",
                    joinTable: wordsTable,
                    joinTableColumn: "id",
                    operator: "="
                }
            ]
        });

        const wordsVerbsTable = builder.AddJoin({
            type: (filterCriteria.derivation === "verb") ? "INNER" : "LEFT",
            tableName: "words_verbs",
            conditions: [
                {
                    column: "wordId",
                    joinTable: wordsTable,
                    joinTableColumn: "id",
                    operator: "="
                }
            ]
        });

        builder.SetColumns([
            { table: wordsTable, column: "id" },
            { table: wordsTable, column: "word" },
            { table: wordsTable, column: "type" },
            { table: wordsTable, column: "isMale" },
            { table: wordsVerbsTable, column: "verbId" },
            { table: wordsVerbsTable, column: "type AS derivationType" },
            { table: wordsRootsTable, column: "rootId" },
        ]);

        builder.AddCondition({
            operand: {
                function: "AR_TRIM",
                args: [{
                    table: wordsTable,
                    column: "word",
                }]
            },
            operator: "LIKE",
            constant: "%" + this.MapWordToSearchVariant(filterCriteria.word) + "%"
        });

        if(filterCriteria.translation.trim().length > 0)
        {
            const wordsTranslationsTable = builder.AddJoin({
                type: "INNER",
                tableName: "words_translations",
                conditions: [
                    {
                        column: "wordId",
                        joinTable: wordsTable,
                        joinTableColumn: "id",
                        operator: "="
                    }
                ]
            });

            builder.AddCondition({
                operand: {
                    table: wordsTranslationsTable,
                    column: "text",
                },
                operator: "LIKE",
                constant: "%" + filterCriteria.translation + "%"
            });
        }

        if(filterCriteria.type !== null)
        {
            builder.AddCondition({
                operand: {
                    table: wordsTable,
                    column: "type",
                },
                operator: "=",
                constant: filterCriteria.type
            });
        }

        if( (filterCriteria.derivation === "none") || (filterCriteria.derivation === "verb") )
        {
            builder.AddCondition({
                operand: {
                    table: wordsRootsTable,
                    column: "rootId",
                },
                operator: "IS",
                constant: null
            });
        }
        if( (filterCriteria.derivation === "none") || (filterCriteria.derivation === "root") )
        {
            builder.AddCondition({
                operand: {
                    table: wordsVerbsTable,
                    column: "verbId",
                },
                operator: "IS",
                constant: null
            });
        }

        if(!filterCriteria.includeRelated)
        {
            const wordsRelationsTable = builder.AddJoin({
                type: "LEFT",
                tableName: "words_derivations",
                conditions: [
                    {
                        column: "derivedWordId",
                        joinTable: wordsTable,
                        joinTableColumn: "id",
                        operator: "="
                    },
                ]
            });

            builder.AddCondition({
                operand: {
                    table: wordsRelationsTable,
                    column: "sourceWordId",
                },
                operator: "IS",
                constant: null
            });
        }

        return builder;
    }

    private async InsertDerivation(conn: DBQueryExecutor, derivation: WordDerivationData, wordId: number)
    {
        if("rootId" in derivation)
            await conn.InsertRow("words_roots", { wordId, rootId: derivation.rootId });
        else if("verbId" in derivation)
            await conn.InsertRow("words_verbs", { wordId, verbId: derivation.verbId, type: derivation.type });
        else
            await conn.InsertRow("words_derivations", { derivedWordId: wordId, sourceWordId: derivation.refWordId, relationship: derivation.relationType });
    }

    private MapWordToSearchVariant(word: string)
    {
        const trimmed = RemoveTashkil(word);

        //map all chars to their basic form
        const alif = trimmed.replace(/[\u0622\u0623\u0625]/g, "\u0627");
        const waw = alif.replace(/[\u0624]/g, "\u0648");
        const ya = waw.replace(/[\u0626\u0649]/g, "\u064A");

        return ya;
    }

    private async QueryDerivedLinks(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT derivedWordId, relationship FROM words_derivations WHERE sourceWordId = ?", wordId)

        return rows.map<WordWordDerivationLink>(x => ({
            refWordId: x.derivedWordId,
            relationType: x.relationship
        }));
    }

    private async QueryFullWordData(row: any)
    {
        const result: FullWordData = {
            id: row.id,
            isMale: (row.isMale === null) ? null : (row.isMale !== 0),
            translations: await this.translationsController.QueryWordTranslations(row.id),
            type: row.type,
            word: row.word,
            derived: await this.QueryDerivedLinks(row.id),
        };
        if(typeof row.verbId === "number")
        {
            result.derivation = {
                type: row.derivationType,
                verbId: row.verbId,
            };
        }
        else if(typeof row.rootId === "number")
        {
            result.derivation = {
                rootId: row.rootId
            };
        }
        else if(typeof row.sourceWordId === "number")
        {
            result.derivation = {
                refWordId: row.sourceWordId,
                relationType: row.relationship
            };
        }

        return result;
    }
}