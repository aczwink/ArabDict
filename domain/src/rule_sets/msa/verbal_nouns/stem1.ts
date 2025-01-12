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

import { Tashkil, Stem1Context, Letter } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";

export function GenerateAllPossibleVerbalNounsStem1(root: VerbRoot, stem1Context: Stem1Context): ConjugationVocalized[][]
{
    switch(root.type)
    {
        case RootType.Assimilated:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Fatha:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {                        
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;
            }
        }
        break;

        case RootType.Defective:
        {
            switch(stem1Context.middleRadicalTashkilPresent)
            {
                case Tashkil.Kasra: //type 1
                    return [
                        [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: root.r2, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                        ],
                    ];
            }
        }
        break;

        case RootType.Hollow:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Kasra:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Kasra:
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Kasra },
                                    { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.Fatha },
                                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                                ],
                            ];
                    }
                }
                break;
            }
        }
        break;

        case RootType.SecondConsonantDoubled:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Fatha:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Dhamma:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                    }
                }
                break;
            }
        }
        break;

        case RootType.Sound:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Fatha:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Fatha:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                        
                        case Tashkil.Kasra:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Sukun },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }

                        case Tashkil.Dhamma:
                            return [
                                [
                                    { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                                    { letter: root.r1, tashkil: Tashkil.Sukun },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                    }
                }
                break;

                case Tashkil.Kasra:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Fatha:
                        {
                            return [
                                [
                                    { letter: root.r1, tashkil: Tashkil.Fatha },
                                    { letter: root.r2, tashkil: Tashkil.Fatha },
                                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            ];
                        }
                    }
                }
                break;
            }
        }
        break;
    }

    return [
        [{letter: "TODO" as any, tashkil: Tashkil.Sukun}]
    ];

    //TODO: this will be done again from scratch but this time test driven and dependent on stem1Content
    /*switch(root.type)
    {
        case RootType.Assimilated:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Sukun },
                ],
                [
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
            ];

        case RootType.Defective:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: Letter.Waw, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fathatan },
                    { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: Letter.Waw, tashkil: Tashkil.Dhamma },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.Sukun },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Hamza, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
            ];

        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            return  [
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
            ];
            
        case RootType.HamzaOnR1:
            return [
                Letter.AlefHamza + Tashkil.Fatha + root.r2 + Tashkil.Fatha + root.r3,
                Letter.AlefHamza + Tashkil.Fatha + root.r2 + Tashkil.Fatha + Letter.Alef + root.r3,
                Letter.AlefHamza + Tashkil.Fatha + root.r2 + Tashkil.Fatha + Letter.Alef + root.r3 + Tashkil.Fatha + Letter.TaMarbuta,
                Letter.Hamza + Tashkil.Kasra + root.r2 + Tashkil.Fatha + Letter.Alef + root.r3 + Tashkil.Fatha + Letter.TaMarbuta
            ];

        case RootType.Hollow:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                root.r1 + Tashkil.Fatha + Letter.Waw + Tashkil.Sukun + root.r3,
                root.r1 + Tashkil.Fatha + Letter.Waw + Tashkil.Sukun + root.r3 + Tashkil.Fatha + Letter.TaMarbuta,
                root.r1 + Tashkil.Fatha + Letter.Waw + Tashkil.Fatha + Letter.Alef + root.r3,
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Nun, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: Letter.Ya, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker }
                ],
                Letter.Mim + Tashkil.Fatha + root.r1 + Tashkil.Fatha + Letter.Alef + root.r3,
            ];

        case RootType.Quadriliteral:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha, },
                    { letter: root.r2, tashkil: Tashkil.Sukun, },
                    { letter: root.r3, tashkil: Tashkil.Fatha, },
                    { letter: root.r4, tashkil: Tashkil.Fatha, },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        case RootType.SecondConsonantDoubled:
            return [
                root.r1 + Tashkil.Dhamma + root.r2 + Tashkil.Dhamma + Letter.Waw + root.r3,
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                root.r1 + Tashkil.Fatha + root.r2 + Tashkil.Kasra + Letter.Ya + root.r3,
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.Fatha },
                    { letter: root.r3, tashkil: Tashkil.Sukun },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r2, tashkil: Tashkil.EndOfWordMarker },
                ],
                Letter.Mim + Tashkil.Fatha + root.r1 + Tashkil.Fatha + root.r2 + TASHKIL_SHADDA + Tashkil.Fatha + Letter.TaMarbuta
            ];

        case RootType.Sound:
            return [
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Dhamma },
                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Dhamma },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Kasra },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ],
                root.r1 + Tashkil.Kasra + root.r2 + Tashkil.Fatha + Letter.Alef + root.r3 + Tashkil.Fatha + Letter.TaMarbuta,
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                ],
                [
                    { letter: root.r1, tashkil: Tashkil.Kasra },
                    { letter: root.r2, tashkil: Tashkil.Sukun },
                    { letter: root.r3, tashkil: Tashkil.Fatha },
                    { letter: Letter.TaMarbuta, tashkil: Tashkil.EndOfWordMarker },
                ]
            ];

        default:
            return ["TODO"];
    }*/
}

export function HasPotentiallyMultipleVerbalNounFormsStem1(root: VerbRoot, stem1Context: Stem1Context)
{
    switch(root.type)
    {
        case RootType.Hollow:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Kasra:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
            }
        }
        break;
        case RootType.SecondConsonantDoubled:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Fatha:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Dhamma:
                            return true;
                    }
                }
                break;
            }
        }
        break;
        case RootType.Sound:
        {
            switch(stem1Context.middleRadicalTashkil)
            {
                case Tashkil.Fatha:
                {
                    switch(stem1Context.middleRadicalTashkilPresent)
                    {
                        case Tashkil.Kasra:
                            return true;
                    }
                }
                break;
            }
        }
        break;
    }
    return false;
}