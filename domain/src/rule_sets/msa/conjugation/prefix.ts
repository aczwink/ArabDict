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

import { BASE_TASHKIL, ALEF_HAMZA, FATHA, SUKUN, ALEF, DHAMMA, KASRA, YA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { Vocalized } from "../../../Vocalization";
import { NUN, TA } from "../_legacy/VerbStem";

function DerivePrefixTashkil(params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        case 5:
        case 6:
        case 7:
        case 8:
        case 10:
            return (params.voice === "active") ? FATHA : DHAMMA;
        case 2:
        case 3:
        case 4:
            return DHAMMA;
    }
}

export function DerivePrefix(prevTashkil: BASE_TASHKIL, params: ConjugationParams): Vocalized[]
{
    if(params.tense === "perfect")
    {
        if(prevTashkil === SUKUN)
        {
            //insert hamzat al wasl
            return [{ letter: ALEF, shadda: false, tashkil: (params.voice === "active") ? KASRA : DHAMMA}];
        }
        return [];
    }

    if(params.mood === "imperative")
    {
        if(params.stem === 4)
            return [{ letter: ALEF_HAMZA, shadda: false, tashkil: FATHA}];

        if(prevTashkil === SUKUN)
        {
            //insert hamzat al wasl
            return [{ letter: ALEF, shadda: false, tashkil: (params.stem1Context?.middleRadicalTashkilPresent === DHAMMA) ? DHAMMA : KASRA}];
        }
        return [];
    }

    const tashkil = DerivePrefixTashkil(params);
    switch(params.person)
    {
        case "first":
        {
            switch(params.numerus)
            {
                case "singular":
                    return [{ letter: ALEF_HAMZA, shadda: false, tashkil }];
                case "plural":
                    return [{ letter: NUN, shadda: false, tashkil }];
            }
        }
        case "second":
            return [{ letter: TA, shadda: false, tashkil }];
        case "third":
        {
            if((params.numerus === "plural") && (params.gender === "female"))
                return [{ letter: YA, shadda: false, tashkil }];
            
            switch(params.gender)
            {
                case "male":
                    return [{ letter: YA, shadda: false, tashkil }];
                case "female":
                    return [{ letter: TA, shadda: false, tashkil }];
            }
        }
    }
}