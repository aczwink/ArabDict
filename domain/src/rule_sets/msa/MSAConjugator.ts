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
import { Letter, Stem1Context, ConjugationParams, Gender, Numerus, Person, AdvancedStemNumber, Tense, Voice, Tashkil, AdjectiveDeclensionParams, NounDeclensionParams, NounState, StemNumber } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
import { AugmentedRoot } from "./AugmentedRoot";
import { DeriveSuffix } from "./conjugation/suffix";
import { DerivePrefix } from "./conjugation/prefix";
import { AugmentRoot } from "./conjugation/rootAugmentation";
import { ShortenOrAlefizeR2 } from "./conjugation/hollow";
import { GeminateDoubledConsonant } from "./conjugation/doubled";
import { AlterDefectiveEnding, AlterDefectiveSuffix } from "./conjugation/defective";
import { AlterAssimilatedPrefix } from "./conjugation/assimilated";
import { ApplyRootTashkil } from "./conjugation/rootTashkil";
import { GenerateAllPossibleVerbalNounsStem1, HasPotentiallyMultipleVerbalNounFormsStem1 } from "./verbal_nouns/stem1";
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
import { GenerateAllPossibleVerbalNounsStem7 } from "./verbal_nouns/stem7";
import { AlterHamzaOnR1 } from "./conjugation/hamza_on_r1";

//Source is mostly: https://en.wikipedia.org/wiki/Arabic_verbs

export class MSAConjugator implements DialectConjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[]
    {
        const result = this.ProcessConjugationPipeline(root, params);
        return DerivePrefix(result.augmentedRoot.symbols[0].tashkil as any, root.type, params).concat(result.augmentedRoot.symbols, result.suffix.suffix);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): ConjugationVocalized[]
    {
        const voiceOld = voice === Voice.Active ? "active" : "passive";
        switch(stem)
        {
            case 1:
                return GenerateParticipleStem1(root, voiceOld, stem1Context!);
            case 2:
                return GenerateParticipleStem2(this.ConjugateBasicForm(root, stem), voice);
            case 3:
                return GenerateParticipleStem3(root, voiceOld);
            case 4:
                return GenerateParticipleStem4(root, voiceOld);
            case 5:
                return GenerateParticipleStem5(root, this.ConjugateBasicForm(root, stem), voice);
            case 6:
                return GenerateParticipleStem6(root, this.ConjugateBasicForm(root, stem), voice);
            case 8:
                return GenerateParticipleStem8(root, this.ConjugateBasicForm(root, stem), voice);
            case 10:
                return GenerateParticipleStem10(root, voiceOld);
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

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: AdvancedStemNumber | Stem1Context): ConjugationVocalized[][]
    {
        switch(stem)
        {
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
            case 7:
                return [GenerateAllPossibleVerbalNounsStem7(root)];
            case 8:
                return [GenerateAllPossibleVerbalNounsStem8(root)];
            case 10:
                return [GenerateAllPossibleVerbalNounsStem10(root)];
            default:
                return GenerateAllPossibleVerbalNounsStem1(root, stem);
        }
    }

    public HasPotentiallyMultipleVerbalNounForms(root: VerbRoot, stem: AdvancedStemNumber | Stem1Context)
    {
        if(typeof stem === "number")
        {
            if((stem === 3) && (root.type === RootType.Sound))
                return true;
            return false;
        }
        return HasPotentiallyMultipleVerbalNounFormsStem1(root, stem);
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
            throw new Error("TODO: can't form augmented root");
        
        const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, root);

        ApplyRootTashkil(augmentedRoot, params);

        const suffix = DeriveSuffix(params);
        augmentedRoot.ApplyRadicalTashkil(root.radicalsAsSeparateLetters.length as any, suffix.preSuffixTashkil);

        const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
        const rootType = stem1ctx?.soundOverride ? RootType.Sound : root.type;
        switch(rootType)
        {
            case RootType.Assimilated:
                AlterAssimilatedPrefix(augmentedRoot, params);
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
                    AlterAssimilatedPrefix(augmentedRoot, params);
                AlterDefectiveSuffix(params, suffix.suffix);
                AlterDefectiveEnding(augmentedRoot, params);
            break;
            case RootType.HamzaOnR1:
                AlterHamzaOnR1(augmentedRoot, params);
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
}