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
import { _LegacyCreateVerb } from "./_legacy/CreateVerb";
import { A3EIN, LAM, FA, QAF, Letter, Stem1Context, ConjugationParams, _LegacyTense, _LegacyVoice } from "../../Definitions";
import { DialectConjugator, ReverseConjugationResult } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ParseVocalizedText, _LegacyPartiallyVocalized, FullyVocalized } from "../../Vocalization";
import { DialectDefinition, StemTenseVoiceDefinition } from "../Definitions";
import { AugmentedRoot } from "./AugmentedRoot";
import { _Legacydefinition as msaDef } from "./dialectDefinition";
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
import { AlterSpeciallyIrregularDefective, IsSpeciallyIrregularDefective } from "./conjugation/defective_special_cases";
import { GenerateParticipleStem5 } from "./participle/stem5";
import { GenerateParticipleStem3 } from "./participle/stem3";
import { GenerateAllPossibleVerbalNounsStem3 } from "./verbal_nouns/stem3";
import { GenerateAllPossibleVerbalNounsStem4 } from "./verbal_nouns/stem4";
import { GenerateAllPossibleVerbalNounsStem6 } from "./verbal_nouns/stem6";
import { GenerateAllPossibleVerbalNounsStem2 } from "./verbal_nouns/stem2";
import { GenerateParticipleStem10 } from "./participle/stem10";
import { ReverseConjugate } from "./reverse/conjugate";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator
{
    //Public methods
    public AnalyzeConjugation(conjugated: _LegacyPartiallyVocalized[]): ReverseConjugationResult[]
    {
        return ReverseConjugate(conjugated);
    }

    public Conjugate(root: VerbRoot, params: ConjugationParams): (_LegacyPartiallyVocalized | FullyVocalized)[]
    {
        const maybeAugmentedRoot = AugmentRoot(params.stem, root.type, params);
        if(maybeAugmentedRoot !== undefined)
        {
            const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, root);

            ApplyRootTashkil(augmentedRoot, params);

            const suffix = DeriveSuffix(params);
            augmentedRoot.ApplyRadicalTashkil(root.radicalsAsSeparateLetters.length as any, suffix.preSuffixTashkil);

            const rootType = params._legacyStem1Context?.soundOverride ? RootType.Sound : root.type;
            switch(rootType)
            {
                case RootType.Assimilated:
                    DropOutR1(augmentedRoot, params);
                break;
                case RootType.Defective:
                    if(IsSpeciallyIrregularDefective(root, params.stem))
                        AlterSpeciallyIrregularDefective(root, augmentedRoot, params);
                    else
                    {
                        AlterDefectiveSuffix(params, suffix.suffix);
                        AlterDefectiveEnding(augmentedRoot, params);
                    }
                break;
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                    if(params.stem === 1)
                        DropOutR1(augmentedRoot, params);
                    AlterDefectiveSuffix(params, suffix.suffix);
                    AlterDefectiveEnding(augmentedRoot, params);
                break;
                case RootType.Hollow:
                    ShortenOrAlefizeR2(augmentedRoot, params);
                break;
                case RootType.SecondConsonantDoubled:
                    GeminateDoubledConsonant(augmentedRoot, params);
                break;
            }

            if(params.stem === 8)
                Stem8AssimilateTaVerb(augmentedRoot, params._legacyTense);
            return DerivePrefix(augmentedRoot.symbols[0].tashkil as any, root.type, params).concat(augmentedRoot.symbols, suffix.suffix);
        }

        return this._LegacyConjugate(root, params);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: _LegacyVoice, stem1Context?: Stem1Context): (_LegacyPartiallyVocalized | FullyVocalized)[]
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
        return [{letter: "TODO ConjugateParticiple", shadda: false}];
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
                return [GenerateAllPossibleVerbalNounsStem5(root)];
            case 6:
                return [GenerateAllPossibleVerbalNounsStem6(root)];
            case 8:
                return [GenerateAllPossibleVerbalNounsStem8(root)];
            case 10:
                return [GenerateAllPossibleVerbalNounsStem10(root)];
        }

        return ["TODO GenerateAllPossibleVerbalNouns"];
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

    //TODO: REMOVE WHOLE METHOD
    private _LegacyConjugate(root: VerbRoot, params: ConjugationParams): _LegacyPartiallyVocalized[]
    {
        const dialectDef = this._LegacyGetDialectDefiniton();
        const rootType = params._legacyStem1Context?.soundOverride ? RootType.Sound : root.type;
        const ruleSet = this.ExtractRuleSet(dialectDef, params.stem, params._legacyTense, params._legacyVoice, rootType);
        if(ruleSet !== undefined)
        {
            const rules = ruleSet.rules;
            const rule = rules.find(r => (r.gender === params._legacyGender) && (r.numerus === params._legacyNumerus) && (r.person === params._legacyPerson) && (r.condition ? r.condition(root, params._legacyStem1Context!) : true) );
            if(rule !== undefined)
                return this.ApplyRootConjugationPattern(root.radicalsAsSeparateLetters, rootType, rule.conjugation);
        }

        //call legacy api
        const verb = _LegacyCreateVerb(root.radicalsAsSeparateLetters.join(""), params.stem);
        const x = verb.Conjugate(params._legacyTense, params._legacyVoice, params._legacyGender, params._legacyPerson, params._legacyNumerus);
        return ParseVocalizedText(x);
    }

    private ExtractRuleSet(dialectDef: DialectDefinition, stem: number, tense: _LegacyTense, voice: _LegacyVoice, rootType: RootType)
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
    
    private _LegacyGetDialectDefiniton()
    {
        return msaDef;
    }

    private GetPatternRadicals(type: RootType)
    {
        switch(type)
        {
            case RootType.Assimilated:
                return [Letter.Waw, A3EIN, LAM];
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