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

import { BASE_TASHKIL, SUKUN, DHAMMA, FATHA, KASRA, MIM, ALEF, WAW, Letter, Tashkil } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { FullyVocalized, _LegacyPartiallyVocalized } from "../../../Vocalization";
import { TA, NUN, Person, Numerus, Gender } from "../_legacy/VerbStem";

function DeriveSuffixPerfect(params: ConjugationParams): { suffix: (_LegacyPartiallyVocalized | FullyVocalized)[]; preSuffixTashkil: BASE_TASHKIL}
{
    switch(params.numerus)
    {
        case "singular":
        {
            switch(params.person)
            {
                case "first":
                    return {
                        preSuffixTashkil: SUKUN,
                        suffix: [{ letter: TA, shadda: false, tashkil: DHAMMA }]
                    };
                case "second":
                {
                    switch(params.gender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: SUKUN,
                                suffix: [{ letter: TA, shadda: false, tashkil: FATHA },]
                            };
                        case "female":
                            return {
                                preSuffixTashkil: SUKUN,
                                suffix: [{ letter: TA, shadda: false, tashkil: KASRA },]
                            };
                    }
                }
                case "third":
                {
                    switch(params.gender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: FATHA,
                                suffix: [],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: FATHA,
                                suffix: [{ letter: TA, shadda: false, tashkil: SUKUN },],
                            };
                    }
                }
            }
        }

        case "dual":
        {
            switch(params.person)
            {
                case "second":
                    return {
                        preSuffixTashkil: SUKUN,
                        suffix: [
                            { letter: TA, shadda: false, tashkil: DHAMMA },
                            { letter: MIM, shadda: false, tashkil: FATHA },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                        ],
                    };
                case "third":
                {
                    switch(params.gender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: FATHA,
                                suffix: [
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: FATHA,
                                suffix: [
                                    { letter: TA, shadda: false, tashkil: FATHA },
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                                ],
                            };
                    }
                }
            }
        }

        case "plural":
        {
            switch(params.person)
            {
                case "first":
                    return {
                        preSuffixTashkil: SUKUN,
                        suffix: [
                            { letter: NUN, shadda: false, tashkil: FATHA },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                        ],
                    };
                case "second":
                {
                    switch(params.gender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: SUKUN,
                                suffix: [
                                    { letter: TA, shadda: false, tashkil: DHAMMA },
                                    { letter: MIM, shadda: false, tashkil: SUKUN },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: SUKUN,
                                suffix: [
                                    { letter: TA, shadda: false, tashkil: DHAMMA },
                                    { letter: NUN, shadda: true, tashkil: FATHA },
                                ],
                            };
                    }
                }
                case "third":
                {
                    switch(params.gender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: DHAMMA,
                                suffix: [
                                    { letter: Letter.Waw, shadda: false, tashkil: Tashkil.Vowel },
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.WordEnd },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: SUKUN,
                                suffix: [
                                    { letter: NUN, shadda: false, tashkil: FATHA },
                                ],
                            };
                    }
                }
            }
        }
    }
}

function DeriveSuffixPresent(params: ConjugationParams): { suffix: (_LegacyPartiallyVocalized | FullyVocalized)[]; preSuffixTashkil: BASE_TASHKIL}
{
    let defTashkil: BASE_TASHKIL = DHAMMA;
    if(params.mood === "subjunctive")
        defTashkil = FATHA;
    else if(params.mood === "jussive")
        defTashkil = SUKUN;
    else if(params.mood === "imperative")
        defTashkil = SUKUN;

    switch(params.numerus)
    {
        case "singular":
        {
            if((params.person === "second") && (params.gender === "female"))
            {
                if((params.mood === "subjunctive") || (params.mood === "jussive") || (params.mood === "imperative"))
                {
                    return {
                        preSuffixTashkil: KASRA,
                        suffix: [
                            { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Vowel },
                        ]
                    };
                }
                return {
                    preSuffixTashkil: KASRA,
                    suffix: [
                        { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Vowel },
                        { letter: NUN, shadda: false, tashkil: FATHA }
                    ]
                };
            }

            return {
                preSuffixTashkil: defTashkil,
                suffix: []
            };
        }

        case "dual":
        {
            if((params.mood === "subjunctive") || (params.mood === "jussive") || (params.mood === "imperative"))
            {
                return {
                    preSuffixTashkil: FATHA,
                    suffix: [
                        { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                    ]
                };
            }

            return {
                preSuffixTashkil: FATHA,
                suffix: [
                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Vowel },
                    { letter: NUN, shadda: false, tashkil: KASRA }
                ]
            };
        }

        case "plural":
        {
            if(params.person === "first")
                return {
                    preSuffixTashkil: defTashkil,
                    suffix: []
                };

            if(params.gender === "male")
            {
                if((params.mood === "subjunctive") || (params.mood === "jussive") || (params.mood === "imperative"))
                {
                    return {
                        preSuffixTashkil: DHAMMA,
                        suffix: [
                            { letter: Letter.Waw, shadda: false, tashkil: Tashkil.Vowel },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.WordEnd }
                        ]
                    };
                }
                return {
                    preSuffixTashkil: DHAMMA,
                    suffix: [
                        { letter: Letter.Waw, shadda: false, tashkil: Tashkil.Vowel },
                        { letter: NUN, shadda: false, tashkil: FATHA }
                    ]
                };
            }

            return {
                preSuffixTashkil: SUKUN,
                suffix: [
                    { letter: NUN, shadda: false, tashkil: FATHA }
                ]
            };
        }
    }
}

export function DeriveSuffix(params: ConjugationParams): { suffix: (_LegacyPartiallyVocalized | FullyVocalized)[]; preSuffixTashkil: BASE_TASHKIL}
{
    if(params.tense === "perfect")
        return DeriveSuffixPerfect(params);
    return DeriveSuffixPresent(params);
}

export function DoesPresentSuffixStartWithWawOrYa(person: Person, numerus: Numerus, gender: Gender)
{
    const singular = (person === "second") && (numerus === "singular") && (gender === "female");
    //dual has always alef
    const plural = (person !== "first") && (numerus === "plural") && (gender === "male");

    return singular || plural;
}