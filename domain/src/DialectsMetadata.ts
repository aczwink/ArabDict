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

import { DialectType } from "./Conjugator";

interface DialectMetadata
{
    hasDual: boolean;
    hasFemalePlural: boolean;
    hasJussive: boolean;
    hasPassive: boolean;
    iso639code: string;
    glottoCode: string;
}

export function GetDialectMetadata(dialectType: DialectType): DialectMetadata
{
    switch(dialectType)
    {
        case DialectType.ModernStandardArabic:
            return {
                hasDual: true,
                hasFemalePlural: true,
                hasJussive: true,
                hasPassive: true,
                iso639code: "arb",
                glottoCode: "stan1318",
            };
            
        case DialectType.Lebanese:
            return {
                hasDual: false,
                hasFemalePlural: false,
                hasJussive: false,
                hasPassive: false,
                iso639code: "apc",
                glottoCode: "stan1323"
            };
    }
}