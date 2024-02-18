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
import { ALEF, FATHA, KASRA, SUKUN, YA } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { PartiallyVocalized } from "../../../Vocalization";
import { TA } from "../_legacy/VerbStem";
import { Stem8AssimilateTa } from "../conjugation/stem8";

export function GenerateAllPossibleVerbalNounsStem8(root: VerbRoot): PartiallyVocalized[]
{
    switch(root.type)
    {
        case RootType.Hollow:
            return [
                { letter: ALEF, shadda: false, tashkil: KASRA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: KASRA },
                { letter: YA, shadda: false, tashkil: FATHA },
                { letter: ALEF, shadda: false },
                { letter: root.r3, shadda: false },
            ];
        case RootType.Sound:
        {
            const v: PartiallyVocalized[] = [
                { letter: ALEF, shadda: false, tashkil: KASRA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: KASRA },
                { letter: root.r2, shadda: false, tashkil: FATHA },
                { letter: ALEF, shadda: false },
                { letter: root.r3, shadda: false },
            ];
        
            Stem8AssimilateTa(v, 1);
        
            return v;
        }
    }

    return [{letter: "TODO", shadda: false}];
}