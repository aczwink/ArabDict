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

export interface RootCreationData
{
    radicals: string;
}

interface RootData extends RootCreationData
{
    id: number;
}

@Injectable
export class RootsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async AddRoot(data: RootCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("roots", data);

        return result.insertId;
    }

    public async QueryRoot(id: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne<RootCreationData>("SELECT radicals FROM roots WHERE id = ?", id);

        return row;
    }

    public async QueryRoots(prefix: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<RootData>("SELECT id, radicals FROM roots WHERE radicals LIKE ? ORDER BY radicals", prefix + "%");

        return rows;
    }
}