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

import { Letter, Tashkil } from "./Definitions";
import { FullyVocalized, IsLongVowel } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Hamza#Detailed_description

function DetermineHamzaSeat(isInitial: boolean, isFinal: boolean, followingShortVowel: Tashkil, predecessor?: FullyVocalized, prepredecessor?: FullyVocalized): FullyVocalized
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

    function MaxPrecedence(t1: Tashkil, t2: Tashkil): Tashkil
    {
        if( (t1 === Tashkil.Kasra) || (t2 === Tashkil.Kasra) )
            return Tashkil.Kasra;
        if( (t1 === Tashkil.Dhamma) || (t2 === Tashkil.Dhamma) )
            return Tashkil.Dhamma;
        return Tashkil.Fatha;
    }

    function MaxPrecedenceWithFallback(t1?: Tashkil, t2?: Tashkil): Tashkil
    {
        if(t1 === undefined)
        {
            if(t2 === undefined)
                return Tashkil.Fatha;
            return t2;
        }
        else if(t2 === undefined)
            return t1;
        return MaxPrecedence(t1, t2);
    }

    function IsDiphtong(v: FullyVocalized | undefined, predecessor: FullyVocalized | undefined)
    {
        //diphtongs are /aj/ or /aw/, i.e. a ya or waw with sukun above it, while the predecessor needs to have a fatha
        return (
            (predecessor?.tashkil === Tashkil.Fatha)
            &&
            (v?.tashkil === Tashkil.Sukun)
            &&
            ( (v.letter === Letter.Waw) || (v.letter === Letter.Ya) )
        );
    }

    if(isInitial)
    {
        if(followingShortVowel === Tashkil.Kasra)
            return { letter: Letter.AlefHamzaBelow, tashkil: followingShortVowel, shadda: false };
        return { letter: Letter.AlefHamza, tashkil: followingShortVowel, shadda: false };
    }

    const predecessorIsLongVowel = ( (predecessor?.letter === Letter.Alef) && (predecessor.tashkil === Tashkil.Fatha) )
        || ( (predecessor !== undefined) && IsLongVowel(predecessor, prepredecessor) );
    const diphtongPreceedes = IsDiphtong(predecessor, prepredecessor);

    let decidingTashkil: Tashkil | null;
    if(isFinal)
    {
        decidingTashkil = predecessor!.tashkil;
        if((decidingTashkil === Tashkil.Sukun) || (decidingTashkil === Tashkil.LongVowelMarker))
            decidingTashkil = null;
    }
    else if(predecessorIsLongVowel || diphtongPreceedes)
    {
        if( (followingShortVowel === Tashkil.Kasra) || (followingShortVowel === Tashkil.Dhamma) )
            decidingTashkil = followingShortVowel;
        else if(predecessor?.letter === Letter.Ya)
            decidingTashkil = Tashkil.Kasra;
        else
            decidingTashkil = null;
    }
    else
    {
        decidingTashkil = MaxPrecedenceWithFallback(predecessor?.tashkil, followingShortVowel);
    }

    switch(decidingTashkil)
    {
        case Tashkil.Dhamma:
            return { letter: Letter.WawHamza, shadda: false, tashkil: followingShortVowel };
        case Tashkil.Fatha:
            return { letter: Letter.AlefHamza, tashkil: followingShortVowel, shadda: false };
        case Tashkil.Kasra:
            return { letter: Letter.YaHamza, shadda: false, tashkil: followingShortVowel };
        case Tashkil.Sukun: //the article doesn't talk about sukun but this was found through tests
            console.error(arguments);
            throw new Error("check it again and write test! 1");
        case null:
            return { letter: Letter.Hamza, shadda: false, tashkil: followingShortVowel };
        default:
            console.error(arguments);
            throw new Error("TODO: implement me" + decidingTashkil);
    }
}

function MaddahCheck(current: FullyVocalized, prev?: FullyVocalized)
{
    if(prev?.letter === Letter.AlefHamza)
    {
        if(current.letter === Letter.Hamza)
        {
            if( (current.tashkil === Tashkil.Sukun) && (prev.tashkil === Tashkil.Fatha))
            {
                throw new Error("TODO: NOT IMPLEMENTED"); //create test case
                return true; //this case was not documented anywhere but was found through tests
            }

            console.error("HERE MaddahCheck", current.tashkil, prev.tashkil);
            throw new Error("TODO: NOT IMPLEMENTED");
        }
        else if(current.letter === Letter.Alef)
        {
            if( (prev.tashkil === Tashkil.Fatha) && (current.tashkil === Tashkil.LongVowelMarker) )
                return true;

            console.error("HERE MaddahCheck 2 -> ", current.tashkil, prev.tashkil);
            throw new Error("TODO: NOT IMPLEMENTED");
        }
    }

    return false;
}

export function Hamzate(vocalized: FullyVocalized[])
{
    const result: FullyVocalized[] = [];
    for(let i = 0; i < vocalized.length; i++)
    {
        const prev = result[result.length - 1];
        const next = (vocalized[i].letter === Letter.Hamza) ? DetermineHamzaSeat(i === 0, i === (vocalized.length - 1), vocalized[i].tashkil, prev, result[result.length - 2]) : vocalized[i];

        if(MaddahCheck(next, prev))
            result[result.length - 1] = { letter: Letter.AlefMadda, shadda: false, tashkil: Tashkil.LongVowelMarker };
        else
            result.push(next);
    }

    return result;
}