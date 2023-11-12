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
import { DialectType } from "./TranslationsController";

interface DialectStatistics
{
    dialect: DialectType;
    wordsCount: number;
    verbsCount: number;
}

interface DictionaryStatistics
{
    rootsCount: number;
    verbsCount: number;
    wordsCount: number;

    dialectCounts: DialectStatistics[];
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
            dialectCounts: await this.QueryDialectCounts()
        };
    }

    //Private methods
    private async QueryDialectCounts()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const verbs = await conn.Select("SELECT COUNT(DISTINCT verbId) as cnt, dialect FROM `verbs_translations` GROUP BY dialect");
        const words = await conn.Select("SELECT COUNT(DISTINCT wordId) as cnt, dialect FROM `words_translations` GROUP BY dialect");

        const dialectCounts: DialectStatistics[] = [];
        for (const row of verbs)
            dialectCounts.push({ dialect: row.dialect, verbsCount: row.cnt, wordsCount: 0});

        for (const row of words)
        {
            const entry = dialectCounts.find(x => x.dialect === row.dialect);
            if(entry === undefined)
                dialectCounts.push({ dialect: row.dialect, verbsCount: 0, wordsCount: row.cnt });
            else
                entry.wordsCount = row.cnt;
        }

        return dialectCounts;
    }
}