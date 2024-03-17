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

import { ConjugationParams, Gender, Letter, Numerus, _LegacyPerson, Tashkil } from "../../../Definitions";
import { FullyVocalized, _LegacyPartiallyVocalized } from "../../../Vocalization";

function DeriveSuffixPerfect(params: ConjugationParams): { suffix: FullyVocalized[]; preSuffixTashkil: Tashkil}
{
    switch(params._legacyNumerus)
    {
        case "singular":
        {
            switch(params._legacyPerson)
            {
                case "first":
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [{ letter: Letter.Ta, shadda: false, tashkil: Tashkil.Dhamma }]
                    };
                case "second":
                {
                    switch(params._legacyGender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [{ letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },]
                            };
                        case "female":
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [{ letter: Letter.Ta, shadda: false, tashkil: Tashkil.Kasra },]
                            };
                    }
                }
                case "third":
                {
                    switch(params._legacyGender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [{ letter: Letter.Ta, shadda: false, tashkil: Tashkil.Sukun },],
                            };
                    }
                }
            }
        }

        case "dual":
        {
            switch(params._legacyPerson)
            {
                case "second":
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [
                            { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Dhamma },
                            { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                        ],
                    };
                case "third":
                {
                    switch(params._legacyGender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: Tashkil.Fatha,
                                suffix: [
                                    { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                                ],
                            };
                    }
                }
            }
        }

        case "plural":
        {
            switch(params._legacyPerson)
            {
                case "first":
                    return {
                        preSuffixTashkil: Tashkil.Sukun,
                        suffix: [
                            { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                        ],
                    };
                case "second":
                {
                    switch(params._legacyGender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Sukun },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Dhamma },
                                    { letter: Letter.Nun, shadda: true, tashkil: Tashkil.Fatha },
                                ],
                            };
                    }
                }
                case "third":
                {
                    switch(params._legacyGender)
                    {
                        case "male":
                            return {
                                preSuffixTashkil: Tashkil.Dhamma,
                                suffix: [
                                    { letter: Letter.Waw, shadda: false, tashkil: Tashkil.LongVowelMarker },
                                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.EndOfWordMarker },
                                ],
                            };
                        case "female":
                            return {
                                preSuffixTashkil: Tashkil.Sukun,
                                suffix: [
                                    { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Fatha },
                                ],
                            };
                    }
                }
            }
        }
    }
}

function DeriveSuffixPresent(params: ConjugationParams): { suffix: FullyVocalized[]; preSuffixTashkil: Tashkil}
{
    let defTashkil: Tashkil = Tashkil.Dhamma;
    if(params._legacyMood === "subjunctive")
        defTashkil = Tashkil.Fatha;
    else if(params._legacyMood === "jussive")
        defTashkil = Tashkil.Sukun;
    else if(params._legacyMood === "imperative")
        defTashkil = Tashkil.Sukun;

    switch(params._legacyNumerus)
    {
        case "singular":
        {
            if((params._legacyPerson === "second") && (params._legacyGender === "female"))
            {
                if((params._legacyMood === "subjunctive") || (params._legacyMood === "jussive") || (params._legacyMood === "imperative"))
                {
                    return {
                        preSuffixTashkil: Tashkil.Kasra,
                        suffix: [
                            { letter: Letter.Ya, shadda: false, tashkil: Tashkil.LongVowelMarker },
                        ]
                    };
                }
                return {
                    preSuffixTashkil: Tashkil.Kasra,
                    suffix: [
                        { letter: Letter.Ya, shadda: false, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Fatha }
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
            if((params._legacyMood === "subjunctive") || (params._legacyMood === "jussive") || (params._legacyMood === "imperative"))
            {
                return {
                    preSuffixTashkil: Tashkil.Fatha,
                    suffix: [
                        { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                    ]
                };
            }

            return {
                preSuffixTashkil: Tashkil.Fatha,
                suffix: [
                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Kasra }
                ]
            };
        }

        case "plural":
        {
            if(params._legacyPerson === "first")
                return {
                    preSuffixTashkil: defTashkil,
                    suffix: []
                };

            if(params._legacyGender === "male")
            {
                if((params._legacyMood === "subjunctive") || (params._legacyMood === "jussive") || (params._legacyMood === "imperative"))
                {
                    return {
                        preSuffixTashkil: Tashkil.Dhamma,
                        suffix: [
                            { letter: Letter.Waw, shadda: false, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Alef, shadda: false, tashkil: Tashkil.EndOfWordMarker }
                        ]
                    };
                }
                return {
                    preSuffixTashkil: Tashkil.Dhamma,
                    suffix: [
                        { letter: Letter.Waw, shadda: false, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Fatha }
                    ]
                };
            }

            return {
                preSuffixTashkil: Tashkil.Sukun,
                suffix: [
                    { letter: Letter.Nun, shadda: false, tashkil: Tashkil.Fatha }
                ]
            };
        }
    }
}

export function DeriveSuffix(params: ConjugationParams): { suffix: FullyVocalized[]; preSuffixTashkil: Tashkil}
{
    if(params._legacyTense === "perfect")
        return DeriveSuffixPerfect(params);
    return DeriveSuffixPresent(params);
}

export function DoesPresentSuffixStartWithWawOrYa(person: _LegacyPerson, numerus: Numerus, gender: Gender)
{
    const singular = (person === "second") && (numerus === "singular") && (gender === "female");
    //dual has always alef
    const plural = (person !== "first") && (numerus === "plural") && (gender === "male");

    return singular || plural;
}