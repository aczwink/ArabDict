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

import { Letter, Tashkil, PrimaryTashkil, ConjugationParams } from "../../../Definitions";
import { RootType } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";

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
            return (params._legacyVoice === "active") ? Tashkil.Fatha : Tashkil.Dhamma;
        case 2:
        case 3:
        case 4:
            return Tashkil.Dhamma;
    }

    throw new Error("Should never happen");
}

export function DerivePrefix(prevTashkil: (PrimaryTashkil | Tashkil.Sukun), rootType: RootType, params: ConjugationParams): FullyVocalized[]
{
    if(params._legacyTense === "perfect")
    {
        if(prevTashkil === Tashkil.Sukun)
        {
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, shadda: false, tashkil: (params._legacyVoice === "active") ? Tashkil.Kasra : Tashkil.Dhamma}];
        }
        return [];
    }

    if(params._legacyMood === "imperative")
    {
        if(params.stem === 4)
            return [{ letter: Letter.AlefHamza, shadda: false, tashkil: Tashkil.Fatha}];

        if(prevTashkil === Tashkil.Sukun)
        {
            //insert hamzat al wasl
            return [{ letter: Letter.Alef, shadda: false, tashkil: (params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra}];
        }
        return [];
    }

    const tashkil = DerivePrefixTashkil(rootType, params);
    switch(params._legacyPerson)
    {
        case "first":
        {
            switch(params._legacyNumerus)
            {
                case "singular":
                    return [{ letter: Letter.AlefHamza, shadda: false, tashkil }];
                case "plural":
                    return [{ letter: Letter.Nun, shadda: false, tashkil }];
            }
        }
        case "second":
            return [{ letter: Letter.Ta, shadda: false, tashkil }];
        case "third":
        {
            if((params._legacyNumerus === "plural") && (params._legacyGender === "female"))
                return [{ letter: Letter.Ya, shadda: false, tashkil }];
            
            switch(params._legacyGender)
            {
                case "male":
                    return [{ letter: Letter.Ya, shadda: false, tashkil }];
                case "female":
                    return [{ letter: Letter.Ta, shadda: false, tashkil }];
            }
        }
    }
}