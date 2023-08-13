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
import { CreateVerb, Stem1Context } from "./_legacy/CreateVerb";
import { WAW, A3EIN, LAM, FA, QAF, DHAMMA, SUKUN, FATHA, KASRA, ALEF, MIM, YA, KASRATAN, ALEF_HAMZA, YA_HAMZA, TA_MARBUTA, SHADDA } from "../../Definitions";
import { ConjugationParams, DialectConjugator } from "../../DialectConjugator";
import { Hamzate } from "../../Hamza";
import { RootType, VerbRoot } from "../../VerbRoot";
import { SIIN, TA, Tense, VerbalNoun, Voice } from "./_legacy/VerbStem";
import { ParseVocalizedText, Vocalized } from "../../Vocalization";
import { DialectDefinition, StemTenseVoiceDefinition } from "../Definitions";
import { AugmentedRoot } from "./AugmentedRoot";
import { definition as msaDef } from "./dialectDefinition";
import { DeriveSuffix } from "./conjugation/suffix";
import { DerivePrefix } from "./conjugation/prefix";
import { AugmentRoot } from "./conjugation/rootAugmentation";
import { ApplyRootAugmentationTashkil, DeriveRootTashkil } from "./conjugation/rootTashkil";
import { ShortenOrAlefizeR2 } from "./conjugation/hollow";
import { GeminateDoubledConsonant } from "./conjugation/doubled";
import { AlterDefectiveEnding } from "./conjugation/defective";
import { DropOutR1 } from "./conjugation/assimilated";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams): Vocalized[]
    {
        const maybeAugmentedRoot = AugmentRoot(params.stem, root.type, params);
        if(maybeAugmentedRoot !== undefined)
        {
            const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, root);

            const tashkil = DeriveRootTashkil(params);
            augmentedRoot.ApplyTashkil(1, tashkil.r1);
            augmentedRoot.ApplyTashkil(2, tashkil.r2);

            ApplyRootAugmentationTashkil(augmentedRoot.vocalized, params);

            const suffix = DeriveSuffix(params);
            augmentedRoot.ApplyTashkil(root.radicalsAsSeparateLetters.length, suffix.preSuffixTashkil);

            const rootType = params.stem1Context?.soundOverride ? RootType.Sound : root.type;
            switch(rootType)
            {
                case RootType.Assimilated:
                    DropOutR1(augmentedRoot, params);
                break;
                case RootType.Defective:
                    AlterDefectiveEnding(augmentedRoot, params);
                break;
                case RootType.Hollow:
                    ShortenOrAlefizeR2(augmentedRoot, params);
                break;
                case RootType.SecondConsonantDoubled:
                    GeminateDoubledConsonant(augmentedRoot, params);
                break;
            }

            augmentedRoot.ApplyRootLetters();
            return DerivePrefix(augmentedRoot.vocalized[0].tashkil!, params).concat(augmentedRoot.vocalized, suffix.suffix);
        }

        return this.ConjugateLegacy(root, params);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): string
    {
        switch(stem)
        {
            case 1:
                switch(root.type)
                {
                    case RootType.Defective:
                    case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                        if(voice === "active")
                        {
                            return Hamzate([
                                { letter: root.r1, shadda: false, tashkil: FATHA },
                                { letter: ALEF, shadda: false },
                                { letter: root.r2, shadda: false, tashkil: KASRATAN as any },
                            ]);
                        }
                        return Hamzate([
                            { letter: MIM, shadda: false, tashkil: FATHA },
                            { letter: root.r1, shadda: false, tashkil: SUKUN },
                            { letter: root.r2, shadda: false, tashkil: (stem1Context?.middleRadicalTashkilPresent === DHAMMA) ? DHAMMA : KASRA },
                            { letter: (stem1Context?.middleRadicalTashkilPresent === DHAMMA) ? WAW : YA, shadda: true },
                        ]);
                    case RootType.Hollow:
                        if(voice === "active")
                        {
                            return Hamzate([
                                { letter: root.r1, shadda: false, tashkil: FATHA },
                                { letter: ALEF, shadda: false },
                                { letter: YA_HAMZA, shadda: false, tashkil: KASRA },
                                { letter: root.r3, shadda: false },
                            ]);
                        }
                        return Hamzate([
                            { letter: MIM, shadda: false, tashkil: FATHA },
                            { letter: root.r1, shadda: false, tashkil: (stem1Context?.middleRadicalTashkil === KASRA) ? KASRA : DHAMMA },
                            { letter: (stem1Context?.middleRadicalTashkil === KASRA) ? YA : WAW, shadda: false },
                            { letter: root.r3, shadda: false },
                        ]);
                    case RootType.SecondConsonantDoubled:
                        return "TODO";
                    case RootType.Sound:
                        if(voice === "active")
                            return root.r1 + FATHA + ALEF + root.r2 + KASRA + root.r3;
                        return MIM + FATHA + root.r1 + SUKUN + root.r2 + DHAMMA + WAW + root.r3;
                }
                break;
            case 2:
                switch(root.type)
                {
                    case RootType.HamzaOnR1:
                        return "TODO";
                    case RootType.Sound:
                        return Hamzate([
                            { letter: MIM, shadda: false, tashkil: DHAMMA },
                            { letter: root.r1, shadda: false, tashkil: FATHA },
                            { letter: root.r2, shadda: true, tashkil: (voice === "active") ? KASRA : FATHA },
                            { letter: root.r3, shadda: false },
                        ]);
                }
                break;
            case 4:
                switch(root.type)
                {
                    case RootType.Hollow:
                        if(voice === "active")
                        {
                            return Hamzate([
                                { letter: MIM, shadda: false, tashkil: DHAMMA },
                                { letter: root.r1, shadda: false, tashkil: KASRA },
                                { letter: YA, shadda: false },
                                { letter: root.r3, shadda: false },
                            ]);
                        }
                        return Hamzate([
                            { letter: MIM, shadda: false, tashkil: DHAMMA },
                            { letter: root.r1, shadda: false, tashkil: FATHA },
                            { letter: ALEF, shadda: false },
                            { letter: root.r3, shadda: false },
                        ]);

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
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem);
        return verb.ConjugateParticiple(voice);
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): VerbalNoun[]
    {
        switch(stem)
        {
            case 1:
                switch(root.type)
                {
                    case RootType.Defective:
                        return [
                            {
                                id: 1,
                                text: root.r1 + KASRA + root.r2 + FATHA + ALEF + YA + FATHA + TA_MARBUTA
                            },
                            {
                                id: 0,
                                text: "TODO"
                            }
                        ];
                    case RootType.HamzaOnR1:
                        return [
                            {
                                id: 1,
                                text: ALEF_HAMZA + FATHA + root.r2 + FATHA + ALEF + root.r3
                            },
                            {
                                id: 0,
                                text: "TODO"
                            }
                        ];
                    case RootType.Hollow:
                        return [
                            {
                                id: 2,
                                text: root.r1 + FATHA + WAW + SUKUN + root.r3,
                            },
                            {
                                id: 1,
                                text: MIM + FATHA + root.r1 + FATHA + ALEF + root.r3
                            }
                        ];
                    case RootType.SecondConsonantDoubled:
                        return [
                            {
                                id: 2,
                                text: root.r1 + KASRA + root.r2 + SHADDA,
                            },
                            {
                                id: 1,
                                text: root.r1 + FATHA + root.r2 + KASRA + YA + root.r3
                            }
                        ];
                    case RootType.Sound:
                        return [
                            {
                                id: 1,
                                text: root.r1 + FATHA + root.r2 + FATHA + root.r3
                            },
                            {
                                id: 0,
                                text: "TODO"
                            }
                        ];
                }
                break;
            case 2:
                switch(root.type)
                {
                    case RootType.HamzaOnR1:
                    case RootType.Sound:
                        return [
                            {
                                id: 0,
                                text: "TODO"
                            }
                        ];
                }
                break;
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
                            },
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
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem);
        return verb.GenerateAllPossibleVerbalNouns();
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
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), params.stem);
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