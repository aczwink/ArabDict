/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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
import { CreateVerb, Stem1Context } from "../../CreateVerb";
import { WAW, A3EIN, LAM, FA, QAF, DHAMMA, BASE_TASHKIL, SUKUN, FATHA, KASRA, ALEF, MIM, ALEF_HAMZA, YA } from "../../Definitions";
import { ConjugationParams, DialectConjugator } from "../../DialectConjugator";
import { Hamzate } from "../../Hamza";
import { RootType, VerbRoot } from "../../VerbRoot";
import { NUN, SIIN, TA, Tense, VerbalNoun, Voice } from "../../VerbStem";
import { ParseVocalizedText, Vocalized } from "../../Vocalization";
import { DialectDefinition, StemTenseVoiceDefinition } from "../Definitions";
import { AugmentedRoot } from "./AugmentedRoot";
import { RootAugmentor } from "./RootAugmentor";
import { definition as msaDef } from "./dialectDefinition";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams): Vocalized[]
    {
        const augmentedRoot = new RootAugmentor().AugmentAndTashkilizeRoot(root, params);
        if(augmentedRoot !== undefined)
        {
            const suffix = this.DeriveSuffix(params);
            augmentedRoot.ApplyTashkil(root.radicalsAsSeparateLetters.length, suffix.preSuffixTashkil);

            if(root.type === RootType.SecondConsonantDoubled)
                this.GeminateDoubledConsonant(augmentedRoot, params);

            augmentedRoot.ApplyRootLetters();
            return this.DerivePrefix(augmentedRoot.vocalized[0].tashkil!, params).concat(augmentedRoot.vocalized, suffix.suffix);
        }

        return this.ConjugateLegacy(root, params);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): string
    {
        switch(stem)
        {
            case 4:
                switch(root.type)
                {
                    case RootType.Sound:
                        if(voice === "active")
                        {
                            return Hamzate([
                                { letter: MIM, shadda: false, tashkil: DHAMMA },
                                { letter: root.r1, shadda: false, tashkil: SUKUN },
                                { letter: root.r2, shadda: false, tashkil: KASRA },
                                { letter: root.r3, shadda: false },
                            ]);
                        }
                }
                return "TODO";
            case 6:
            case 7:
            case 10:
                return "TODO";
        }

        const dialectDef = this.GetDialectDefiniton();

        const rules = dialectDef.stems[stem]?.participleRules[root.type];
        if(rules !== undefined)
        {
            const rule = rules.find(r => (r.voice === voice) && (r.condition ? r.condition(stem1Context!) : true) );
            if(rule !== undefined)
                return Hamzate(this.ApplyRootConjugationPattern(root.radicalsAsSeparateLetters, root.type, rule.conjugation));
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem, { middleRadicalTashkil: "", middleRadicalTashkilPresent: "", soundOverride: false }); //stem1 ctx is not needed for participle
        return verb.ConjugateParticiple(voice);
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): VerbalNoun[]
    {
        switch(stem)
        {
            case 6:
            case 7:
                return [
                    {
                        id: 0,
                        text: "TODO"
                    }
                ];
            case 10:
                switch(root.type)
                {
                    case RootType.SecondConsonantDoubled:
                        return [
                            {
                                id: 1,
                                text: Hamzate([
                                    { letter: ALEF, shadda: false, tashkil: KASRA },
                                    { letter: SIIN, shadda: false, tashkil: SUKUN },
                                    { letter: TA, shadda: false, tashkil: KASRA },
                                    { letter: root.r1, shadda: false, tashkil: SUKUN },
                                    { letter: root.r2, shadda: false, },
                                    { letter: ALEF, shadda: false, },
                                    { letter: root.r2, shadda: false, },
                                ])
                            }
                        ];
                }

                return [
                    {
                        id: 0,
                        text: "TODO"
                    }
                ];
        }

        const dialectDef = this.GetDialectDefiniton();

        const rules = dialectDef.stems[stem]?.verbalNounRules[root.type];
        if(rules !== undefined)
        {
            return rules.map(r => ({
                id: r.id,
                text: Hamzate(this.ApplyRootConjugationPattern(root.radicalsAsSeparateLetters, root.type, r.text))
                })
            );
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem, { middleRadicalTashkil: "", middleRadicalTashkilPresent: "", soundOverride: false }); //stem1 ctx is not needed for verbal nouns
        return verb.GenerateAllPossibleVerbalNouns();
    }

    //Private methods
    private DerivePrefix(prevTashkil: BASE_TASHKIL, params: ConjugationParams): Vocalized[]
    {
        if(params.tense === "perfect")
            return [];

        if(params.mood === "imperative")
        {
            if(params.stem === 4)
                return [{ letter: ALEF_HAMZA, shadda: false, tashkil: FATHA}];

            if(prevTashkil === SUKUN)
            {
                //insert hamzat al wasl
                return [{ letter: ALEF, shadda: false, tashkil: (params.stem1Context?.middleRadicalTashkilPresent === DHAMMA) ? DHAMMA : KASRA}];
            }
            return [];
        }

        const tashkil = this.DerivePrefixTashkil(params);
        switch(params.person)
        {
            case "first":
            {
                switch(params.numerus)
                {
                    case "singular":
                        return [{ letter: ALEF_HAMZA, shadda: false, tashkil }];
                    case "plural":
                        return [{ letter: NUN, shadda: false, tashkil }];
                }
            }
            case "second":
                return [{ letter: TA, shadda: false, tashkil }];
            case "third":
                switch(params.gender)
                {
                    case "male":
                        return [{ letter: YA, shadda: false, tashkil }];
                    case "female":
                        return [{ letter: TA, shadda: false, tashkil }];
                }
        }
    }

    private DerivePrefixTashkil(params: ConjugationParams)
    {
        switch(params.stem)
        {
            case 1:
            case 5:
            case 6:
            case 7:
            case 8:
            case 10:
                return (params.voice === "active") ? FATHA : DHAMMA;
            case 2:
            case 3:
            case 4:
                return DHAMMA;
        }
    }

    private DeriveSuffix(params: ConjugationParams): { suffix: Vocalized[]; preSuffixTashkil: BASE_TASHKIL}
    {
        if(params.tense === "perfect")
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
                                    { letter: ALEF, shadda: false },
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
                                            { letter: ALEF, shadda: false },
                                        ],
                                    };
                                case "female":
                                    return {
                                        preSuffixTashkil: FATHA,
                                        suffix: [
                                            { letter: TA, shadda: false, tashkil: FATHA },
                                            { letter: ALEF, shadda: false },
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
                                    { letter: ALEF, shadda: false },
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
                                            { letter: WAW, shadda: false },
                                            { letter: ALEF, shadda: false },
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
        else
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
                                    { letter: YA, shadda: false },
                                ]
                            };
                        }
                        return {
                            preSuffixTashkil: KASRA,
                            suffix: [
                                { letter: YA, shadda: false },
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
                                { letter: ALEF, shadda: false },
                            ]
                        };
                    }

                    return {
                        preSuffixTashkil: FATHA,
                        suffix: [
                            { letter: ALEF, shadda: false },
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
                                    { letter: WAW, shadda: false },
                                    { letter: ALEF, shadda: false }
                                ]
                            };
                        }
                        return {
                            preSuffixTashkil: DHAMMA,
                            suffix: [
                                { letter: WAW, shadda: false },
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
    }

    //Legacy private methods    
    private ApplyRootConjugationPattern(rootRadicals: string[], rootType: RootType, conjugation: string)
    {
        const patternRadicals = this.GetPatternRadicals(rootType);

        const letters = ParseVocalizedText(conjugation);

        const replaced = letters.map(x => {
            const idx = patternRadicals.indexOf(x.letter);
            if(idx === -1)
                return x;
            return {
                letter: rootRadicals[idx],
                tashkil: x.tashkil,
                shadda: x.shadda
            }
        });
        return replaced;
    }

    private ConjugateLegacy(root: VerbRoot, params: ConjugationParams): Vocalized[]
    {
        const dialectDef = this.GetDialectDefiniton();
        const rootType = params.stem1Context?.soundOverride ? RootType.Sound : root.type;
        const ruleSet = this.ExtractRuleSet(dialectDef, params.stem, params.tense, params.voice, rootType);
        if(ruleSet !== undefined)
        {
            const rules = ruleSet.rules;
            const rule = rules.find(r => (r.gender === params.gender) && (r.numerus === params.numerus) && (r.person === params.person) && (r.condition ? r.condition(root, params.stem1Context!) : true) );
            if(rule !== undefined)
                return this.ApplyRootConjugationPattern(root.radicalsAsSeparateLetters, rootType, rule.conjugation);
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), params.stem, params.stem1Context);
        const x = verb.Conjugate(params.tense, params.voice, params.gender, params.person, params.numerus);
        return ParseVocalizedText(x);
    }

    private ExtractRuleSet(dialectDef: DialectDefinition, stem: number, tense: Tense, voice: Voice, rootType: RootType)
    {
        const stemData = dialectDef.stems[stem];
        if(stemData === undefined)
            return undefined;
        const tenseData = stemData[tense];
        if(tenseData === undefined)
            return undefined;
        if("active" in tenseData)
        {
            const voiceData = tenseData[voice];
            if(voiceData === undefined)
                return undefined;
            return voiceData[rootType];
        }
        if(voice !== "active")
            throw new Error("Imperative can only be active");
        return (tenseData as StemTenseVoiceDefinition)[rootType];
    }

    private GeminateDoubledConsonant(augmentedRoot: AugmentedRoot, params: ConjugationParams)
    {
        if(augmentedRoot.r3.tashkil !== SUKUN)
        {
            const cond = ((params.tense === "perfect") && (params.voice === "active")) || (((params.tense === "present") && (params.voice === "passive")));
            augmentedRoot.r1.tashkil = cond ? FATHA : KASRA; //two sukuns after each other are forbidden
            augmentedRoot.r3.shadda = true;
            augmentedRoot.vocalized.Remove(augmentedRoot.vocalized.length - 2); //assimilate r2
        }
    }
    
    private GetDialectDefiniton()
    {
        return msaDef;
    }

    private GetPatternRadicals(type: RootType)
    {
        switch(type)
        {
            case RootType.Assimilated:
                return [WAW, A3EIN, LAM];
            case RootType.Defective:
                return [FA, A3EIN];
            case RootType.Hollow:
                return [FA, A3EIN, LAM];
            case RootType.Quadriliteral:
                return [FA, A3EIN, LAM, QAF];
            case RootType.Sound:
                return [FA, A3EIN, LAM];
            case RootType.SecondConsonantDoubled:
                return [FA, LAM];
            case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                return [FA, A3EIN];
        }
        throw new Error("Method not implemented.");
    }
}