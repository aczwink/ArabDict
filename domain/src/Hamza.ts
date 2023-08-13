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

import { ALEF_MADDA, BASE_TASHKIL, DHAMMA, SUKUN, WAW_HAMZA } from "./Definitions";
import { ALEF_HAMZA, FATHA, HAMZA } from "./Definitions";
import { Vocalized, VocalizedToString } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function DetermineHamzaSeat(followingVowel: BASE_TASHKIL, preceedingVowel?: BASE_TASHKIL): Vocalized
{
    function MaxPrecedence(t1: BASE_TASHKIL, t2: BASE_TASHKIL): BASE_TASHKIL
    {
        /*if( (t1 === KASRA) || (t2 === KASRA) )
            return KASRA;*/
        if( (t1 === DHAMMA) || (t2 === DHAMMA) )
            return DHAMMA;
        return FATHA;
    }

    const tashkil = (preceedingVowel === undefined) ? followingVowel : MaxPrecedence(followingVowel, preceedingVowel);
    switch(tashkil)
    {
        case DHAMMA:
            return { letter: WAW_HAMZA, shadda: false, tashkil: followingVowel };
        case FATHA:
        case SUKUN: //the article doesn't talk about sukun but this was found through tests
            return { letter: ALEF_HAMZA, tashkil: followingVowel, shadda: false };
    }

    console.log("HERE DetermineHamzaSeat", tashkil, followingVowel, preceedingVowel);
    throw new Error("TODO: NOT IMPLEMENTED");
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
            const seat = DetermineHamzaSeat(vocalized[i].tashkil!, prev?.tashkil);
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
