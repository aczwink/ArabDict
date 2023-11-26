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
import { ALEF, FATHA, KASRA, SUKUN } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { Vocalized } from "../../../Vocalization";
import { SIIN, TA } from "../_legacy/VerbStem";

export function GenerateAllPossibleVerbalNounsStem10(root: VerbRoot): Vocalized[]
{
    switch(root.type)
    {
        case RootType.HamzaOnR1:
        case RootType.SecondConsonantDoubled:
        case RootType.Sound:
            return [
                { letter: ALEF, shadda: false, tashkil: KASRA },
                { letter: SIIN, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: KASRA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: root.r2, shadda: false, tashkil: FATHA },
                { letter: ALEF, shadda: false, },
                { letter: root.r3, shadda: false, },
            ];
    }

    return [{letter: "TODO", shadda: false}];
}