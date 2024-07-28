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

import { ConjugationParams, Tashkil, Gender, Numerus, Person, Tense } from "../../Definitions";

function Hollow_DeriveRootTashkil1(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    function R1Tashkil()
    {
        if((params.tense === Tense.Perfect) && (params.person === Person.Third) && (params.numerus === Numerus.Singular) && (params.gender === Gender.Male))
            return Tashkil.Fatha;
        return Tashkil.Kasra;
    }

    function R2Tashkil()
    {
        return Tashkil.LongVowelMarker;
    }

    return { r1: R1Tashkil(), r2: R2Tashkil(), r3: Tashkil.Fatha };
}

function Hollow_DeriveRootTashkil8(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    function R3Tashkil()
    {
        if(params.numerus === Numerus.Singular)
        {
            if((params.person === Person.Third) && (params.gender === Gender.Female))
                return Tashkil.Kasra;
            if((params.person !== Person.Third) && (params.gender === Gender.Male))
                return Tashkil.Kasra;
        }
        else if(params.person === Person.Third)
            return Tashkil.Dhamma;
        return Tashkil.Sukun;
    }

    if(params.tense === Tense.Perfect)
        return { r1: Tashkil.Sukun, r2: Tashkil.Fatha, r3: R3Tashkil() };

    function R3TashkilPresent()
    {
        if((params.gender === Gender.Female) && (params.person === Person.Second))
            return Tashkil.Kasra;
        else if((params.numerus === Numerus.Plural) && (params.person !== Person.First))
            return Tashkil.Dhamma;
        return Tashkil.Sukun;
    }

    return { r1: Tashkil.Sukun, r2: Tashkil.Fatha, r3: R3TashkilPresent() };
}

export function Hollow_DeriveRootTashkil(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    switch(params.stem)
    {
        case 1:
            return Hollow_DeriveRootTashkil1(params);
        case 8:
            return Hollow_DeriveRootTashkil8(params);
    }
    throw new Error("TODO: not implemented");
}