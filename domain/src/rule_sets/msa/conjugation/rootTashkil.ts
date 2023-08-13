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

import { BASE_TASHKIL, KASRA, FATHA, SUKUN, DHAMMA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { Vocalized } from "../../../Vocalization";

interface RootTashkil
{
    r1: BASE_TASHKIL;
    r2: BASE_TASHKIL;
}

function DerivePastRootTashkil(params: ConjugationParams): RootTashkil
{
    const r1stem = ((params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? SUKUN : ((params.voice === "active") ? FATHA : DHAMMA);
    const r2active = (params.stem === 1) ? (params.stem1Context!.middleRadicalTashkil as any) : FATHA;
    return {
        r1: r1stem,
        r2: (params.voice === "active") ? r2active : KASRA
    };
}

export function DeriveRootTashkil(params: ConjugationParams): RootTashkil
{
    if(params.tense === "perfect")
        return DerivePastRootTashkil(params);

    function R2Active(): BASE_TASHKIL
    {
        switch(params.stem)
        {
            case 1:
                return params.stem1Context!.middleRadicalTashkilPresent as any;
            case 2:
            case 3:
            case 4:
            case 7:
            case 8:
            case 10:
                return KASRA;
            case 5:
            case 6:
                return FATHA;
        }
        throw new Error("Unknown stem");
    }

    return {
        r1: ((params.stem === 1) || (params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? SUKUN : FATHA,
        r2: (params.voice === "active") ? R2Active() : FATHA
    };
}

export function ApplyRootAugmentationTashkil(augmentedRoot: Vocalized[], params: ConjugationParams)
{
    switch(params.stem)
    {
        case 4:
            if(params.tense === "perfect")
                augmentedRoot[0].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
            break;
        case 5:
        case 6:
            augmentedRoot[0].tashkil = (params.voice === "passive" && params.tense === "perfect") ? DHAMMA : FATHA;
            break;
        case 7:
            if(params.tense === "perfect")
            {
                augmentedRoot[0].tashkil = (params.voice === "active") ? KASRA : DHAMMA;
                augmentedRoot[1].tashkil = SUKUN;
            }
            else
            {
                augmentedRoot[0].tashkil = SUKUN;
            }
            break;
        case 8:
            if(params.tense === "perfect")
            {
                augmentedRoot[0].tashkil = (params.voice === "active") ? KASRA : DHAMMA;
                augmentedRoot[2].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
            }
            else
            {
                augmentedRoot[1].tashkil = FATHA;
            }
            break;
        case 10:
            augmentedRoot[0].tashkil = SUKUN;
            if(params.tense === "perfect")
                augmentedRoot[1].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
            else
                augmentedRoot[1].tashkil = FATHA;
        break;
    }
}