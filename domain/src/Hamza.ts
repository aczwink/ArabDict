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

import { ALEF, ALEF_HAMZA_BELOW, ALEF_MADDA, BASE_TASHKIL, DHAMMA, KASRA, SUKUN, WAW, WAW_HAMZA, YA, YA_HAMZA } from "./Definitions";
import { ALEF_HAMZA, FATHA, HAMZA } from "./Definitions";
import { PartiallyVocalized, VocalizedToString } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function DetermineHamzaSeat(isInitial: boolean, isFinal: boolean, followingShortVowel?: BASE_TASHKIL, predecessor?: PartiallyVocalized, prepredecessor?: PartiallyVocalized): PartiallyVocalized
{
    /*
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
    */

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

    function IsDiphtong(v: PartiallyVocalized | undefined, predecessor: PartiallyVocalized | undefined)
    {
        //diphtongs are /aj/ or /aw/, i.e. a ya or waw with sukun above it, while the predecessor needs to have a fatha
        return (
            (predecessor?.tashkil === FATHA)
            &&
            (v?.tashkil === SUKUN)
            &&
            ( (v.letter === WAW) || (v.letter === YA) )
        );
    }

    if(isInitial)
    {
        if(followingShortVowel === KASRA)
            return { letter: ALEF_HAMZA_BELOW, tashkil: followingShortVowel, shadda: false };
        return { letter: ALEF_HAMZA, tashkil: followingShortVowel, shadda: false };
    }

    const predecessorIsLongVowel = ( (predecessor?.letter === ALEF) && (predecessor.tashkil === FATHA) )
        || ( (predecessor?.letter === WAW) && (predecessor.tashkil === DHAMMA) )
        || ( (predecessor?.letter === YA) && (predecessor.tashkil === KASRA));
    const diphtongPreceedes = IsDiphtong(predecessor, prepredecessor);

    let decidingTashkil: BASE_TASHKIL | undefined;
    if(isFinal)
    {
        if(predecessorIsLongVowel)
            decidingTashkil = undefined;
        else
            decidingTashkil = predecessor?.tashkil;
    }
    else if(predecessorIsLongVowel || diphtongPreceedes)
    {
        if( (followingShortVowel === KASRA) || (followingShortVowel === DHAMMA) )
        {
            //-if i or u follows, write over ya or waw
            return {
                letter: "TODO: implement this and write test!!!!",
                shadda: false,
            };
        }
        else if(predecessor?.letter === YA)
            decidingTashkil = KASRA;
        else
        {
            //write on line
            throw new Error("TODO: implement me and write test!!!!");
        }
    }
    else
    {
        decidingTashkil = MaxPrecedenceWithFallback(predecessor?.tashkil, followingShortVowel);
    }

    switch(decidingTashkil)
    {
        case DHAMMA:
            return { letter: WAW_HAMZA, shadda: false, tashkil: followingShortVowel };
        case SUKUN: //the article doesn't talk about sukun but this was found through tests
            throw new Error("check it again and write test!");
        case FATHA:
            return { letter: ALEF_HAMZA, tashkil: followingShortVowel, shadda: false };
        case KASRA:
            return { letter: YA_HAMZA, shadda: false, tashkil: followingShortVowel };
        case undefined:
            return { letter: HAMZA, shadda: false, tashkil: followingShortVowel };
    }
}

function MaddahCheck(current: PartiallyVocalized, prev?: PartiallyVocalized)
{
    if(prev?.letter === ALEF_HAMZA)
    {
        if(current.letter === ALEF_HAMZA)
        {
            if( (current.tashkil === SUKUN) && (prev.tashkil === FATHA))
                return true; //this case was not documented anywhere but was found through tests

            console.log("HERE MaddahCheck", current.tashkil, prev.tashkil);
            throw new Error("TODO: NOT IMPLEMENTED");
        }
        else if(current.letter === ALEF)
        {
            if(current.tashkil === undefined)
                return true;

            console.log("HERE MaddahCheck 2", current.tashkil, prev.tashkil);
            throw new Error("TODO: NOT IMPLEMENTED");
        }
    }

    return false;
}

export function Hamzate(vocalized: PartiallyVocalized[])
{
    //special case for empty words (for example dual does not exist in levantine dialects)
    if(vocalized.length === 0)
        return "";

    const result: PartiallyVocalized[] = [];
    for(let i = 0; i < vocalized.length; i++)
    {
        const prev = result[result.length - 1];
        const next = (vocalized[i].letter === HAMZA) ? DetermineHamzaSeat(i === 0, i === (vocalized.length - 1), vocalized[i].tashkil, prev, result[result.length - 2]) : vocalized[i];

        if(MaddahCheck(next, prev))
            result[result.length - 1] = { letter: ALEF_MADDA, shadda: false };
        else
            result.push(next);
    }

    return result.Values().Map(VocalizedToString).Join("");
}