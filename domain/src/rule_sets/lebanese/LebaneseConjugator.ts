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
import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Stem1Context, Tashkil, Tense, VoiceString } from "../../Definitions";
import { DialectConjugator } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized } from "../../Vocalization";
import { AugmentedRoot, AugmentedRootSymbolInput, SymbolName } from "../msa/AugmentedRoot";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator
{
    //Public methods    
    public Conjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[]
    {
        const rootAugmentation = this.AugmentRoot(root, params);
        if(rootAugmentation === undefined)
        {
            return [
                {
                    letter: "TODO" as any,
                    tashkil: Tashkil.Dhamma
                }
            ];
        }
        const augmentedRoot = new AugmentedRoot(rootAugmentation, root);

        const rootTashkil = this.DeriveRootTashkil(params);

        augmentedRoot.ApplyRadicalTashkil(1, rootTashkil.r1);
        augmentedRoot.ApplyRadicalTashkil(2, rootTashkil.r2);
        augmentedRoot.ApplyRadicalTashkil(3, rootTashkil.r3);

        const prefix = this.DerivePrefix(params);
        const suffix = this.DeriveSuffix(params);

        switch(augmentedRoot.type)
        {
            case RootType.Defective:
                {
                    if( (params.stem === 1) && (params.tense === Tense.Present) && (params.numerus === Numerus.Plural) && (params.person !== Person.First) )
                        augmentedRoot.DropRadial(3);
                }
                break;
        }

        return prefix.concat(augmentedRoot.symbols, suffix);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: VoiceString, stem1Context?: Stem1Context | undefined): ConjugationVocalized[]
    {
        return [
            {
                letter: `T${Tashkil.Fatha}O${Tashkil.Fatha}D${Tashkil.Fatha}O` as any,
                tashkil: Tashkil.Fatha
            }
        ];
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): string[]
    {
        return [
            "TODO"
        ];
    }

    //Private methods    
    private AugmentRoot(root: VerbRoot, params: ConjugationParams): AugmentedRootSymbolInput[] | undefined
    {
        switch(params.stem)
        {
            case 1:
                switch(root.type)
                {
                    case RootType.Defective:
                        return [
                            {
                                symbolName: SymbolName.R1,
                            },
                            {
                                symbolName: SymbolName.R2,
                            },
                            {
                                symbolName: SymbolName.R3,
                            }
                        ];
                }
        }
        return undefined;
    }

    private DerivePrefix(params: ConjugationParams): ConjugationVocalized[]
    {
        if(params.tense === Tense.Perfect)
            return [];
        if(params.mood === Mood.Imperative)
            return [];

        if(params.mood === Mood.Indicative)
        {
            if(params.person === Person.First)
            {
                if(params.numerus === Numerus.Singular)
                {
                    return [
                        {
                            letter: Letter.Ba,
                            tashkil: Tashkil.Kasra
                        }
                    ];
                }

                return [
                    {
                        letter: Letter.Mim,
                        tashkil: Tashkil.Sukun
                    },
                    ...this.DerivePrefixSubjunctive(params),
                ];
            }
            
            return [
                {
                    letter: Letter.Ba,
                    tashkil: Tashkil.Sukun
                },
                ...this.DerivePrefixSubjunctive(params),
            ];
        }

        return this.DerivePrefixSubjunctive(params);
    }

    private DerivePrefixSubjunctive(params: ConjugationParams): ConjugationVocalized[]
    {
        switch(params.person)
        {
            case Person.First:
                if(params.numerus === Numerus.Plural)
                {
                    return [
                        {
                            letter: Letter.Nun,
                            tashkil: Tashkil.Kasra
                        }
                    ];
                }

                return [
                    {
                        letter: Letter.Alef,
                        tashkil: Tashkil.Kasra
                    }
                ];

            case Person.Second:
                return [
                    {
                        letter: Letter.Ta,
                        tashkil: Tashkil.Kasra
                    },
                ];

            case Person.Third:
                if(params.gender === Gender.Male)
                {
                    return [
                        {
                            letter: Letter.Ya,
                            tashkil: Tashkil.Kasra
                        },
                    ];
                }
                return [
                    {
                        letter: Letter.Ta,
                        tashkil: Tashkil.Kasra
                    },
                ];
        }
    }

    private DeriveRootTashkil(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
    {
        if(params.tense === Tense.Present)
            return this.DeriveRootTashkilPresent(params);

        function R1Tashkil(): Tashkil
        {
            if(params.person === Person.Third)
                return Tashkil.Kasra;
            return Tashkil.Sukun;
        }

        function R2Tashkil(): Tashkil
        {
            if(params.numerus === Numerus.Plural)
            {
                switch(params.person)
                {
                    case Person.Third:
                        return Tashkil.Sukun;
                }
            }

            switch(params.person)
            {
                case Person.Third:
                    if(params.gender === Gender.Male)
                        return Tashkil.Kasra;
                    return Tashkil.Sukun;
            }
            return Tashkil.Kasra;
        }

        function R3Tashkil(): Tashkil
        {
            if((params.numerus === Numerus.Singular) && (params.person === Person.Third) && (params.gender === Gender.Female))
                return Tashkil.Kasra;
            if((params.numerus === Numerus.Plural) && (params.person === Person.Third))
                return Tashkil.Dhamma;
            return Tashkil.LongVowelMarker;
        }

        return { r1: R1Tashkil(), r2: R2Tashkil(), r3: R3Tashkil() };
    }

    private DeriveRootTashkilPresent(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
    {
        if( (params.numerus === Numerus.Plural) && (params.person !== Person.First) )
            return { r1: Tashkil.Sukun, r2: Tashkil.Dhamma, r3: Tashkil.Dhamma };
    
        return { r1: Tashkil.Sukun, r2: Tashkil.Kasra, r3: Tashkil.LongVowelMarker };
    }

    private DeriveSuffix(params: ConjugationParams): ConjugationVocalized[]
    {
        if(params.tense === Tense.Present)
            return this.DeriveSuffixPresent(params);

        if(params.numerus === Numerus.Plural)
        {
            switch(params.person)
            {
                case Person.First:
                    return [
                        {
                            letter: Letter.Nun,
                            tashkil: Tashkil.Fatha
                        },
                        {
                            letter: Letter.Alef,
                            tashkil: Tashkil.LongVowelMarker
                        }
                    ];

                case Person.Second:
                    return [
                        {
                            letter: Letter.Ta,
                            tashkil: Tashkil.Dhamma
                        },
                        {
                            letter: Letter.Waw,
                            tashkil: Tashkil.LongVowelMarker
                        },
                        {
                            letter: Letter.Alef,
                            tashkil: Tashkil.EndOfWordMarker
                        }
                    ];

                case Person.Third:
                    return [
                        {
                            letter: Letter.Waw,
                            tashkil: Tashkil.LongVowelMarker
                        },
                        {
                            letter: Letter.Alef,
                            tashkil: Tashkil.EndOfWordMarker
                        }
                    ];
            }
        }

        switch(params.person)
        {
            case Person.First:
                return [
                    {
                        letter: Letter.Ta,
                        tashkil: Tashkil.Sukun
                    }
                ];
                    
            case Person.Second:
                if(params.gender === Gender.Male)
                    return [
                        {
                            letter: Letter.Ta,
                            tashkil: Tashkil.Sukun
                        }
                    ];

                return [
                    {
                        letter: Letter.Ta,
                        tashkil: Tashkil.Kasra
                    },
                    {
                        letter: Letter.Ya,
                        tashkil: Tashkil.LongVowelMarker
                    }
                ];
                
            case Person.Third:
                if(params.gender === Gender.Male)
                    return [];

                return [
                    {
                        letter: Letter.Ta,
                        tashkil: Tashkil.Sukun
                    }
                ];
        }
    }

    private DeriveSuffixPresent(params: ConjugationParams): ConjugationVocalized[]
    {
        if(params.numerus === Numerus.Plural)
        {
            switch(params.person)
            {
                case Person.Second:
                case Person.Third:
                    return [
                        {
                            letter: Letter.Waw,
                            tashkil: Tashkil.LongVowelMarker
                        },
                        {
                            letter: Letter.Alef,
                            tashkil: Tashkil.EndOfWordMarker
                        }
                    ];
            }
        }

        return [];
    }
}