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

import { FATHA, SUKUN, KASRA, ALEF, YA, TA_MARBUTA, ALEF_HAMZA, WAW, MIM, SHADDA, DHAMMA, ALEF_HAMZA_BELOW, HAMZA } from "../../../Definitions";
import { Hamzate } from "../../../Hamza";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";

export function GenerateAllPossibleVerbalNounsStem1(root: VerbRoot): (string | FullyVocalized[])[]
{
    switch(root.type)
    {
        case RootType.Assimilated:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: DHAMMA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r2, shadda: false, tashkil: KASRA },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false, tashkil: SUKUN },
                ],
            ];

        case RootType.Defective:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: HAMZA, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: WAW, shadda: false, tashkil: DHAMMA },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: HAMZA, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: YA, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false, tashkil: SUKUN },
                ],
            ];
            
        case RootType.HamzaOnR1:
            return [
                ALEF_HAMZA + FATHA + root.r2 + FATHA + root.r3,
                ALEF_HAMZA + FATHA + root.r2 + FATHA + ALEF + root.r3,
                ALEF_HAMZA + FATHA + root.r2 + FATHA + ALEF + root.r3 + FATHA + TA_MARBUTA,
                ALEF_HAMZA_BELOW + KASRA + root.r2 + FATHA + ALEF + root.r3 + FATHA + TA_MARBUTA
            ];

        case RootType.Hollow:
            return [
                root.r1 + FATHA + WAW + SUKUN + root.r3,
                root.r1 + FATHA + WAW + SUKUN + root.r3 + FATHA + TA_MARBUTA,
                root.r1 + FATHA + WAW + FATHA + ALEF + root.r3,
                Hamzate([
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: YA, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false },
                ]),
                Hamzate([
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: YA, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false}
                ]),
                root.r1 + KASRA + YA + FATHA + ALEF + root.r3,
                MIM + FATHA + root.r1 + FATHA + ALEF + root.r3,
            ];

        case RootType.Quadriliteral:
            return [
                Hamzate([
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: root.r4, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false },
                ])
            ];

        case RootType.SecondConsonantDoubled:
            return [
                root.r1 + DHAMMA + root.r2 + DHAMMA + WAW + root.r3,
                root.r1 + FATHA + root.r2 + FATHA + ALEF + root.r3,
                root.r1 + FATHA + root.r2 + KASRA + YA + root.r3,
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: true, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: true, tashkil: SUKUN },
                ],
                MIM + FATHA + root.r1 + FATHA + root.r2 + SHADDA + FATHA + TA_MARBUTA
            ];

        case RootType.Sound:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: DHAMMA },
                    { letter: root.r2, shadda: false, tashkil: DHAMMA },
                    { letter: WAW, shadda: false, tashkil: DHAMMA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: DHAMMA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: TA_MARBUTA, shadda: false, tashkil: SUKUN },
                ],
                root.r1 + FATHA + root.r2 + SUKUN + root.r3,
                root.r1 + KASRA + root.r2 + FATHA + ALEF + root.r3 + FATHA + TA_MARBUTA,
                root.r1 + KASRA + root.r2 + SUKUN + root.r3,
            ];

        default:
            return ["TODO"];
    }
}