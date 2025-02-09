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
import { Of } from "acts-util-core";

interface RootOverviewData
{
    id: number;
    radicals: string;
    flags: number;
}

@Injectable
export class RootsController
{
    constructor(private dbController: DatabaseController)
    {
    }

    //Public methods
    public async QueryRoot(id: number)
    {
        const document = await this.dbController.GetDocumentDB();
        
        const root = document.roots.find(x => x.id === id);
        if(root === undefined)
            return undefined;

        return Of<RootOverviewData>({
            id,
            flags: 0,
            radicals: root.radicals
        });
    }

    public async QueryRoots(prefix: string)
    {
        const document = await this.dbController.GetDocumentDB();

        const filtered = document.roots.Values().Filter(x => x.radicals.startsWith(prefix));
        return filtered.Map<RootOverviewData>( x => ({
            flags: 0,
            id: x.id,
            radicals: x.radicals
        })).OrderBy(x => x.radicals).ToArray();
    }
}