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

import { Letter, Tashkil, PrimaryTashkil, ConjugationParams, Voice, Tense, Person, Numerus, Gender, Mood } from "../../../Definitions";
import { RootType } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";

function DerivePrefixTashkil(rootType: RootType, params: ConjugationParams)
{
    if(rootType === RootType.Quadriliteral)
    {
        if(params.stem === 1)
            return Tashkil.Dhamma;
    }
    
    switch(params.stem)
    {
        case 1:
        case 5:
        case 6:
        case 7:
        case 8:
        case 10:
            return (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Dhamma;
        case 2:
        case 3:
        case 4:
            return Tashkil.Dhamma;
    }
}

export function DerivePrefix(prevTashkil: (PrimaryTashkil | Tashkil.Sukun), rootType: RootType, params: ConjugationParams): ConjugationVocalized[]
{
    if(params.tense === Tense.Perfect)
    {
        if(prevTashkil === Tashkil.Sukun)
        {
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, tashkil: (params.voice === Voice.Active) ? Tashkil.Kasra : Tashkil.Dhamma}];
        }
        return [];
    }

    if(params.mood === Mood.Imperative)
    {
        if(params.stem === 4)
            return [{ letter: Letter.AlefHamza, tashkil: Tashkil.Fatha}];

        if(prevTashkil === Tashkil.Sukun)
        {
            const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, tashkil: (stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra}];
        }
        return [];
    }

    const tashkil = DerivePrefixTashkil(rootType, params);
    switch(params.person)
    {
        case Person.First:
        {
            switch(params.numerus)
            {
                case Numerus.Singular:
                    return [{ letter: Letter.AlefHamza, tashkil }];
                case Numerus.Plural:
                    return [{ letter: Letter.Nun, tashkil }];
            }
        }
        case Person.Second:
            return [{ letter: Letter.Ta, tashkil }];
        case Person.Third:
        {
            if((params.numerus === Numerus.Plural) && (params.gender === Gender.Female))
                return [{ letter: Letter.Ya, tashkil }];
            
            switch(params.gender)
            {
                case Gender.Male:
                    return [{ letter: Letter.Ya, tashkil }];
                case Gender.Female:
                    return [{ letter: Letter.Ta, tashkil }];
            }
        }
    }
}