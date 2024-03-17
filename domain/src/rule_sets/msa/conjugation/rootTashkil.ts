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

import { ConjugationParams, Tashkil } from "../../../Definitions";
import { RootType } from "../../../VerbRoot";
import { AugmentedRoot } from "../AugmentedRoot";

interface RootTashkil
{
    r1: Tashkil;
    r2: Tashkil;
}

function DerivePastRootTashkil(params: ConjugationParams): RootTashkil
{
    const r1stem = ((params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? Tashkil.Sukun : ((params._legacyVoice === "active") ? Tashkil.Fatha : Tashkil.Dhamma);
    const r2active = (params.stem === 1) ? (params._legacyStem1Context!.middleRadicalTashkil as any) : Tashkil.Fatha;
    return {
        r1: r1stem,
        r2: (params._legacyVoice === "active") ? r2active : Tashkil.Kasra
    };
}

function Derive3RadicalRootTashkil(params: ConjugationParams): RootTashkil
{
    if(params._legacyTense === "perfect")
        return DerivePastRootTashkil(params);

    function R2Active(): Tashkil
    {
        switch(params.stem)
        {
            case 1:
                return params._legacyStem1Context!.middleRadicalTashkilPresent as any;
            case 2:
            case 3:
            case 4:
            case 7:
            case 8:
            case 10:
                return Tashkil.Kasra;
            case 5:
            case 6:
                return Tashkil.Fatha;
        }
        throw new Error("Unknown stem");
    }

    return {
        r1: ((params.stem === 1) || (params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? Tashkil.Sukun : Tashkil.Fatha,
        r2: (params._legacyVoice === "active") ? R2Active() : Tashkil.Fatha
    };
}

function Derive4RadicalRootTashkil(params: ConjugationParams): RootTashkil & { r3: Tashkil }
{
    let r3: Tashkil;
    if(params._legacyVoice === "active")
        r3 = (params._legacyTense === "perfect") ? Tashkil.Fatha : Tashkil.Kasra;
    else
        r3 = (params._legacyTense === "perfect") ? Tashkil.Kasra : Tashkil.Fatha;

    return {
        r1: ( (params._legacyTense === "perfect") && (params._legacyVoice === "passive") ) ? Tashkil.Dhamma : Tashkil.Fatha,
        r2: Tashkil.Sukun,
        r3
    };
}

export function ApplyRootTashkil(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(augmentedRoot.type === RootType.Quadriliteral)
    {
        const tashkil = Derive4RadicalRootTashkil(params);
        augmentedRoot.ApplyRadicalTashkil(1, tashkil.r1);
        augmentedRoot.ApplyRadicalTashkil(2, tashkil.r2);
        augmentedRoot.ApplyRadicalTashkil(3, tashkil.r3);
    }
    else
    {
        const tashkil = Derive3RadicalRootTashkil(params);
        augmentedRoot.ApplyRadicalTashkil(1, tashkil.r1);
        augmentedRoot.ApplyRadicalTashkil(2, tashkil.r2);
    }
}