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

import { ALEF, ALEF_MADDA, BASE_TASHKIL, DHAMMA, KASRA, SUKUN, WAW, WAW_HAMZA, YA, YA_HAMZA } from "./Definitions";
import { ALEF_HAMZA, FATHA, HAMZA } from "./Definitions";
import { Vocalized, VocalizedToString } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function DetermineHamzaSeat(isFinal: boolean, followingVowel?: BASE_TASHKIL, predecessor?: Vocalized): Vocalized
{
    function MaxPrecedence(t1: BASE_TASHKIL, t2: BASE_TASHKIL): BASE_TASHKIL
    {
        if( (t1 === KASRA) || (t2 === KASRA) )
            return KASRA;
        if( (t1 === DHAMMA) || (t2 === DHAMMA) )
            return DHAMMA;
        return FATHA;
    }
    function MaxPrecedenceWithFallback(t1?: BASE_TASHKIL, t2?: BASE_TASHKIL): BASE_TASHKIL
    {
        if(t1 === undefined)
        {
            if(t2 === undefined)
                return FATHA;
            return t2;
        }
        else if(t2 === undefined)
            return t1;
        return MaxPrecedence(t1, t2);
    }

    function VowelToTashkil(vowel: string)
    {
        switch(vowel)
        {
            case ALEF:
                return FATHA;
            case WAW:
                return DHAMMA;
            case YA:
                return KASRA;
        }
        throw new Error("Should never happen");
    }

    const predecessorIsLongVowel = (predecessor?.letter === ALEF) || (predecessor?.letter === WAW) || (predecessor?.letter === YA);
    let decidingTashkil;

    if(isFinal)
    {
        if(predecessorIsLongVowel)
            decidingTashkil = undefined;
        else
            decidingTashkil = predecessor?.tashkil;
    }
    else if(predecessorIsLongVowel)
    {
        decidingTashkil = MaxPrecedenceWithFallback(followingVowel, VowelToTashkil(predecessor.letter));
        if(decidingTashkil === FATHA)
        {
            if(predecessor.letter === YA)
                throw new Error("TODO: in this case it should be written over ya. check this case and write test");
            else
                decidingTashkil = undefined;
        }
    }
    else
    {
        decidingTashkil = MaxPrecedenceWithFallback(predecessor?.tashkil, followingVowel);
    }

    switch(decidingTashkil)
    {
        case DHAMMA:
            return { letter: WAW_HAMZA, shadda: false, tashkil: followingVowel };
        case FATHA:
        case SUKUN: //the article doesn't talk about sukun but this was found through tests
            return { letter: ALEF_HAMZA, tashkil: followingVowel, shadda: false };
        case KASRA:
            return { letter: YA_HAMZA, shadda: false, tashkil: followingVowel };
        case undefined:
            return { letter: HAMZA, shadda: false, tashkil: followingVowel };
    }
}

function MaddahCheck(seat: Vocalized, prev?: Vocalized)
{
    if( (seat.letter === ALEF_HAMZA) && (prev?.letter === ALEF_HAMZA))
    {
        if( (seat.tashkil === SUKUN) && (prev.tashkil === FATHA))
            return true; //this case was not documented anywhere but was found through tests

        console.log("HERE MaddahCheck", seat.tashkil, prev.tashkil);
        throw new Error("TODO: NOT IMPLEMENTED");
    }

    return false;
}

export function Hamzate(vocalized: Vocalized[])
{
    //special case for empty words (for example dual does not exist in levantine dialects)
    if(vocalized.length === 0)
        return "";

    const result: Vocalized[] = [];
    for(let i = 0; i < vocalized.length; i++)
    {
        if(vocalized[i].letter === HAMZA)
        {
            const prev = result[result.length - 1];
            const seat = DetermineHamzaSeat(i === (vocalized.length - 1), vocalized[i].tashkil, prev);
            if(MaddahCheck(seat, prev))
                result[result.length - 1] = { letter: ALEF_MADDA, shadda: false };
            else
                result.push(seat);
        }
        else
            result.push(vocalized[i]);
    }

    return result.Values().Map(VocalizedToString).Join("");
}
