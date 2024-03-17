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

import { Letter, TASHKIL_SHADDA, Tashkil } from "./Definitions";

export type BASE_TASHKIL = "\u064E" | "\u064F" | "\u0650" | "\u0652"; //TODO: remove

export interface _LegacyPartiallyVocalized //TODO: REMOVE
{
    letter: string;
    tashkil?: BASE_TASHKIL;
    shadda: boolean;
}

interface Vocalized
{
    letter: Letter;
    shadda: boolean;
}

export interface PartiallyVocalized extends Vocalized
{
    tashkil?: Tashkil;
}

export interface FullyVocalized extends Vocalized
{
    tashkil: Tashkil;
}

function cmp(a: _LegacyPartiallyVocalized, b: _LegacyPartiallyVocalized)
{
    if(a.letter === b.letter)
    {
        const tashkilMatches = (a.tashkil === b.tashkil) || ( (a.tashkil === undefined) && (b.tashkil !== undefined) ) || ( (b.tashkil === undefined) && (a.tashkil !== undefined) );
        if(tashkilMatches)
        {
            if(a.shadda === b.shadda)
                return 1;
            return 0.75;
        }
    }

    return 0;
}

export function CompareVocalized(a: _LegacyPartiallyVocalized[], b: _LegacyPartiallyVocalized[])
{
    if(a.length !== b.length)
        return -1;

    let sum = 0;
    for(let i = 0; i < a.length; i++)
    {
        const res = cmp(a[i], b[i]);
        if(res === 0)
            return 0;
        sum += res;
    }
    return sum / a.length;
}

export function IsLongVowel(vocalized: FullyVocalized, predecessor?: FullyVocalized)
{
    const isLongYa = (vocalized.letter === Letter.Ya) && (vocalized.tashkil === Tashkil.LongVowelMarker) && (predecessor?.tashkil === Tashkil.Kasra);
    const isLongWaw = (vocalized.letter === Letter.Waw) && (vocalized.tashkil === Tashkil.LongVowelMarker) && (predecessor?.tashkil === Tashkil.Dhamma);

    return isLongYa || isLongWaw;
}

export function ParseVocalizedText(text: string)
{
    const result: _LegacyPartiallyVocalized[] = [];

    for(let i = 0; i < text.length;)
    {
        const letter = text[i++];
        let tashkil: BASE_TASHKIL | undefined = undefined;
        let shadda = false;

        let parseTashkil = true;
        while(parseTashkil)
        {
            switch(text[i])
            {
                case Tashkil.Dhamma:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Dhamma;
                    i++;
                    break;
                case Tashkil.Fatha:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Fatha;
                    i++;
                    break;
                case Tashkil.Kasra:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Kasra;
                    i++;
                    break;
                case TASHKIL_SHADDA:
                    if(shadda)
                        throw new Error("Multiple shaddas are not allowed");
                    shadda = true;
                    i++;
                    break;
                case Tashkil.Sukun:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = Tashkil.Sukun;
                    i++;
                    break;
                default:
                    parseTashkil = false;
            }
        }

        result.push({
            letter,
            tashkil,
            shadda
        });
    }

    return result;
}

export function _LegacyVocalizedToString(v: _LegacyPartiallyVocalized) //TODO: REMOVE
{
    return v.letter + (v.shadda ? TASHKIL_SHADDA : "") + (v.tashkil ? v.tashkil : "");
}

export function VocalizedToString(v: PartiallyVocalized)
{
    return v.letter + (v.shadda ? TASHKIL_SHADDA : "") + (v.tashkil ? v.tashkil : "");
}