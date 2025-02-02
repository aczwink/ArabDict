/**
 * OpenArabDictViewer
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

import { DBQueryExecutor, Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { TranslationEntry, TranslationsController } from "./TranslationsController";
import { RemoveTashkil } from "openarabicconjugation/src/Util";

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
    Particle = 8,
    Interjection = 9
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
    //Relation from noun x to adjective y means: x is elative degree of y
    ElativeDegree = 5,
    //Relation from x to y means: x is singulative of collective y
    Singulative = 6,
}

export enum WordRelationshipType
{
    Synonym = 0,
    Antonym = 1,
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

interface WordRelation
{
    relatedWordId: number;
    relationType: WordRelationshipType;
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

interface WordFunctionData
{
    id: number;
    type: WordType;
    translations: TranslationEntry[];
}

export interface WordCreationData
{
    word: string;
    isMale: boolean | null;
    derivation?: WordDerivationData;
    related: WordRelation[];
    functions: WordFunctionData[];
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
            word: data.word,
            isMale: data.isMale
        });
        const wordId = result.insertId;

        if(data.derivation !== undefined)
            await this.InsertDerivation(conn, data.derivation, wordId);

        await this.UpdateWordFunctions(wordId, data.functions);
        await this.UpdateWordRelations(wordId, data.related);

        return wordId;
    }

    public async DeleteWord(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const functions = await this.QueryWordFunctions(wordId);
        for (const func of functions)
            await conn.DeleteRows("words_functions_translations", "wordFunctionId = ?", func.id);
        await conn.DeleteRows("words_functions", "wordId = ?", wordId);
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
        SELECT w.id, w.word, w.isMale, wr.rootId
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
        SELECT w.id, w.word, w.isMale, wv.verbId, wv.type AS derivationType
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
        SELECT w.id, w.word, w.isMale, wv.verbId, wv.type AS derivationType, wr.rootId, wd.sourceWordId, wd.relationship
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

        await conn.UpdateRows("words", { word: data.word, isMale: data.isMale }, "id = ?", wordId);

        await conn.DeleteRows("words_derivations", "derivedWordId = ?", wordId);
        await conn.DeleteRows("words_roots", "wordId = ?", wordId);
        await conn.DeleteRows("words_verbs", "wordId = ?", wordId);
        if(data.derivation !== undefined)
            await this.InsertDerivation(conn, data.derivation, wordId);

        await this.UpdateWordFunctions(wordId, data.functions);
        await this.UpdateWordRelations(wordId, data.related);
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

        const wordsFunctionsTable = builder.AddJoin({
            type: "LEFT",
            tableName: "words_functions",
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
            { table: wordsTable, column: "isMale" },
            { table: wordsVerbsTable, column: "verbId" },
            { table: wordsVerbsTable, column: "type AS derivationType" },
            { table: wordsRootsTable, column: "rootId" },
        ]);

        builder.AddGrouping({
            table: wordsTable,
            columnName: "id"
        });

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
            const wordsFunctionsTranslationsTable = builder.AddJoin({
                type: "INNER",
                tableName: "words_functions_translations",
                conditions: [
                    {
                        column: "wordFunctionId",
                        joinTable: wordsFunctionsTable,
                        joinTableColumn: "id",
                        operator: "="
                    }
                ]
            });

            builder.AddCondition({
                operand: {
                    table: wordsFunctionsTranslationsTable,
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
                    table: wordsFunctionsTable,
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
            word: row.word,
            derived: await this.QueryDerivedLinks(row.id),
            related: await this.QueryRelatedWords(row.id),
            functions: await this.QueryWordFunctions(row.id)
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

    private async QueryRelatedWords(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT word1Id, word2Id, relationship FROM words_relations WHERE (word1Id = ?) OR (word2Id = ?)", wordId, wordId);

        return rows.map<WordRelation>(x => ({
            relatedWordId: x.word1Id === wordId ? x.word2Id : x.word1Id,
            relationType: x.relationship
        }));
    }

    private async QueryWordFunctions(wordId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT id, type FROM words_functions WHERE wordId = ?", wordId);
        const result: WordFunctionData[] = [];
        for (const row of rows)
        {
            result.push({
                id: row.id,
                translations: await this.translationsController.QueryWordFunctionTranslations(row.id),
                type: row.type
            });
        }
        return result;
    }

    private async UpdateWordFunctions(wordId: number, functions: WordFunctionData[])
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const oldRows = await this.QueryWordFunctions(wordId);
        for (const oldRow of oldRows)
        {
            const matchedNewRowIdx = functions.findIndex(x => x.id === oldRow.id);
            if(matchedNewRowIdx === -1)
            {
                await this.translationsController.UpdateWordFunctionTranslations(oldRow.id, []);
                await conn.DeleteRows("words_functions", "id = ?", oldRow.id);
            }
            else
            {
                const matchedNewRow = functions[matchedNewRowIdx];
                await conn.UpdateRows("words_functions", { type: matchedNewRow.type }, "id = ?", oldRow.id);
                await this.translationsController.UpdateWordFunctionTranslations(oldRow.id, matchedNewRow.translations);

                functions.Remove(matchedNewRowIdx);
            }
        }

        for (const newRow of functions)
        {
            const result = await conn.InsertRow("words_functions", { wordId, type: newRow.type });
            await this.translationsController.UpdateWordFunctionTranslations(result.insertId, newRow.translations);
        }
    }

    private async UpdateWordRelations(wordId: number, related: WordRelation[])
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("words_relations", "(word1Id = ?) OR (word2Id = ?)", wordId, wordId);

        for (const relation of related)
        {
            const word1Id = Math.min(relation.relatedWordId, wordId);
            const word2Id = Math.max(relation.relatedWordId, wordId);

            await conn.InsertRow("words_relations", {
                word1Id,
                word2Id,
                relationship: relation.relationType
            });
        }
    }
}