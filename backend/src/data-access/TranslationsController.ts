/**
 * ArabDict
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

import { Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";

export interface TranslationEntry
{
    dialectId: number;
    text: string;
}

@Injectable
export class TranslationsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public QueryVerbTranslations(verbId: number)
    {
        return this.QueryTranslations(verbId, "verb");
    }

    public QueryWordFunctionTranslations(wordFunctionId: number)
    {
        return this.QueryTranslations(wordFunctionId, "words_function");
    }

    public async UpdateVerbTranslations(verbId: number, translations: TranslationEntry[])
    {
        await this.UpdateTranslations(verbId, "verb", translations);
    }

    public async UpdateWordFunctionTranslations(wordFunctionId: number, translations: TranslationEntry[])
    {
        await this.UpdateTranslations(wordFunctionId, "words_function", translations);
    }

    //Private methods
    private async InsertTranslations(id: number, type: "verb" | "words_function", translations: TranslationEntry[])
    {
        const idColumnName = (type === "verb") ? type : "wordFunction";
        const fullIdColumnName = idColumnName + "Id";

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        
        for(let i = 0; i < translations.length; i++)
        {
            await conn.InsertRow(type + "s_translations", {
                [fullIdColumnName]: id,
                ordering: i,
                dialectId: translations[i].dialectId,
                text: translations[i].text
            });
        }
    }
    
    private async QueryTranslations(id: number, type: "verb" | "words_function")
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const idColumnName = (type === "verb") ? type : "wordFunction";

        return await conn.Select<TranslationEntry>("SELECT dialectId, text FROM " + type + "s_translations WHERE " + idColumnName + "Id = ? ORDER BY ordering", id);
    }

    private async UpdateTranslations(id: number, type: "verb" | "words_function", translations: TranslationEntry[])
    {
        const idColumnName = (type === "verb") ? type : "wordFunction";

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        await conn.DeleteRows(type + "s_translations", idColumnName + "Id = ?", id);

        await this.InsertTranslations(id, type, translations);
    }
}