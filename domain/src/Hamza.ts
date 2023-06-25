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

import { BASE_TASHKIL, DHAMMA, WAW_HAMZA } from "./Definitions";
import { ALEF_HAMZA, FATHA, HAMZA } from "./Definitions";
import { Vocalized, VocalizedToString } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function InitialHamza(vocalized: Vocalized, next: Vocalized)
{
    //TODO: check next for alef for alef maddah

    if(vocalized.letter === HAMZA)
    {
        const alefHamza: Vocalized = {
            letter: ALEF_HAMZA,
            shadda: vocalized.shadda,
            tashkil: vocalized.tashkil
        };
        return {
            vocalized: alefHamza,
            count: 1
        };
    }

    return {
        vocalized,
        count: 1
    };
}

function MedialHamza(vocalized: Vocalized, prev: Vocalized): Vocalized
{
    if(vocalized.letter !== HAMZA)
        return vocalized;
        
    function MaxPrecedence(t1: BASE_TASHKIL, t2: BASE_TASHKIL): BASE_TASHKIL
    {
        /*if( (t1 === KASRA) || (t2 === KASRA) )
            return KASRA;*/
        if( (t1 === DHAMMA) || (t2 === DHAMMA) )
            return DHAMMA;

        return FATHA;
    }

    const tashkil = MaxPrecedence(vocalized.tashkil!, prev.tashkil!);
    switch(tashkil)
    {
        case DHAMMA:
            return {
                letter: WAW_HAMZA,
                shadda: vocalized.shadda,
                tashkil: vocalized.tashkil
            };
        case FATHA:
            return {
                letter: ALEF_HAMZA,
                shadda: vocalized.shadda,
                tashkil: vocalized.tashkil
            };
    }

    return vocalized; //TODO
}

function FinalHamza(vocalized: Vocalized, prev: Vocalized): Vocalized
{
    if(vocalized.letter === HAMZA)
    {
        switch(prev.tashkil)
        {
            case FATHA:
                return { letter: ALEF_HAMZA, tashkil: vocalized.tashkil, shadda: vocalized.shadda };
        }
    }
    return vocalized;
}

export function Hamzate(vocalized: Vocalized[])
{
    //special case for empty words (for example dual does not exist in levantine dialects)
    if(vocalized.length === 0)
        return "";

    //initial hamza should already be handled
    const initial = InitialHamza(vocalized[0], vocalized[1]);
    const result = [
        initial.vocalized
    ];

    for(let i = initial.count; i < vocalized.length - 1; i++)
    {
        result.push(MedialHamza(vocalized[i], result[i-1]));
    }

    //final hamza
    result.push(FinalHamza(vocalized[vocalized.length - 1], vocalized[vocalized.length - 2]));

    return result.Values().Map(VocalizedToString).Join("");
}
