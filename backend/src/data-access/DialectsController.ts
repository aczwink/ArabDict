/**
 * OpenArabDictViewer
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

interface DialectData
{
    id: number;
    name: string;
    emojiCodes: string;
    parent: number | null;
    iso639code: string;
    glottoCode: string;
}

@Injectable
export class DialectsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async QueryDialects()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<DialectData>("SELECT id, name, emojiCodes, parent, iso639code, glottoCode FROM dialects");

        return rows;
    }
}