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

import { BASE_TASHKIL, FATHA } from "./Definitions";
import { DHAMMA } from "./VerbStem";

export interface Vocalized
{
    letter: string;
    tashkil?: BASE_TASHKIL;
}

export function ParseVocalizedText(text: string)
{
    const result: Vocalized[] = [];

    for(let i = 0; i < text.length;)
    {
        const letter = text[i++];
        let tashkil: BASE_TASHKIL | undefined = undefined;

        let parseTashkil = true;
        while(parseTashkil)
        {
            switch(text[i])
            {
                case DHAMMA:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = DHAMMA;
                    i++;
                    break;
                case FATHA:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = FATHA;
                    i++;
                    break;
                default:
                    parseTashkil = false;
            }
        }

        result.push({
            letter,
            tashkil
        });
    }

    return result;
}

export function Vocalize(letter: string, tashkil: BASE_TASHKIL): Vocalized
{
    return { letter, tashkil };
}