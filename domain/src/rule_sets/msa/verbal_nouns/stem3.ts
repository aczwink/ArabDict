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
import { ALEF, DHAMMA, FATHA, KASRA, MIM, SUKUN, TA_MARBUTA } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";

export function GenerateAllPossibleVerbalNounsStem3(root: VerbRoot): FullyVocalized[][]
{
    switch(root.type)
    {
        case RootType.Sound:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: MIM, shadda: false, tashkil: DHAMMA },
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false, tashkil: SUKUN },
                ]
            ];
        default:
            return [
                [{letter: "TODO", shadda: false, tashkil: SUKUN}]
            ];
    }
}