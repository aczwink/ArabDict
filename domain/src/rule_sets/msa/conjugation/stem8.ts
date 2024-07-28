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
import { Letter, Tense } from "../../../Definitions";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";

export function Stem8AssimilateTa(vocalized: ConjugationVocalized[], r1idx: number)
{
    switch(vocalized[r1idx].letter)
    {
        case Letter.Zay:
            vocalized[r1idx + 1].letter = Letter.Dal;
            break;
        case Letter.Saad:
            vocalized[r1idx + 1].letter = Letter.Tta;
            break;
    }
}

export function Stem8AssimilateTaVerb(augmentedRoot: AugmentedRoot, tense: Tense)
{
    const r1idx = (tense === Tense.Perfect) ? 1 : 0;
    Stem8AssimilateTa(augmentedRoot.symbols, r1idx);
}