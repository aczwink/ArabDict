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
import { ALEF, FATHA, KASRA, Letter, SUKUN } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { _LegacyFullyVocalized, _LegacyPartiallyVocalized } from "../../../Vocalization";
import { TA } from "../_legacy/VerbStem";
import { Stem8AssimilateTa } from "../conjugation/stem8";

export function GenerateAllPossibleVerbalNounsStem8(root: VerbRoot): _LegacyFullyVocalized[]
{
    switch(root.type)
    {
        case RootType.Hollow:
            return [
                { letter: ALEF, shadda: false, tashkil: KASRA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: KASRA },
                { letter: Letter.Ya, shadda: false, tashkil: FATHA },
                { letter: ALEF, shadda: false, tashkil: FATHA },
                { letter: root.r3, shadda: false, tashkil: SUKUN },
            ];
        case RootType.Sound:
        {
            const v: _LegacyFullyVocalized[] = [
                { letter: ALEF, shadda: false, tashkil: KASRA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: KASRA },
                { letter: root.r2, shadda: false, tashkil: FATHA },
                { letter: ALEF, shadda: false, tashkil: FATHA },
                { letter: root.r3, shadda: false, tashkil: SUKUN },
            ];
        
            Stem8AssimilateTa(v, 1);
        
            return v;
        }
    }

    return [{letter: "TODO", shadda: false, tashkil: FATHA}];
}