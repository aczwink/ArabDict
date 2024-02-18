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
import { DAL, ZAY } from "../../../Definitions";
import { PartiallyVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { Tense } from "../_legacy/VerbStem";

export function Stem8AssimilateTa(vocalized: PartiallyVocalized[], r1idx: number)
{
    switch(vocalized[r1idx].letter)
    {
        case ZAY:
            vocalized[r1idx + 1].letter = DAL;
            break;
    }
}

export function Stem8AssimilateTaVerb(augmentedRoot: AugmentedRoot, tense: Tense)
{
    const r1idx = (tense === "perfect") ? 1 : 0;
    Stem8AssimilateTa(augmentedRoot.partiallyVocalized, r1idx);
}