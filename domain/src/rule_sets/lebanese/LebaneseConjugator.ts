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
import { ALEF, BA, BASE_TASHKIL, DHAMMA, FATHA, KASRA, Letter, MIM, SUKUN, WAW } from "../../Definitions";
import { ConjugationParams, DialectConjugator, ReverseConjugationResult } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { _LegacyPartiallyVocalized, _LegacyFullyVocalized, _LegacyVerbVocalized } from "../../Vocalization";
import { AugmentedRoot, AugmentedRootSymbolInput } from "../msa/AugmentedRoot";
import { Stem1Context } from "../msa/_legacy/CreateVerb";
import { NUN, TA, Voice } from "../msa/_legacy/VerbStem";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator
{
    //Public methods
    public AnalyzeConjugation(conjugated: _LegacyPartiallyVocalized[]): ReverseConjugationResult[]
    {
        throw new Error("Method not implemented.");
    }
    
    public Conjugate(root: VerbRoot, params: ConjugationParams): _LegacyPartiallyVocalized[]
    {
        const rootAugmentation = this.AugmentRoot(root, params);
        if(rootAugmentation === undefined)
        {
            return [
                {
                    letter: "TODO",
                    shadda: false,
                }
            ];
        }
        const augmentedRoot = new AugmentedRoot(rootAugmentation, root);

        const rootTashkil = this.DeriveRootTashkil(params);

        augmentedRoot.ApplyTashkil(1, rootTashkil.r1);
        augmentedRoot.ApplyTashkil(2, rootTashkil.r2);
        augmentedRoot.ApplyTashkil(3, rootTashkil.r3);

        const prefix = this.DerivePrefix(params);
        const suffix = this.DeriveSuffix(params);

        switch(augmentedRoot.type)
        {
            case RootType.Defective:
                {
                    if( (params.stem === 1) && (params.tense === "present") && (params.numerus === "plural") && (params.person !== "first") )
                        augmentedRoot.DropRadial(3);
                }
                break;
        }

        return (prefix as _LegacyPartiallyVocalized[]).concat(augmentedRoot.partiallyVocalized, suffix);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context | undefined): _LegacyPartiallyVocalized[] | _LegacyFullyVocalized[]
    {
        return [
            {
                letter: "TODO",
                shadda: false,
            }
        ];
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): (string | _LegacyFullyVocalized[])[]
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
                                symbolName: "r1",
                                shadda: false,
                            },
                            {
                                symbolName: "r2",
                                shadda: false,
                            },
                            {
                                symbolName: "r3",
                                shadda: false,
                            }
                        ];
                }
        }
        return undefined;
    }

    private DerivePrefix(params: ConjugationParams): _LegacyVerbVocalized[]
    {
        if(params.tense === "perfect")
            return [];
        if(params.mood === "imperative")
            return [];

        if(params.mood === "indicative")
        {
            if(params.person === "first")
            {
                if(params.numerus === "singular")
                {
                    return [
                        {
                            letter: BA,
                            shadda: false,
                            tashkil: KASRA
                        }
                    ];
                }

                return [
                    {
                        letter: MIM,
                        shadda: false,
                        tashkil: SUKUN
                    },
                    ...this.DerivePrefixSubjunctive(params),
                ];
            }
            
            return [
                {
                    letter: BA,
                    shadda: false,
                    tashkil: SUKUN
                },
                ...this.DerivePrefixSubjunctive(params),
            ];
        }

        return this.DerivePrefixSubjunctive(params);
    }

    private DerivePrefixSubjunctive(params: ConjugationParams): _LegacyVerbVocalized[]
    {
        switch(params.person)
        {
            case "first":
                if(params.numerus === "plural")
                {
                    return [
                        {
                            letter: NUN,
                            shadda: false,
                            tashkil: KASRA
                        }
                    ];
                }

                return [
                    {
                        letter: ALEF,
                        shadda: false,
                        tashkil: KASRA
                    }
                ];

            case "second":
                return [
                    {
                        letter: TA,
                        shadda: false,
                        tashkil: KASRA
                    },
                ];

            case "third":
                if(params.gender === "male")
                {
                    return [
                        {
                            letter: Letter.Ya,
                            shadda: false,
                            tashkil: KASRA
                        },
                    ];
                }
                return [
                    {
                        letter: TA,
                        shadda: false,
                        tashkil: KASRA
                    },
                ];
        }
    }

    private DeriveRootTashkil(params: ConjugationParams): { r1: BASE_TASHKIL; r2: BASE_TASHKIL; r3: BASE_TASHKIL; }
    {
        if(params.tense === "present")
            return this.DeriveRootTashkilPresent(params);

        function R1Tashkil(): BASE_TASHKIL
        {
            if(params.person === "third")
                return KASRA;
            return SUKUN;
        }

        function R2Tashkil(): BASE_TASHKIL
        {
            if(params.numerus === "plural")
            {
                switch(params.person)
                {
                    case "third":
                        return SUKUN;
                }
            }

            switch(params.person)
            {
                case "third":
                    if(params.gender === "male")
                        return KASRA;
                    return SUKUN;
            }
            return KASRA;
        }

        function R3Tashkil(): BASE_TASHKIL
        {
            if(params.numerus === "plural")
            {
                switch(params.person)
                {
                    case "third":
                        return DHAMMA;
                }
            }
            return KASRA;
        }

        return { r1: R1Tashkil(), r2: R2Tashkil(), r3: R3Tashkil() };
    }

    private DeriveRootTashkilPresent(params: ConjugationParams): { r1: BASE_TASHKIL; r2: BASE_TASHKIL; r3: BASE_TASHKIL; }
    {
        if( (params.numerus === "plural") && (params.person !== "first") )
            return { r1: SUKUN, r2: DHAMMA, r3: DHAMMA };
    
        return { r1: SUKUN, r2: KASRA, r3: KASRA };
    }

    private DeriveSuffix(params: ConjugationParams): _LegacyVerbVocalized[]
    {
        if(params.tense === "present")
            return this.DeriveSuffixPresent(params);

        if(params.numerus === "plural")
        {
            switch(params.person)
            {
                case "first":
                    return [
                        {
                            letter: NUN,
                            shadda: false,
                            tashkil: FATHA
                        },
                        {
                            letter: ALEF,
                            shadda: false,
                            tashkil: FATHA
                        }
                    ];

                case "second":
                    return [
                        {
                            letter: TA,
                            shadda: false,
                            tashkil: DHAMMA
                        },
                        {
                            letter: WAW,
                            shadda: false,
                            tashkil: DHAMMA
                        },
                        {
                            letter: ALEF,
                            shadda: false,
                            tashkil: FATHA
                        }
                    ];

                case "third":
                    return [
                        {
                            letter: WAW,
                            shadda: false,
                            tashkil: DHAMMA
                        },
                        {
                            letter: ALEF,
                            shadda: false,
                            tashkil: FATHA
                        }
                    ];
            }
        }

        switch(params.person)
        {
            case "first":
                return [
                    {
                        letter: TA,
                        shadda: false,
                        tashkil: SUKUN
                    }
                ];
                    
            case "second":
                if(params.gender === "male")
                    return [
                        {
                            letter: TA,
                            shadda: false,
                            tashkil: SUKUN
                        }
                    ];

                return [
                    {
                        letter: TA,
                        shadda: false,
                        tashkil: KASRA
                    },
                    {
                        letter: Letter.Ya,
                        shadda: false,
                        tashkil: KASRA
                    }
                ];
                
            case "third":
                if(params.gender === "male")
                    return [];

                return [
                    {
                        letter: TA,
                        shadda: false,
                        tashkil: SUKUN
                    }
                ];
        }
    }

    private DeriveSuffixPresent(params: ConjugationParams): _LegacyVerbVocalized[]
    {
        if(params.numerus === "plural")
        {
            switch(params.person)
            {
                case "second":
                case "third":
                    return [
                        {
                            letter: WAW,
                            shadda: false,
                            tashkil: DHAMMA
                        },
                        {
                            letter: ALEF,
                            shadda: false,
                            tashkil: FATHA
                        }
                    ];
            }
        }

        return [];
    }
}