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

import { BASE_TASHKIL, DHAMMA, FATHA, FULL_TASHKIL, KASRA, Letter, SHADDA, SUKUN, Tashkil } from "./Definitions";

export interface _LegacyPartiallyVocalized
{
    letter: string;
    tashkil?: BASE_TASHKIL;
    shadda: boolean;
}
export interface _LegacyVerbVocalized
{
    letter: string;
    tashkil: BASE_TASHKIL;
    shadda: boolean;
}

export interface _LegacyFullyVocalized
{
    letter: string;
    tashkil: FULL_TASHKIL;
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
    const isYa = (vocalized.letter === Letter.Ya) && (vocalized.tashkil === Tashkil.Vowel) && (predecessor?.tashkil === Tashkil.Kasra);

    return isYa;
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
                case KASRA:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = KASRA;
                    i++;
                    break;
                case SHADDA:
                    if(shadda)
                        throw new Error("Multiple shaddas are not allowed");
                    shadda = true;
                    i++;
                    break;
                case SUKUN:
                    if(tashkil !== undefined)
                        throw new Error("Doubled tashkil");
                    tashkil = SUKUN;
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

export function Vocalize(letter: string, tashkil: BASE_TASHKIL): _LegacyPartiallyVocalized
{
    return { letter, tashkil, shadda: false };
}

export function _LegacyVocalizedToString(v: _LegacyPartiallyVocalized)
{
    return v.letter + (v.shadda ? SHADDA : "") + (v.tashkil ? v.tashkil : "");
}

export function VocalizedToString(v: PartiallyVocalized)
{
    return v.letter + (v.shadda ? SHADDA : "") + (v.tashkil ? v.tashkil : "");
}