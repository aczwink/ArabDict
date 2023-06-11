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

export interface VerbUpdateData
{
    stem: number;
    stem1MiddleRadicalTashkil: string;
    stem1MiddleRadicalTashkilPresent: string;
    translations: TranslationEntry[];
    verbalNounIds: number[];
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
    constructor(private dbController: DatabaseController, private translationsController: TranslationsController)
    {
    }

    //Public methods
    public async CreateVerb(data: VerbCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("verbs", {
            rootId: data.rootId,
            stem: data.stem,
            stem1MiddleRadicalTashkil: (data.stem === 1) ? data.stem1MiddleRadicalTashkil : "",
            stem1MiddleRadicalTashkilPresent: (data.stem === 1) ? data.stem1MiddleRadicalTashkilPresent : "",
        });
        const verbId = result.insertId;

        await this.translationsController.UpdateVerbTranslations(verbId, data.translations);

        return verbId;
    }

    public async QueryVerb(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne<VerbData>("SELECT id, rootId, stem, stem1MiddleRadicalTashkil, stem1MiddleRadicalTashkilPresent FROM verbs WHERE id = ?", verbId);
        if(row !== undefined)
        {
            const rows = await conn.Select("SELECT verbalNounId FROM verbs_verbalNouns WHERE verbId = ?", verbId);
            row.verbalNounIds = rows.map(x => x.verbalNounId);

            row.translations = await this.translationsController.QueryVerbTranslations(row.id);
        }

        return row;
    }

    public async QueryVerbs(rootId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT id FROM verbs WHERE rootId = ? ORDER BY stem, stem1MiddleRadicalTashkil", rootId);
        const result = await rows.Values().Map(x => this.QueryVerb(x.id)).PromiseAll();
        return result.Values().NotUndefined().ToArray();
    }

    public async UpdateVerb(verbId: number, data: VerbUpdateData)
    {
        const verb = await this.QueryVerb(verbId);
        if(verb === undefined)
            return;

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("verbs", {
            stem1MiddleRadicalTashkil: (verb.stem === 1) ? data.stem1MiddleRadicalTashkil : "",
            stem1MiddleRadicalTashkilPresent: (verb.stem === 1) ? data.stem1MiddleRadicalTashkilPresent : "",
        }, "id = ?", verbId);

        await conn.DeleteRows("verbs_verbalNouns", "verbId = ?", verbId);
        for (const verbalNounId of data.verbalNounIds)
        {    
            await conn.InsertRow("verbs_verbalNouns", { verbId, verbalNounId });
        }

        await this.translationsController.UpdateVerbTranslations(verbId, data.translations);
    }
}