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

interface DictionaryStatistics
{
    rootsCount: number;
    verbsCount: number;
    wordsCount: number;
}

@Injectable
export class StatisticsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    public async QueryStatistics(): Promise<DictionaryStatistics>
    {
        function ExtractCount(row: any)
        {
            const c = row.cnt;
            if(typeof c === "number")
                return c;
            return 0;
        }

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const r1 = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM roots");
        const r2 = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM verbs");
        const r3 = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM words");

        return {
            rootsCount: ExtractCount(r1),
            verbsCount: ExtractCount(r2),
            wordsCount: ExtractCount(r3),
        };
    }
}