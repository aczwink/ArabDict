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

import { ALEF, FATHA, YA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { AugmentedRoot } from "../AugmentedRoot";
import { AlterDefectiveEnding } from "./defective";

export function AlterSpecialCaseHayiya(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.tense === "perfect")
        augmentedRoot.ReplaceRadical(3, { letter: YA, shadda: false, tashkil: FATHA });
    else
    {
        augmentedRoot.ReplaceRadical(3, { letter: ALEF, shadda: false });
    }
}

export function AlterSpecialCaseRa2a(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    AlterDefectiveEnding(augmentedRoot, params);
    if(params.tense !== "perfect")
        augmentedRoot.DropRadial(2);
}