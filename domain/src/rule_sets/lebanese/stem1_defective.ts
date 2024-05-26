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

import { ConjugationParams, Tashkil, Tense, Person, Numerus, Gender } from "../../Definitions";

function DeriveRootTashkilPresent(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    if( (params.numerus === Numerus.Plural) && (params.person !== Person.First) )
        return { r1: Tashkil.Sukun, r2: Tashkil.Dhamma, r3: Tashkil.Dhamma };

    return { r1: Tashkil.Sukun, r2: Tashkil.Kasra, r3: Tashkil.LongVowelMarker };
}

export function Stem1Defective_DeriveRootTashkil(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    if(params.tense === Tense.Present)
        return DeriveRootTashkilPresent(params);

    function R1Tashkil(): Tashkil
    {
        if(params.person === Person.Third)
            return Tashkil.Kasra;
        return Tashkil.Sukun;
    }

    function R2Tashkil(): Tashkil
    {
        if(params.numerus === Numerus.Plural)
        {
            switch(params.person)
            {
                case Person.Third:
                    return Tashkil.Sukun;
            }
        }

        switch(params.person)
        {
            case Person.Third:
                if(params.gender === Gender.Male)
                    return Tashkil.Kasra;
                return Tashkil.Sukun;
        }
        return Tashkil.Kasra;
    }

    function R3Tashkil(): Tashkil
    {
        if((params.numerus === Numerus.Singular) && (params.person === Person.Third) && (params.gender === Gender.Female))
            return Tashkil.Kasra;
        if((params.numerus === Numerus.Plural) && (params.person === Person.Third))
            return Tashkil.Dhamma;
        return Tashkil.LongVowelMarker;
    }

    return { r1: R1Tashkil(), r2: R2Tashkil(), r3: R3Tashkil() };
}