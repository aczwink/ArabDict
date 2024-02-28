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
import { FATHA, KASRA, SUKUN, YA } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";
import { TA } from "../_legacy/VerbStem";

export function GenerateAllPossibleVerbalNounsStem2(root: VerbRoot): FullyVocalized[]
{
    switch(root.type)
    {
        case RootType.HamzaOnR1:
        case RootType.Hollow:
        case RootType.SecondConsonantDoubled:
        case RootType.Sound:
            return [
                { letter: TA, shadda: false, tashkil: FATHA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: root.r2, shadda: false, tashkil: KASRA },
                { letter: YA, shadda: false, tashkil: KASRA },
                { letter: root.r3, shadda: false, tashkil: SUKUN },
            ];
    }

    return [{letter: "TODO", shadda: false, tashkil: FATHA}];
}