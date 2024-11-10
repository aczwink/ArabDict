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
import { Hamzate } from "./Hamza";
import { VerbRoot } from "./VerbRoot";
import { DialectConjugator, NounInput, TargetNounDerivation } from "./DialectConjugator";
import { MSAConjugator } from "./rule_sets/msa/MSAConjugator";
import { ConjugationVocalized, DisplayVocalized, ParseVocalizedText } from "./Vocalization";
import { ConjugationParams, Stem1Context, Tashkil, Tense, Voice, Mood, Person, AdjectiveDeclensionParams, NounDeclensionParams, Gender, StemNumber } from "./Definitions";
import { LebaneseConjugator } from "./rule_sets/lebanese/LebaneseConjugator";

export enum DialectType
{
    ModernStandardArabic,
    Lebanese
}

export interface VerbReverseConjugationResult
{
    root: VerbRoot;
    params: ConjugationParams;
    score: number;
}

export class Conjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams, dialect: DialectType)
    {
        if( (params.tense === Tense.Present) && (params.mood === Mood.Imperative) )
        {
            if(params.voice === Voice.Passive)
                throw new Error("imperative and passive does not exist");
            if(params.person !== Person.Second)
                throw new Error("imperative does only exist for second person");
        }

        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const pattern = dialectConjugator.Conjugate(root, params);

        return this.ExecuteWordTransformationPipeline(pattern);
    }

    public ConjugateParticiple(dialect: DialectType, root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): DisplayVocalized[]
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const pattern = dialectConjugator.ConjugateParticiple(root, stem, voice, stem1Context);

        return this.ExecuteWordTransformationPipeline(pattern);
    }

    public DeclineAdjective(word: string, params: AdjectiveDeclensionParams, dialect: DialectType)
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);

        const parsed = ParseVocalizedText(word);
        return dialectConjugator.DeclineAdjective(parsed, params);
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams, dialect: DialectType)
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);

        return dialectConjugator.DeclineNoun(inputNoun, params);
    }

    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation, dialect: DialectType): DisplayVocalized[]
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);

        return dialectConjugator.DeriveSoundNoun(singular, singularGender, target);
    }

    public GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: StemNumber): DisplayVocalized[][]
    {
        const dialectConjugator = new MSAConjugator;
        const patterns = dialectConjugator.GenerateAllPossibleVerbalNouns(root, stem);

        return patterns.map(x => {
            if(typeof x === "string")
                return ParseVocalizedText(x);
            return this.ExecuteWordTransformationPipeline(x);
        });
    }

    //Private methods
    private CreateDialectConjugator(dialect: DialectType): DialectConjugator
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return new MSAConjugator;
            case DialectType.Lebanese:
                return new LebaneseConjugator;
        }
    }

    private ExecuteWordTransformationPipeline(pattern: ConjugationVocalized[])
    {
        const hamzated = Hamzate(pattern);

        return this.ToDisplayVocalized(hamzated);
    }

    private ToDisplayVocalized(vocalized: ConjugationVocalized[])
    {
        const result: DisplayVocalized[] = [];
        for(let i = 0; i < vocalized.length; i++)
        {
            const v = vocalized[i];
            const next: (ConjugationVocalized | undefined) = vocalized[i + 1];

            const shadda = (v.letter === next?.letter) && (v.tashkil === Tashkil.Sukun);
            const tashkil = shadda ? next.tashkil : v.tashkil;
            result.push({
                emphasis: (v.emphasis === true) || (shadda && (next.emphasis === true)),
                letter: v.letter,
                shadda,
                tashkil: (typeof tashkil === "string") ? tashkil : undefined
            });

            if(shadda)
                i++;
        }

        return result;
    }
}
