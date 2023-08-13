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

import { SUKUN, FATHA, KASRA, DHAMMA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { AugmentedRoot } from "../AugmentedRoot";

export function GeminateDoubledConsonant(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(augmentedRoot.r3.tashkil !== SUKUN)
    {
        if(params.stem === 1)
        {
            //does happen in stem 1 only in present
            augmentedRoot.r1.tashkil = ((params.voice === "active") || ((params.tense === "present") && (params.voice === "passive"))) ? params.stem1Context!.middleRadicalTashkilPresent as any : DHAMMA;
        }
        else
        {
            const cond = ((params.tense === "perfect") && (params.voice === "active")) || (((params.tense === "present") && (params.voice === "passive")));
            augmentedRoot.r1.tashkil = cond ? FATHA : KASRA; //two sukuns after each other are forbidden
        }
        augmentedRoot.r3.shadda = true;
        augmentedRoot.vocalized.Remove(augmentedRoot.vocalized.length - 2); //assimilate r2
    }
}