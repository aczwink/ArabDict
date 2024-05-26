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

import { ConjugationParams, Gender, Mood, Numerus, Person, Tashkil, Tense } from "../../Definitions";

function DeriveRootTashkilPresent(params: ConjugationParams, mood: Mood): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    function R1Tashkil()
    {
        switch(params.stem)
        {
            case 1:
                return Tashkil.Sukun;
            case 2:
                return Tashkil.Fatha;
        }
        throw new Error("TODO: implement me");
    }

    function R2Tashkil()
    {
        switch(params.stem)
        {
            case 1:
                return params.stem1Context.middleRadicalTashkilPresent;
            case 2:
                return Tashkil.Kasra;
        }
        throw new Error("TODO: implement me");
    }
    function R2TashkilImperative()
    {
        switch(params.stem)
        {
            case 1:
                return Tashkil.Kasra;
            case 2:
                return Tashkil.Sukun;
        }
        throw new Error("TODO: implement me");
    }

    if(params.numerus === Numerus.Plural)
    {
        switch(params.person)
        {
            case Person.Second:
                if(mood === Mood.Imperative)
                    return { r1: R1Tashkil(), r2: R2TashkilImperative(), r3: Tashkil.Dhamma };
            case Person.Third:
                return { r1: R1Tashkil(), r2: Tashkil.Sukun, r3: Tashkil.Dhamma };
        }
    }

    switch(params.person)
    {
        case Person.Second:
            if(params.gender === Gender.Female)
            {
                if(mood === Mood.Imperative)
                    return { r1: R1Tashkil(), r2: R2TashkilImperative(), r3: Tashkil.Kasra };
                return { r1: R1Tashkil(), r2: Tashkil.Sukun, r3: Tashkil.Kasra };
            }
        case Person.First:
        case Person.Third:
            return { r1: R1Tashkil(), r2: R2Tashkil(), r3: Tashkil.Sukun };
    }
}

export function Stem1Sound_DeriveRootTashkil(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
{
    if(params.tense === Tense.Present)
        return DeriveRootTashkilPresent(params, params.mood);
    
    function R3Tashkil()
    {
        if(params.numerus === Numerus.Plural)
        {
            switch(params.person)
            {
                case Person.First:
                case Person.Second:
                    return Tashkil.Sukun;
                case Person.Third:
                    return Tashkil.Dhamma;
            }
        }

        switch(params.person)
        {
            case Person.First:
                return Tashkil.Kasra;

            case Person.Second:
                if(params.gender === Gender.Male)
                    return Tashkil.Kasra;
                return Tashkil.Sukun;

            case Person.Third:
                if(params.gender === Gender.Male)
                    return Tashkil.Sukun;
                return Tashkil.Kasra;
        }
    }

    return { r1: Tashkil.Fatha, r2: Tashkil.Fatha, r3: R3Tashkil() };
}