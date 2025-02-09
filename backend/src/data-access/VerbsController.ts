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

import { Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { OpenArabDictWordRelationshipType, OpenArabDictWordType } from "openarabdict-domain";

interface VerbRelation
{
    relatedVerbId: number;
    relationType: OpenArabDictWordRelationshipType;
}

export interface TranslationEntry
{
    dialectId: number;
    text: string[];
}

export interface VerbUpdateData
{
    dialectId: number;
    stem: number;
    stem1Context?: string;
    translations: TranslationEntry[];
    related: VerbRelation[];
}

export interface VerbCreationData extends VerbUpdateData
{
    rootId: number;
}

interface VerbData extends VerbCreationData
{
    id: number;
}

@Injectable
export class VerbsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async QueryVerb(verbId: number): Promise<VerbData | undefined>
    {
        const document = await this.dbController.GetDocumentDB();

        const row = document.words.find(x => x.id === verbId);
        if((row === undefined) || (row.type !== OpenArabDictWordType.Verb))
            return undefined;

        return {
            id: row.id,
            rootId: row.rootId,
            dialectId: row.dialectId,
            stem: row.stem,
            translations: row.translations,
            stem1Context: row.stemParameters,
            related: await this.QueryRelatedVerbs(row.id),
        };
    }

    public async QueryVerbs(rootId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        const result = await document.words.Values().Filter(x => (x.type === OpenArabDictWordType.Verb) && (x.rootId === rootId)).Map(x => this.QueryVerb(x.id)).PromiseAll();
        return result.Values().NotUndefined().ToArray();
    }

    public async QueryVerbsCount()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM verbs");
        if(row === undefined)
            return 0;
        return row.cnt as number;
    }

    //Private methods
    private async QueryRelatedVerbs(verbId: number)
    {
        const document = await this.dbController.GetDocumentDB();

        return document.wordRelations.Values().Filter(x => (x.word1Id === verbId) || (x.word2Id === verbId)).Map<VerbRelation>(x => ({
            relatedVerbId: x.word1Id === verbId ? x.word2Id : x.word1Id,
            relationType: x.relationship
        })).ToArray();
    }
}