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
import { ConjugationParams, Letter, Stem1Context, Tashkil, _LegacyVoice } from "../../Definitions";
import { DialectConjugator, ReverseConjugationResult } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { FullyVocalized, _LegacyPartiallyVocalized } from "../../Vocalization";
import { AugmentedRoot, AugmentedRootSymbolInput, SymbolName } from "../msa/AugmentedRoot";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator
{
    //Public methods
    public AnalyzeConjugation(conjugated: _LegacyPartiallyVocalized[]): ReverseConjugationResult[]
    {
        throw new Error("Method not implemented.");
    }
    
    public Conjugate(root: VerbRoot, params: ConjugationParams): FullyVocalized[]
    {
        const rootAugmentation = this.AugmentRoot(root, params);
        if(rootAugmentation === undefined)
        {
            return [
                {
                    letter: "TODO" as any,
                    shadda: false,
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
                    if( (params.stem === 1) && (params._legacyTense === "present") && (params._legacyNumerus === "plural") && (params._legacyPerson !== "first") )
                        augmentedRoot.DropRadial(3);
                }
                break;
        }

        return prefix.concat(augmentedRoot.symbols, suffix);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: _LegacyVoice, stem1Context?: Stem1Context | undefined): _LegacyPartiallyVocalized[]
    {
        return [
            {
                letter: "TODO",
                shadda: false,
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
                                shadda: false,
                            },
                            {
                                symbolName: SymbolName.R2,
                                shadda: false,
                            },
                            {
                                symbolName: SymbolName.R3,
                                shadda: false,
                            }
                        ];
                }
        }
        return undefined;
    }

    private DerivePrefix(params: ConjugationParams): FullyVocalized[]
    {
        if(params._legacyTense === "perfect")
            return [];
        if(params._legacyMood === "imperative")
            return [];

        if(params._legacyMood === "indicative")
        {
            if(params._legacyPerson === "first")
            {
                if(params._legacyNumerus === "singular")
                {
                    return [
                        {
                            letter: Letter.Ba,
                            shadda: false,
                            tashkil: Tashkil.Kasra
                        }
                    ];
                }

                return [
                    {
                        letter: Letter.Mim,
                        shadda: false,
                        tashkil: Tashkil.Sukun
                    },
                    ...this.DerivePrefixSubjunctive(params),
                ];
            }
            
            return [
                {
                    letter: Letter.Ba,
                    shadda: false,
                    tashkil: Tashkil.Sukun
                },
                ...this.DerivePrefixSubjunctive(params),
            ];
        }

        return this.DerivePrefixSubjunctive(params);
    }

    private DerivePrefixSubjunctive(params: ConjugationParams): FullyVocalized[]
    {
        switch(params._legacyPerson)
        {
            case "first":
                if(params._legacyNumerus === "plural")
                {
                    return [
                        {
                            letter: Letter.Nun,
                            shadda: false,
                            tashkil: Tashkil.Kasra
                        }
                    ];
                }

                return [
                    {
                        letter: Letter.Alef,
                        shadda: false,
                        tashkil: Tashkil.Kasra
                    }
                ];

            case "second":
                return [
                    {
                        letter: Letter.Ta,
                        shadda: false,
                        tashkil: Tashkil.Kasra
                    },
                ];

            case "third":
                if(params._legacyGender === "male")
                {
                    return [
                        {
                            letter: Letter.Ya,
                            shadda: false,
                            tashkil: Tashkil.Kasra
                        },
                    ];
                }
                return [
                    {
                        letter: Letter.Ta,
                        shadda: false,
                        tashkil: Tashkil.Kasra
                    },
                ];
        }
    }

    private DeriveRootTashkil(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
    {
        if(params._legacyTense === "present")
            return this.DeriveRootTashkilPresent(params);

        function R1Tashkil(): Tashkil
        {
            if(params._legacyPerson === "third")
                return Tashkil.Kasra;
            return Tashkil.Sukun;
        }

        function R2Tashkil(): Tashkil
        {
            if(params._legacyNumerus === "plural")
            {
                switch(params._legacyPerson)
                {
                    case "third":
                        return Tashkil.Sukun;
                }
            }

            switch(params._legacyPerson)
            {
                case "third":
                    if(params._legacyGender === "male")
                        return Tashkil.Kasra;
                    return Tashkil.Sukun;
            }
            return Tashkil.Kasra;
        }

        function R3Tashkil(): Tashkil
        {
            if(params._legacyNumerus === "plural")
            {
                switch(params._legacyPerson)
                {
                    case "third":
                        return Tashkil.Dhamma;
                }
            }
            return Tashkil.Kasra;
        }

        return { r1: R1Tashkil(), r2: R2Tashkil(), r3: R3Tashkil() };
    }

    private DeriveRootTashkilPresent(params: ConjugationParams): { r1: Tashkil; r2: Tashkil; r3: Tashkil; }
    {
        if( (params._legacyNumerus === "plural") && (params._legacyPerson !== "first") )
            return { r1: Tashkil.Sukun, r2: Tashkil.Dhamma, r3: Tashkil.Dhamma };
    
        return { r1: Tashkil.Sukun, r2: Tashkil.Kasra, r3: Tashkil.Kasra };
    }

    private DeriveSuffix(params: ConjugationParams): FullyVocalized[]
    {
        if(params._legacyTense === "present")
            return this.DeriveSuffixPresent(params);

        if(params._legacyNumerus === "plural")
        {
            switch(params._legacyPerson)
            {
                case "first":
                    return [
                        {
                            letter: Letter.Nun,
                            shadda: false,
                            tashkil: Tashkil.Fatha
                        },
                        {
                            letter: Letter.Alef,
                            shadda: false,
                            tashkil: Tashkil.Fatha
                        }
                    ];

                case "second":
                    return [
                        {
                            letter: Letter.Ta,
                            shadda: false,
                            tashkil: Tashkil.Dhamma
                        },
                        {
                            letter: Letter.Waw,
                            shadda: false,
                            tashkil: Tashkil.Dhamma
                        },
                        {
                            letter: Letter.Alef,
                            shadda: false,
                            tashkil: Tashkil.Fatha
                        }
                    ];

                case "third":
                    return [
                        {
                            letter: Letter.Waw,
                            shadda: false,
                            tashkil: Tashkil.Dhamma
                        },
                        {
                            letter: Letter.Alef,
                            shadda: false,
                            tashkil: Tashkil.Fatha
                        }
                    ];
            }
        }

        switch(params._legacyPerson)
        {
            case "first":
                return [
                    {
                        letter: Letter.Ta,
                        shadda: false,
                        tashkil: Tashkil.Sukun
                    }
                ];
                    
            case "second":
                if(params._legacyGender === "male")
                    return [
                        {
                            letter: Letter.Ta,
                            shadda: false,
                            tashkil: Tashkil.Sukun
                        }
                    ];

                return [
                    {
                        letter: Letter.Ta,
                        shadda: false,
                        tashkil: Tashkil.Kasra
                    },
                    {
                        letter: Letter.Ya,
                        shadda: false,
                        tashkil: Tashkil.Kasra
                    }
                ];
                
            case "third":
                if(params._legacyGender === "male")
                    return [];

                return [
                    {
                        letter: Letter.Ta,
                        shadda: false,
                        tashkil: Tashkil.Sukun
                    }
                ];
        }
    }

    private DeriveSuffixPresent(params: ConjugationParams): FullyVocalized[]
    {
        if(params._legacyNumerus === "plural")
        {
            switch(params._legacyPerson)
            {
                case "second":
                case "third":
                    return [
                        {
                            letter: Letter.Waw,
                            shadda: false,
                            tashkil: Tashkil.Dhamma
                        },
                        {
                            letter: Letter.Alef,
                            shadda: false,
                            tashkil: Tashkil.Fatha
                        }
                    ];
            }
        }

        return [];
    }
}