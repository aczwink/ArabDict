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
import { CreateVerb, Stem1Context } from "./_legacy/CreateVerb";
import { WAW, A3EIN, LAM, FA, QAF, YA, HHA, LETTER_RA, HAMZA } from "../../Definitions";
import { ConjugationParams, DialectConjugator } from "../../DialectConjugator";
import { Hamzate } from "../../Hamza";
import { RootType, VerbRoot } from "../../VerbRoot";
import { Tense, Voice } from "./_legacy/VerbStem";
import { FullyVocalized, ParseVocalizedText, Vocalized } from "../../Vocalization";
import { DialectDefinition, StemTenseVoiceDefinition } from "../Definitions";
import { AugmentedRoot } from "./AugmentedRoot";
import { definition as msaDef } from "./dialectDefinition";
import { DeriveSuffix } from "./conjugation/suffix";
import { DerivePrefix } from "./conjugation/prefix";
import { AugmentRoot } from "./conjugation/rootAugmentation";
import { ShortenOrAlefizeR2 } from "./conjugation/hollow";
import { GeminateDoubledConsonant } from "./conjugation/doubled";
import { AlterDefectiveEnding, AlterDefectiveSuffix } from "./conjugation/defective";
import { DropOutR1 } from "./conjugation/assimilated";
import { ApplyRootTashkil } from "./conjugation/rootTashkil";
import { GenerateAllPossibleVerbalNounsStem1 } from "./verbal_nouns/stem1";
import { Stem8AssimilateTaVerb } from "./conjugation/stem8";
import { GenerateAllPossibleVerbalNounsStem8 } from "./verbal_nouns/stem8";
import { GenerateAllPossibleVerbalNounsStem5 } from "./verbal_nouns/stem5";
import { GenerateParticipleStem4 } from "./participle/stem4";
import { GenerateAllPossibleVerbalNounsStem10 } from "./verbal_nouns/stem10";
import { GenerateParticipleStem2 } from "./participle/stem2";
import { GenerateParticipleStem1 } from "./participle/stem1";
import { GenerateParticipleStem8 } from "./participle/stem8";
import { AlterSpecialCaseHayiya, AlterSpecialCaseRa2a } from "./conjugation/special_cases";
import { GenerateParticipleStem5 } from "./participle/stem5";
import { GenerateParticipleStem3 } from "./participle/stem3";
import { GenerateAllPossibleVerbalNounsStem3 } from "./verbal_nouns/stem3";
import { GenerateAllPossibleVerbalNounsStem4 } from "./verbal_nouns/stem4";
import { GenerateAllPossibleVerbalNounsStem6 } from "./verbal_nouns/stem6";
import { GenerateAllPossibleVerbalNounsStem2 } from "./verbal_nouns/stem2";
import { GenerateParticipleStem10 } from "./participle/stem10";

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

            ApplyRootTashkil(augmentedRoot, params);

            const suffix = DeriveSuffix(params);
            augmentedRoot.ApplyTashkil(root.radicalsAsSeparateLetters.length, suffix.preSuffixTashkil);

            const rootType = params.stem1Context?.soundOverride ? RootType.Sound : root.type;
            switch(rootType)
            {
                case RootType.Assimilated:
                    DropOutR1(augmentedRoot, params);
                break;
                case RootType.Defective:
                    if(root.radicalsAsSeparateLetters.Equals([HHA, YA, WAW]) && (params.stem === 1))
                        AlterSpecialCaseHayiya(augmentedRoot, params);
                    else if(root.radicalsAsSeparateLetters.Equals([LETTER_RA, HAMZA, YA]) && (params.stem === 1))
                        AlterSpecialCaseRa2a(augmentedRoot, params);
                    else
                    {
                        AlterDefectiveSuffix(params, suffix.suffix);
                        AlterDefectiveEnding(augmentedRoot, params);
                    }
                break;
                case RootType.Hollow:
                    ShortenOrAlefizeR2(augmentedRoot, params);
                break;
                case RootType.SecondConsonantDoubled:
                    GeminateDoubledConsonant(augmentedRoot, params);
                break;
            }

            augmentedRoot.ApplyRootLetters();
            if(params.stem === 8)
                Stem8AssimilateTaVerb(augmentedRoot, params.tense);
            return DerivePrefix(augmentedRoot.vocalized[0].tashkil!, root.type, params).concat(augmentedRoot.vocalized, suffix.suffix);
        }

        return this.ConjugateLegacy(root, params);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): Vocalized[] | FullyVocalized[]
    {
        switch(stem)
        {
            case 1:
                return GenerateParticipleStem1(root, voice, stem1Context!);
            case 2:
                return GenerateParticipleStem2(root, voice);
            case 3:
                return GenerateParticipleStem3(root, voice);
            case 4:
                return GenerateParticipleStem4(root, voice);
            case 5:
                return GenerateParticipleStem5(root, voice);
            case 8:
                return GenerateParticipleStem8(root, voice);
            case 10:
                return GenerateParticipleStem10(root, voice);
        }
        return [{letter: "TODO", shadda: false}];
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): (string | FullyVocalized[])[]
    {
        switch(stem)
        {
            case 1:
                return GenerateAllPossibleVerbalNounsStem1(root);
            case 2:
                return [GenerateAllPossibleVerbalNounsStem2(root)];
            case 3:
                return GenerateAllPossibleVerbalNounsStem3(root);
            case 4:
                return [GenerateAllPossibleVerbalNounsStem4(root)];
            case 5:
                return [Hamzate(GenerateAllPossibleVerbalNounsStem5(root))];
            case 6:
                return [GenerateAllPossibleVerbalNounsStem6(root)];
            case 8:
                return [Hamzate(GenerateAllPossibleVerbalNounsStem8(root))];
            case 10:
                return [GenerateAllPossibleVerbalNounsStem10(root)];
        }

        return ["TODO"];
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