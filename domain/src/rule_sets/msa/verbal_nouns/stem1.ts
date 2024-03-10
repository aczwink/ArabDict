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

import { FATHA, SUKUN, KASRA, ALEF, ALEF_HAMZA, WAW, MIM, SHADDA, DHAMMA, FATHATAN, ALEF_MAKSURA, Letter, Tashkil } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized, _LegacyFullyVocalized } from "../../../Vocalization";
import { NUN } from "../_legacy/VerbStem";

export function GenerateAllPossibleVerbalNounsStem1(root: VerbRoot): (string | _LegacyFullyVocalized[] | FullyVocalized[])[]
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
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
            ];

        case RootType.Defective:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: Letter.Hamza, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: FATHATAN },
                    { letter: ALEF_MAKSURA, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: WAW, shadda: false, tashkil: DHAMMA },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: Letter.Ya, shadda: false, tashkil: FATHA },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: Letter.Hamza, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: Letter.Ya, shadda: false, tashkil: FATHA },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
            ];

        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            return  [
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: Letter.Ya, shadda: false, tashkil: SUKUN },
                ],
            ];
            
        case RootType.HamzaOnR1:
            return [
                ALEF_HAMZA + FATHA + root.r2 + FATHA + root.r3,
                ALEF_HAMZA + FATHA + root.r2 + FATHA + ALEF + root.r3,
                ALEF_HAMZA + FATHA + root.r2 + FATHA + ALEF + root.r3 + FATHA + Letter.TaMarbuta,
                Letter.Hamza + KASRA + root.r2 + FATHA + ALEF + root.r3 + FATHA + Letter.TaMarbuta
            ];

        case RootType.Hollow:
            return [
                root.r1 + FATHA + WAW + SUKUN + root.r3,
                root.r1 + FATHA + WAW + SUKUN + root.r3 + FATHA + Letter.TaMarbuta,
                root.r1 + FATHA + WAW + FATHA + ALEF + root.r3,
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: Letter.Ya, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: NUN, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Sukun },
                    { letter: root.r3, shadda: false, tashkil: Tashkil.WordEnd },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Sukun },
                    { letter: root.r3, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: Tashkil.WordEnd }
                ],
                root.r1 + KASRA + Letter.Ya + FATHA + ALEF + root.r3,
                MIM + FATHA + root.r1 + FATHA + ALEF + root.r3,
            ];

        case RootType.Quadriliteral:
            return [
                [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha, },
                    { letter: root.r2, shadda: false, tashkil: Tashkil.Sukun, },
                    { letter: root.r3, shadda: false, tashkil: Tashkil.Fatha, },
                    { letter: root.r4, shadda: false, tashkil: Tashkil.Fatha, },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: Tashkil.WordEnd },
                ]
            ];

        case RootType.SecondConsonantDoubled:
            return [
                root.r1 + DHAMMA + root.r2 + DHAMMA + WAW + root.r3,
                root.r1 + FATHA + root.r2 + FATHA + ALEF + root.r3,
                root.r1 + FATHA + root.r2 + KASRA + Letter.Ya + root.r3,
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: true, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: true, tashkil: FATHA },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: KASRA },
                    { letter: root.r2, shadda: true, tashkil: SUKUN },
                ],
                MIM + FATHA + root.r1 + FATHA + root.r2 + SHADDA + FATHA + Letter.TaMarbuta
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
                    { letter: root.r2, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
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
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: FATHA },
                    { letter: Letter.TaMarbuta, shadda: false, tashkil: SUKUN },
                ],
                [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: SUKUN },
                    { letter: root.r3, shadda: false, tashkil: SUKUN },
                ],
                root.r1 + KASRA + root.r2 + FATHA + ALEF + root.r3 + FATHA + Letter.TaMarbuta,
                root.r1 + KASRA + root.r2 + SUKUN + root.r3,
            ];

        default:
            return ["TODO"];
    }
}