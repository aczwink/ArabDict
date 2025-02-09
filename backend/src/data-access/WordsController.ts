/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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
import { RemoveTashkil } from "openarabicconjugation/src/Util";
import { OpenArabDictNonVerbDerivationType, OpenArabDictVerbDerivationType, OpenArabDictWord, OpenArabDictWordParentType, OpenArabDictWordRelationshipType, OpenArabDictWordType } from "openarabdict-domain";
import { TranslationEntry } from "./VerbsController";

interface WordWordDerivationLink
{
    refWordId: number;
    relationType: OpenArabDictNonVerbDerivationType;
}

interface WordRelation
{
    relatedWordId: number;
    relationType: OpenArabDictWordRelationshipType;
}

interface WordRootDerivationData
{
    rootId: number;
}

interface WordVerbDerivationData
{
    type: OpenArabDictVerbDerivationType;
    verbId: number;
}

type WordDerivationData = WordRootDerivationData | WordVerbDerivationData | WordWordDerivationLink;

interface WordFunctionData
{
    type: OpenArabDictWordType;
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
    type: OpenArabDictWordType | null;
    derivation: "any" | "none" | "root" | "verb";
    word: string;
}

@Injectable
export class WordsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async FindWords(filterCriteria: WordFilterCriteria, offset: number, limit: number)
    {
        const document = await this.dbController.GetDocumentDB();

        filterCriteria.translation = filterCriteria.translation.toLowerCase();
        filterCriteria.word = this.MapWordToSearchVariant(filterCriteria.word)
        const filtered = document.words.filter(this.DoesWordMatchFilterCriteria.bind(this, filterCriteria));

        return filtered.Values().Skip(offset).Take(limit).Map(this.QueryFullWordData.bind(this)).PromiseAll();
    }

    public async QueryRootDerivedWords(rootId: number)
    {
        function filterFunc(x: OpenArabDictWord)
        {
            if(x.type === OpenArabDictWordType.Verb)
                return x.rootId === rootId;
            return (x.parent?.type === OpenArabDictWordParentType.Root) && (x.parent.rootId === rootId);
        }

        const document = await this.dbController.GetDocumentDB();

        const words = document.words.Values().Filter(filterFunc);

        return words.Map(this.QueryFullWordData.bind(this));
    }

    public async QueryVerbDerivedWords(verbId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        const words = document.words.Values().Filter(x => (x.type !== OpenArabDictWordType.Verb) && (x.parent?.type === OpenArabDictWordParentType.Verb) && (x.parent.verbId === verbId));
        return words.Map(this.QueryFullWordData.bind(this));
    }

    public async QueryWord(wordId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        const word = document.words.find(x => x.id === wordId);
        if(word !== undefined)
            return await this.QueryFullWordData(word);

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

    //Private methods
    private DoesWordMatchFilterCriteria(filterCriteria: WordFilterCriteria, word: OpenArabDictWord)
    {
        switch(filterCriteria.derivation)
        {
            case "any":
                break;
            case "none":
                throw new Error("TODO: reimplement me1");
            case "root":
                throw new Error("TODO: reimplement me2");
            case "verb":
                throw new Error("TODO: reimplement me3");
        }

        //filterCriteria.includeRelated //TODO: is this still valid? should be derivation = word

        if(filterCriteria.translation.length > 0)
        {
            const translationMatch = word.translations.Values().Map(x => x.text.Values().Map(x => x.toLowerCase().includes(filterCriteria.translation))).Flatten().AnyTrue();
            if(!translationMatch)
                return false;
        }

        if(filterCriteria.type !== null)
        {
            if(filterCriteria.type !== word.type)
                return false;
        }

        if(filterCriteria.word.length > 0)
        {
            if(!this.MapWordToSearchVariant(word.text).includes(filterCriteria.word))
                return false;
        }

        return true;
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
        function filterFunc(x: OpenArabDictWord)
        {
            if(x.type === OpenArabDictWordType.Verb)
                return false;
            if(x.parent?.type === OpenArabDictWordParentType.NonVerbWord)
                return x.parent.wordId === wordId;
            /*if(x.parent?.type === OpenArabDictWordParentType.Verb)
                return x.parent.verbId === wordId;*/
            return false;
        }

        const document = await this.dbController.GetDocumentDB();

        const children = document.words.filter(filterFunc);

        return children.map<WordWordDerivationLink>(x => ({
            refWordId: x.id,
            relationType: (x as any).parent.relationType
        }));
    }

    private async QueryFullWordData(word: OpenArabDictWord)
    {
        const result: FullWordData = {
            id: word.id,
            isMale: ("isMale" in word) ? word.isMale : null,
            word: word.text,
            derived: await this.QueryDerivedLinks(word.id),
            related: await this.QueryRelatedWords(word.id),
            functions: await this.QueryWordFunctions(word.id),
        };
        if(word.type === OpenArabDictWordType.Verb)
        {
            result.derivation = {
                rootId: word.rootId
            };
        }
        else if(word.parent?.type === OpenArabDictWordParentType.NonVerbWord)
        {
            result.derivation = {
                refWordId: word.parent.wordId,
                relationType: word.parent.relationType
            };
        }
        else if(word.parent?.type === OpenArabDictWordParentType.Root)
        {
            result.derivation = {
                rootId: word.parent.rootId
            };
        }
        else if(word.parent?.type === OpenArabDictWordParentType.Verb)
        {
            result.derivation = {
                type: word.parent.derivation,
                verbId: word.parent.verbId,
            };
        }

        return result;
    }

    private async QueryRelatedWords(wordId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        return document.wordRelations.Values().Filter(x => (x.word1Id === wordId) || (x.word2Id === wordId)).Map<WordRelation>(x => ({
            relatedWordId: x.word1Id === wordId ? x.word2Id : x.word1Id,
            relationType: x.relationship
        })).ToArray();
    }

    private async QueryWordFunctions(wordId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        const word = document.words.find(x => x.id === wordId)!;

        const result: WordFunctionData[] = [{
            translations: word.translations,
            type: word.type
        }];
        return result;
    }
}