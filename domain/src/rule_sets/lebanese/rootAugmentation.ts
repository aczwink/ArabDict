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
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tense } from "../../Definitions";
import { RootType, VerbRoot } from "../../VerbRoot";
import { IrregularIja, IsHamzaOnR1SpecialCase } from "./irregular";

export function AugmentRoot(root: VerbRoot, params: ConjugationParams): ConjugationRule[] | undefined
{
    switch(params.stem)
    {
        case 1:
            switch(root.type)
            {
                case RootType.Defective:
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
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r2],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.LongI]
                        }
                    ];

                case RootType.Hollow:
                    if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
                        return IrregularIja(root);

                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, root.r3],
                            vowels: [(params.person === Person.Third) ? Vowel.LongA : Vowel.ShortI]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r3],
                            vowels: [Vowel.LongI]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongI]
                        }
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
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.LongA, Vowel.Sukun]
                            },
                            {
                                conditions: { mood: Mood.Subjunctive, numerus: Numerus.Singular, person: Person.First, },
                                symbols: [root.r1, root.r2, root.r3],
                                vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortU]
                            },
                            {
                                conditions: {},
                                symbols: [root.r2, root.r3],
                                vowels: [Vowel.LongA, Vowel.ShortU]
                            }
                        ];
                    }

                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            emphasize: (params.person === Person.Third) ? 0 : 1,
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.ShortA]
                        },
                        {
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortU]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongU]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortU, Vowel.Sukun, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortU, Vowel.Sukun, Vowel.ShortU]
                        }
                    ];

                case RootType.Sound:
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            emphasize: (params.person === Person.Third) ? 0 : 1,
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.ShortA]
                        },
                        {
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortI]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongU]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.ShortU]
                        }
                    ];
            }
        break;

        case 2:
        {
            switch(root.type)
            {
                case RootType.Sound:
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortA]
                        },
                        {
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.ShortA, Vowel.Sukun, Vowel.ShortI]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r2, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortA, Vowel.Sukun, Vowel.ShortI]
                        }
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
                            conditions: { mood: Mood.Imperative, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.ShortI]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongU]
                        },
                        {
                            conditions: { tense: Tense.Present, hasPresentSuffix: true },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.ShortI, Vowel.Sukun]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, root.r2, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.ShortU]
                        }
                    ];
            }
        }
        break;

        case 8:
        {
            switch(root.type)
            {
                case RootType.Hollow:
                    const pastVowel = (params.person === Person.Third) ? Vowel.LongA : Vowel.ShortA;
                    return [
                        {
                            conditions: { tense: Tense.Perfect },
                            symbols: [root.r1, Letter.Ta, root.r3],
                            vowels: [Vowel.Sukun, pastVowel]
                        },
                        {
                            conditions: { mood: Mood.Imperative },
                            symbols: [root.r1, Letter.Ta, root.r3],
                            vowels: [Vowel.Sukun, Vowel.LongA]
                        },
                        {
                            conditions: { tense: Tense.Present },
                            symbols: [root.r1, Letter.Ta, root.r3],
                            vowels: [Vowel.ShortI, Vowel.Sukun, Vowel.LongA]
                        },
                    ];
            }
        }
        break;
    }
    return undefined;
}