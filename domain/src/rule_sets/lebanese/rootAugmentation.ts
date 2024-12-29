/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationRule, Vowel } from "../../Conjugation";
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tashkil, Tense } from "../../Definitions";
import { RootType, VerbRoot } from "../../VerbRoot";
import { DoesPresentSuffixStartWithWawOrYa } from "../msa/conjugation/suffix";
import { IrregularIja, IsHamzaOnR1SpecialCase } from "./irregular";

export function AugmentRoot(root: VerbRoot, params: ConjugationParams): ConjugationRule[] | undefined
{
    switch(params.stem)
    {
        case 1:
            switch(root.type)
            {
                case RootType.Defective:
                    if((params.tense === Tense.Present) && (params.mood !== Mood.Imperative) && (params.stem1Context.middleRadicalTashkil === Tashkil.Kasra) && !DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
                    {
                        return [
                            {
                                conditions: { tense: Tense.Present },
                                prefixVowel: Vowel.ShortI,
                                symbols: [root.r1, root.r2],
                                vowels: [Vowel.Sukun, Vowel.BrokenA]
                            }
                        ];
                    }

                    return [
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.ShortI, Vowel.LongI]
                        },
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Singular },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.ShortI]
                        },
                        {
                            conditions: { tense: Tense.Perfect, person: Person.Third },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        },
                        {
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        }
                    ];

                case RootType.Hollow:
                    if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
                        return IrregularIja(root);

                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [(params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongI]
                                }
                            ]
                        },
                    ];

                case RootType.HamzaOnR1:
                    if(IsHamzaOnR1SpecialCase(root) && (params.tense === Tense.Present))
                    {
                        return [
                            {
                                conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortI]
                            },
                            {
                                conditions: { mood: Mood.Imperative },
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortU]
                            },
                            {
                                conditions: { hasPresentSuffix: true },
                                prefixVowel: Vowel.LongA,
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.Sukun]
                            },
                            {
                                conditions: { mood: Mood.Subjunctive, numerus: Numerus.Singular, person: Person.First, },
                                prefixVowel: Vowel.ShortA,
                                symbols: [root.r1, root.r2, root.r3],
                                vowels: [Vowel.Sukun, Vowel.ShortU]
                            },
                            {
                                conditions: {},
                                prefixVowel: Vowel.LongA,
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.ShortU]
                            }
                        ];
                    }

                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortU,
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortU,
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                }
                            ],
                        },
                    ];

                case RootType.Quadriliteral:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3, root.r4],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun],
                                        }
                                    ]
                                },
                            ]
                        },
                    ];

                case RootType.SecondConsonantDoubled:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect, person: Person.Third },
                                    vowels: [Vowel.ShortA, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.ShortI, Vowel.Sukun]
                                }
                            ]
                        },
                    ];

                case RootType.Sound:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortI]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                }
                            ]
                        },
                    ];
            }
        break;

        case 2:
        {
            switch(root.type)
            {
                case RootType.Quadriliteral:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r3, root.r4],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 3,
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    symbols: [root.r1, root.r2, root.r3, root.r4],
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun],
                                    children: [
                                        {
                                            conditions: { numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                        }
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                },
                            ]
                        },
                    ];

                case RootType.Sound:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 0 : 1,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                                        },
                                    ]
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 3:
        {
            switch(root.type)
            {
                case RootType.Hollow:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? undefined : 1,
                                    vowels: [Vowel.LongA, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.Sukun,
                                    vowels: [Vowel.LongA, Vowel.ShortI],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.LongA, Vowel.Sukun]
                                        },
                                    ]
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 4:
        {
            switch(root.type)
            {
                case RootType.Sound:
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [Letter.Hamza, root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                        },
                        {
                            conditions: { tense: Tense.Present },
                            prefixVowel: Vowel.ShortI,
                            symbols: [root.r1, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                                    vowels: [Vowel.Sukun, Vowel.ShortI]
                                },
                                {
                                    conditions: { mood: Mood.Imperative },
                                    vowels: [Vowel.Sukun, Vowel.LongU]
                                },
                                {
                                    conditions: { hasPresentSuffix: true },
                                    vowels: [Vowel.ShortI, Vowel.Sukun]
                                },
                                {
                                    conditions: {},
                                    vowels: [Vowel.Sukun, Vowel.ShortU]
                                }
                            ]
                        },
                    ];
            }
        }
        break;

        case 5:
        {
            switch(root.type)
            {
                case RootType.Defective:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    children: [
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortI],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongU],
                                        },
                                        {
                                            conditions: {},
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.DiphtongAj],
                                        },
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.BrokenA],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.LongU],
                                        },
                                    ]
                                }
                            ]
                        },
                    ];
                case RootType.Sound:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                }
                            ]
                        },
                    ];
            }
        }
        break;

        case 6:
        {
            switch(root.type)
            {
                case RootType.Defective:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    children: [
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular, gender: Gender.Male },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.BrokenA],
                                        },
                                        {
                                            conditions: { person: Person.Third, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.ShortI],
                                        },
                                        {
                                            conditions: { person: Person.Third },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongU],
                                        },
                                        {
                                            conditions: {},
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.DiphtongAj],
                                        },
                                    ]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.LongA, Vowel.BrokenA],
                                    children: [
                                        {
                                            conditions: { hasPresentSuffix: true, numerus: Numerus.Singular },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongI],
                                        },
                                        {
                                            conditions: { hasPresentSuffix: true },
                                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.LongU],
                                        },
                                    ]
                                }
                            ]
                        },
                    ];
                case RootType.Sound:
                    return [
                        {
                            conditions: {},
                            symbols: [Letter.Ta, root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongA, Vowel.ShortA],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? undefined : 2,
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                },
                            ]
                        },
                    ];
            }
        }
        break;

        case 8:
        {
            switch(root.type)
            {
                case RootType.Hollow:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, Letter.Ta, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    vowels: [Vowel.Sukun, (params.person === Person.Third) ? Vowel.LongA : Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.LongA]
                                },
                            ]
                        },
                    ];

                case RootType.Sound:
                    return [
                        {
                            conditions: {},
                            symbols: [root.r1, Letter.Ta, root.r2, root.r3],
                            children: [
                                {
                                    conditions: { tense: Tense.Perfect },
                                    emphasize: (params.person === Person.Third) ? 1 : 2,
                                    vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.ShortA]
                                },
                                {
                                    conditions: { tense: Tense.Present, hasPresentSuffix: true },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortI, Vowel.Sukun]
                                },
                                {
                                    conditions: { tense: Tense.Present },
                                    prefixVowel: Vowel.ShortI,
                                    vowels: [Vowel.Sukun, Vowel.ShortI, Vowel.ShortI]
                                },
                            ]
                        },
                    ];
            }
        }
        break;
    }
    return undefined;
}