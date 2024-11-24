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

import { ConjugationParams, Letter, Mood, Numerus, Person, Tashkil, Tense, Voice } from "../../../Definitions";
import { AugmentedRoot } from "../AugmentedRoot";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Hamzated_verbs

function IsSpecialShortImperative(augmentedRoot: AugmentedRoot)
{
    const condition = ((augmentedRoot.r2.letter === Letter.Kha) && (augmentedRoot.r3.letter === Letter.Thal))
        || ((augmentedRoot.r2.letter === Letter.Kaf) && (augmentedRoot.r3.letter === Letter.Lam));
    return condition;
}

export function AlterHamzaOnR1(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.tense === Tense.Present)
    {
        if((params.mood === Mood.Imperative) && IsSpecialShortImperative(augmentedRoot))
            augmentedRoot.DropRadial(1);
        else if((params.person === Person.First) && (params.numerus === Numerus.Singular) && (params.voice === Voice.Passive))
            augmentedRoot.ReplaceRadical(1, { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker });
    }
}