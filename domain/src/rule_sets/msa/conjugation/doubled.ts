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

import { ConjugationParams, Tashkil, Tense, Voice } from "../../../Definitions";
import { AugmentedRoot } from "../AugmentedRoot";

export function GeminateDoubledConsonant(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.stem === 2)
        return;
    
    if(augmentedRoot.r3.tashkil !== Tashkil.Sukun)
    {
        if(params.stem === 1)
        {
            if(params.voice === Voice.Passive)
                augmentedRoot.r1.tashkil = Tashkil.Dhamma;
            else if(params.tense === Tense.Perfect)
                augmentedRoot.r1.tashkil = params.stem1Context.middleRadicalTashkil;
            else
                augmentedRoot.r1.tashkil = params.stem1Context.middleRadicalTashkilPresent;
        }
        else
        {
            const cond = ((params.tense === Tense.Perfect) && (params.voice === Voice.Active)) || (((params.tense === Tense.Present) && (params.voice === Voice.Passive)));
            augmentedRoot.r1.tashkil = cond ? Tashkil.Fatha : Tashkil.Kasra; //two sukuns after each other are forbidden
        }
        augmentedRoot.symbols.Remove(augmentedRoot.symbols.length - 2); //assimilate r2
    }
}