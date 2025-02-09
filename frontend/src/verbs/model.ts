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

import { Stem1Context } from "openarabicconjugation/src/Definitions";
import { DialectType } from "openarabicconjugation/src/Dialects";
import { GetDialectMetadata } from "openarabicconjugation/src/DialectsMetadata";
import { RootType } from "openarabicconjugation/src/VerbRoot";

export function Stem1DataToStem1Context(dialect: DialectType, rootType: RootType, data: string): Stem1Context
{
    return GetDialectMetadata(dialect).CreateStem1Context(rootType, data);
}

export function Stem1DataToStem1ContextOptional(dialect: DialectType, rootType: RootType, data?: string): Stem1Context | undefined
{
    if(data === undefined)
        return undefined;

    return Stem1DataToStem1Context(dialect, rootType, data);
}