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

import { ConjugationParams, HHA, LETTER_RA, Letter, PrimaryTashkil, Tashkil } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";
import { AugmentedRoot } from "../AugmentedRoot";
import { AlterDefectiveEnding } from "./defective";

/*
Currently known ones are: رأى, أرى, حيي
*/

function AlterSpecialCaseHayiya(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params._legacyTense === "perfect")
        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Fatha });
    else
    {
        augmentedRoot.ReplaceRadical(3, { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Fatha });
    }
}

function AlterSpecialCaseRa2a(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    AlterDefectiveEnding(augmentedRoot, params);
    if(params._legacyTense !== "perfect")
        augmentedRoot.DropRadial(2);
}

export function AlterSpeciallyIrregularDefective(root: VerbRoot, augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.stem === 1)
    {
        if(root.radicalsAsSeparateLetters.Equals([HHA, Letter.Ya, Letter.Waw]))
            AlterSpecialCaseHayiya(augmentedRoot, params);
        else if(root.radicalsAsSeparateLetters.Equals([LETTER_RA, Letter.Hamza, Letter.Ya]))
            AlterSpecialCaseRa2a(augmentedRoot, params);
    }
}

export function GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching(root: VerbRoot): { past: PrimaryTashkil; present: PrimaryTashkil } | undefined
{
    if(root.radicalsAsSeparateLetters.Equals([LETTER_RA, Letter.Hamza, Letter.Ya]))
        return { past: Tashkil.Fatha, present: Tashkil.Kasra };
    if(root.radicalsAsSeparateLetters.Equals([HHA, Letter.Ya, Letter.Waw]))
        return { past: Tashkil.Kasra, present: Tashkil.Fatha };
    return undefined;
}

export function IsSpeciallyIrregularDefective(root: VerbRoot, stem: number)
{
    if(stem === 1)
        return GetSpeciallyIrregularDefectivePresentTashkilForStem1IfMatching(root) !== undefined;
    if( (stem === 4) && root.radicalsAsSeparateLetters.Equals([LETTER_RA, Letter.Hamza, Letter.Ya]) )
        return true;
    return false;
}