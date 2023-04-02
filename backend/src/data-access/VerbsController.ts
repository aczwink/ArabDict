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

export interface VerbCreationData
{
    rootId: number;
    stem: number;
    stem1MiddleRadicalTashkil: string;
}

interface VerbData extends VerbCreationData
{
    id: number;
    translation: string;
}

@Injectable
export class VerbsController
{
    constructor(private dbController: DatabaseController)
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
            translation: ""
        });

        return result.insertId;
    }

    public async QueryVerb(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne<VerbData>("SELECT id, rootId, stem, stem1MiddleRadicalTashkil, translation FROM verbs WHERE id = ?", verbId);

        return row;
    }

    public async QueryVerbs(rootId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<VerbData>("SELECT id, stem, stem1MiddleRadicalTashkil, translation FROM verbs WHERE rootId = ? ORDER BY stem, stem1MiddleRadicalTashkil", rootId);

        return rows;
    }

    public async UpdateVerbTranslation(verbId: number, translation: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("verbs", { translation }, "id = ?", verbId);
    }
}