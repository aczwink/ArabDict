/**
 * ArabDict
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

import { Injectable } from "acfrontend";
import { APIService } from "./APIService";
import { DialectData } from "../dist/api";

@Injectable
export class DialectsService
{
    constructor(private apiService: APIService)
    {
    }

    //Public methods
    public GetDialect(dialectId: number)
    {
        if(this.dialects === undefined)
            throw new Error("Method not implemented.");
        return this.dialects.find(x => x.id === dialectId)!;
    }

    public async QueryDialects()
    {
        if(this.dialects === undefined)
            this.dialects = await this.LoadDialects();
        return this.dialects;
    }

    //State
    private dialects?: DialectData[];

    //Private methods
    private async LoadDialects()
    {
        const response = await this.apiService.dialects.get();
        return response.data;
    }
}