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
import { Letter, Stem1Context, ConjugationParams, Gender, Numerus, Person, AdvancedStemNumber, Tense, Voice, Tashkil, VoiceString, AdjectiveDeclensionParams, NounDeclensionParams, NounState } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ParseVocalizedText, ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
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
import { DeclineAdjectiveInSuffix } from "./adjectives/decline_in";
import { DeclineAdjectiveTriptoteSuffix } from "./adjectives/decline_triptote";
import { IsSunLetter } from "../../Util";
import { DeclineNounTriptoteSuffix } from "./nouns/triptote";
import { WithTashkilOnLast } from "./adjectives/shared";
import { GenerateParticipleStem6 } from "./participle/stem6";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[]
    {
        const result = this.ProcessConjugationPipeline(root, params);
        if(result === undefined)
            return this._LegacyConjugate(root, params);
        return DerivePrefix(result.augmentedRoot.symbols[0].tashkil as any, root.type, params).concat(result.augmentedRoot.symbols, result.suffix.suffix);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: VoiceString, stem1Context?: Stem1Context): ConjugationVocalized[]
    {
        const voiceNew = voice === "active" ? Voice.Active : Voice.Passive;
        switch(stem)
        {
            case 1:
                return GenerateParticipleStem1(root, voice, stem1Context!);
            case 2:
                return GenerateParticipleStem2(this.ConjugateBasicForm(root, stem), voiceNew);
            case 3:
                return GenerateParticipleStem3(root, voice);
            case 4:
                return GenerateParticipleStem4(root, voice);
            case 5:
                return GenerateParticipleStem5(root, this.ConjugateBasicForm(root, stem), voiceNew);
            case 6:
                return GenerateParticipleStem6(root, this.ConjugateBasicForm(root, stem), voiceNew);
            case 8:
                return GenerateParticipleStem8(root, this.ConjugateBasicForm(root, stem), voiceNew);
            case 10:
                return GenerateParticipleStem10(root, voice);
        }
        return [{letter: "TODO ConjugateParticiple" as any, tashkil: Tashkil.Dhamma}];
    }

    public DeclineAdjective(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[]
    {
        function inner()
        {
            if(vocalized[vocalized.length - 1].tashkil === Tashkil.Kasratan)
                return DeclineAdjectiveInSuffix(vocalized, params);
            return DeclineAdjectiveTriptoteSuffix(vocalized, params);
        }

        return this.ConditionallyAddArticle(params.definite, inner());
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
    {
        function inner()
        {
            return DeclineNounTriptoteSuffix(inputNoun, params);
        }

        return this.ConditionallyAddArticle(params.state === NounState.Definite, inner());
    }
    
    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        switch(target)
        {
            case TargetNounDerivation.DeriveFeminineSingular:
                return [
                    ...singular,
                    { emphasis: false, letter: Letter.TaMarbuta, shadda: false }
                ];

            case TargetNounDerivation.DeriveDualSameGender:
            {
                const fixedEnding = WithTashkilOnLast(singular, Tashkil.Fatha).concat([
                    { emphasis: false, letter: Letter.Ya, shadda: false, tashkil: Tashkil.Sukun },
                    { emphasis: false, letter: Letter.Nun, shadda: false },
                ]);

                if(singularGender === Gender.Female)
                {
                    fixedEnding[fixedEnding.length - 4].tashkil = Tashkil.Fatha;
                    fixedEnding[fixedEnding.length - 3].letter = Letter.Ta;
                }
                return fixedEnding;
            }
                
            case TargetNounDerivation.DerivePluralSameGender:
            {
                if(singularGender === Gender.Female)
                {
                    return singular.slice(0, singular.length - 1).concat([
                        { emphasis: false, letter: Letter.Alef, shadda: false },
                        { emphasis: false, letter: Letter.Ta, shadda: false },
                    ]);
                }

                return WithTashkilOnLast(singular, Tashkil.Kasra).concat([
                    { emphasis: false, letter: Letter.Ya, shadda: false },
                    { emphasis: false, letter: Letter.Nun, shadda: false },
                ]);
            }
        }
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): (string | ConjugationVocalized[])[]
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

    //Private methods

    private ConditionallyAddArticle(isDefinite: boolean, vocalized: DisplayVocalized[]): DisplayVocalized[]
    {
        if(isDefinite)
        {
            const v = vocalized;
            if(IsSunLetter(v[0].letter))
            {
                return [
                    { emphasis: false, letter: Letter.Alef, shadda: false },
                    { emphasis: false, letter: Letter.Lam, shadda: false },
                    { ...v[0], shadda: true },
                    ...v.slice(1),
                ];
            }
            return [
                { emphasis: false, letter: Letter.Alef, shadda: false },
                { emphasis: false, letter: Letter.Lam, shadda: false, tashkil: Tashkil.Sukun},
                ...v
            ];
        }
        return vocalized;
    }

    private ConjugateBasicForm(root: VerbRoot, stem: AdvancedStemNumber)
    {
        return this.ProcessConjugationPipeline(root, {
            gender: Gender.Male,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem,
            tense: Tense.Perfect,
            voice: Voice.Active,
        })!.augmentedRoot;
    }

    private ProcessConjugationPipeline(root: VerbRoot, params: ConjugationParams)
    {
        const maybeAugmentedRoot = AugmentRoot(params.stem, root, params);
        if(maybeAugmentedRoot === undefined)
            return undefined;
        
        const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, root);

        ApplyRootTashkil(augmentedRoot, params);

        const suffix = DeriveSuffix(params);
        augmentedRoot.ApplyRadicalTashkil(root.radicalsAsSeparateLetters.length as any, suffix.preSuffixTashkil);

        const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
        const rootType = stem1ctx?.soundOverride ? RootType.Sound : root.type;
        switch(rootType)
        {
            case RootType.Assimilated:
                DropOutR1(augmentedRoot, params);
            break;
            case RootType.Defective:
                if(IsSpeciallyIrregularDefective(root, params.stem))
                    AlterSpeciallyIrregularDefective(root, augmentedRoot, suffix.suffix, params);
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
            Stem8AssimilateTaVerb(augmentedRoot, params.tense);
        return {
            augmentedRoot,
            suffix
        };
    }














    //TODO: REMOVE WHOLE METHODs
    private _LegacyExtractRuleSet(dialectDef: DialectDefinition, stem: number, tense: Tense, voice: VoiceString, rootType: RootType)
    {
        const stemData = dialectDef.stems[stem];
        if(stemData === undefined)
            return undefined;
        const tenseData = (tense === Tense.Perfect) ? stemData.perfect : stemData.present;
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
    
    private _LegacyApplyRootConjugationPattern(rootRadicals: string[], rootType: RootType, conjugation: string)
    {
        const patternRadicals = this._LegacyGetPatternRadicals(rootType);

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

    private _LegacyGetPatternRadicals(type: RootType)
    {
        switch(type)
        {
            case RootType.Assimilated:
                return [Letter.Waw, Letter.A3ein, Letter.Lam];
            case RootType.Defective:
                return [Letter.Fa, Letter.A3ein];
            case RootType.Hollow:
                return [Letter.Fa, Letter.A3ein, Letter.Lam];
            case RootType.Quadriliteral:
                return [Letter.Fa, Letter.A3ein, Letter.Lam, Letter.Qaf];
            case RootType.Sound:
                return [Letter.Fa, Letter.A3ein, Letter.Lam];
            case RootType.SecondConsonantDoubled:
                return [Letter.Fa, Letter.Lam];
            case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                return [Letter.Fa, Letter.A3ein];
        }
        throw new Error("Method not implemented.");
    }

    private _LegacyConjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[]
    {
        const dialectDef = msaDef;
        const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
        const rootType = stem1ctx?.soundOverride ? RootType.Sound : root.type;
        const ruleSet = this._LegacyExtractRuleSet(dialectDef, params.stem, params.tense, (params.voice === Voice.Active ? "active" : "passive"), rootType);
        if(ruleSet !== undefined)
        {
            const rules = ruleSet.rules;
            const rule = rules.find(r => (r.gender === params.gender) && (r.numerus === params.numerus) && (r.person === params.person) && (r.condition ? r.condition(root, stem1ctx!) : true) );
            if(rule !== undefined)
                return this._LegacyApplyRootConjugationPattern(root.radicalsAsSeparateLetters, rootType, rule.conjugation) as any;
        }
        return [
            {
                letter: "T" as any,
                tashkil: Tashkil.AlefMaksuraMarker
            },
            {
                letter: "O" as any,
                tashkil: Tashkil.AlefMaksuraMarker
            },
            {
                letter: "D" as any,
                tashkil: Tashkil.AlefMaksuraMarker
            },
            {
                letter: "O" as any,
                tashkil: Tashkil.AlefMaksuraMarker
            }
        ];
    }
}