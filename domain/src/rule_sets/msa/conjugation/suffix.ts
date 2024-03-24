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

import { ConjugationParams, Letter, Tashkil, Tense, Person, Numerus, Gender, Mood } from "../../../Definitions";
import { ConjugationVocalized } from "../../../Vocalization";

function DeriveSuffixPerfect(params: ConjugationParams): { suffix: ConjugationVocalized[]; preSuffixTashkil: Tashkil}
{
    switch(params.numerus)
    {
        case Numerus.Singular:
        {
            switch(params.person)
            {
                case Person.First:
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [{ letter: Letter.Ta, tashkil: Tashkil.Dhamma }]
                    };
                case Person.Second:
                {
                    switch(params.gender)
                    {
                        case Gender.Male:
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [{ letter: Letter.Ta, tashkil: Tashkil.Fatha },]
                            };
                        case Gender.Female:
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [{ letter: Letter.Ta, tashkil: Tashkil.Kasra },]
                            };
                    }
                }
                case Person.Third:
                {
                    switch(params.gender)
                    {
                        case Gender.Male:
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [],
                            };
                        case Gender.Female:
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [{ letter: Letter.Ta, tashkil: Tashkil.Sukun },],
                            };
                    }
                }
            }
        }

        case Numerus.Dual:
        {
            switch(params.person)
            {
                case Person.Second:
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [
                            { letter: Letter.Ta, tashkil: Tashkil.Dhamma },
                            { letter: Letter.Mim, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                        ],
                    };
                case Person.Third:
                {
                    switch(params.gender)
                    {
                        case Gender.Male:
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                ],
                            };
                        case Gender.Female:
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [
                                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                                ],
                            };
                    }
                }
            }
        }

        case Numerus.Plural:
        {
            switch(params.person)
            {
                case Person.First:
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [
                            { letter: Letter.Nun, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                        ],
                    };
                case Person.Second:
                {
                    switch(params.gender)
                    {
                        case Gender.Male:
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Ta, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Mim, tashkil: Tashkil.Sukun },
                                ],
                            };
                        case Gender.Female:
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Ta, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Nun, tashkil: Tashkil.Sukun },
                                    { letter: Letter.Nun, tashkil: Tashkil.Fatha },
                                ],
                            };
                    }
                }
                case Person.Third:
                {
                    switch(params.gender)
                    {
                        case Gender.Male:
                            return {
                                preSuffixTashkil: Tashkil.Dhamma,
                                suffix: [
                                    { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Alef, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            };
                        case Gender.Female:
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Nun, tashkil: Tashkil.Fatha },
                                ],
                            };
                    }
                }
            }
        }
    }
}

function DeriveSuffixPresent(params: ConjugationParams, mood: Mood): { suffix: ConjugationVocalized[]; preSuffixTashkil: Tashkil}
{
    let defTashkil: Tashkil = Tashkil.Dhamma;
    if(mood === Mood.Subjunctive)
        defTashkil = Tashkil.Fatha;
    else if(mood === Mood.Jussive)
        defTashkil = Tashkil.Sukun;
    else if(mood === Mood.Imperative)
        defTashkil = Tashkil.Sukun;

    switch(params.numerus)
    {
        case Numerus.Singular:
        {
            if((params.person === Person.Second) && (params.gender === Gender.Female))
            {
                if((mood === Mood.Subjunctive) || (mood === Mood.Jussive) || (mood === Mood.Imperative))
                {
                    return {
                        preSuffixTashkil: Tashkil.Kasra,
                        suffix: [
                            { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                        ]
                    };
                }
                return {
                    preSuffixTashkil: Tashkil.Kasra,
                    suffix: [
                        { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Nun, tashkil: Tashkil.Fatha }
                    ]
                };
            }

            return {
                preSuffixTashkil: defTashkil,
                suffix: []
            };
        }

        case Numerus.Dual:
        {
            if((mood === Mood.Subjunctive) || (mood === Mood.Jussive) || (mood === Mood.Imperative))
            {
                return {
                    preSuffixTashkil: Tashkil.Fatha,
                    suffix: [
                        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    ]
                };
            }

            return {
                preSuffixTashkil: Tashkil.Fatha,
                suffix: [
                    { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Nun, tashkil: Tashkil.Kasra }
                ]
            };
        }

        case Numerus.Plural:
        {
            if(params.person === Person.First)
                return {
                    preSuffixTashkil: defTashkil,
                    suffix: []
                };

            if(params.gender === Gender.Male)
            {
                if((mood === Mood.Subjunctive) || (mood === Mood.Jussive) || (mood === Mood.Imperative))
                {
                    return {
                        preSuffixTashkil: Tashkil.Dhamma,
                        suffix: [
                            { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Alef, tashkil: Tashkil.EndOfWordMarker }
                        ]
                    };
                }
                return {
                    preSuffixTashkil: Tashkil.Dhamma,
                    suffix: [
                        { letter: Letter.Waw, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Nun, tashkil: Tashkil.Fatha }
                    ]
                };
            }

            return {
                preSuffixTashkil: Tashkil.Sukun,
                suffix: [
                    { letter: Letter.Nun, tashkil: Tashkil.Fatha }
                ]
            };
        }
    }
}

export function DeriveSuffix(params: ConjugationParams): { suffix: ConjugationVocalized[]; preSuffixTashkil: Tashkil}
{
    if(params.tense === Tense.Perfect)
        return DeriveSuffixPerfect(params);
    return DeriveSuffixPresent(params, params.mood);
}

export function DoesPresentSuffixStartWithWawOrYa(person: Person, numerus: Numerus, gender: Gender)
{
    const singular = (person === Person.Second) && (numerus === Numerus.Singular) && (gender === Gender.Female);
    //dual has always alef
    const plural = (person !== Person.First) && (numerus === Numerus.Plural) && (gender === Gender.Male);

    return singular || plural;
}