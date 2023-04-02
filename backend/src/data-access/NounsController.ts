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

export interface NounCreationData
{
    noun: string;
    verbId: number;
}

interface NounData extends NounCreationData
{
    translation: string;
}

@Injectable
export class NounsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async CreateNoun(data: NounCreationData)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.InsertRow("nouns", {
            noun: data.noun,
            verbId: data.verbId,
            translation: ""
        });
    }

    public async UpdateNounTranslation(noun: NounCreationData, translation: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("nouns", { translation }, "noun = ? AND verbId = ?", noun.noun, noun.verbId);
    }

    public async QueryNouns(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select<NounData>("SELECT noun, verbId, translation FROM nouns WHERE verbId = ?", verbId);

        return rows;
    }
}