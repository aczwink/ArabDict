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

import { Stem1Context } from "./CreateVerb";
import { Hamzate } from "./Hamza";
import { VerbRoot } from "./VerbRoot";
import { Voice, VerbalNoun } from "./VerbStem";
import { StemTenseVoiceDefinition } from "./rule_sets/Definitions";
import { ConjugationParams } from "./DialectConjugator";
import { MSAConjugator } from "./rule_sets/msa/MSAConjugator";

export enum DialectType
{
    ModernStandardArabic,
    NorthLevantineArabic
}

export class Conjugator
{
    //Public methods
    public AnalyzeConjugation(dialect: DialectType, conjugated: string)
    {
        /*const dialectDef = this.GetDialectDefiniton(dialect);
        const letters = ParseVocalizedText(conjugated);

        for (const stemNumber in dialectDef.stems)
        {
            if (Object.prototype.hasOwnProperty.call(dialectDef.stems, stemNumber))
            {
                const stem = dialectDef.stems[stemNumber]!;

                this.AnalyzeConjugationInStemTenseVoiceDefinition(stem.imperative);
                this.AnalyzeConjugationInStemTenseVoiceDefinition(stem.perfect?.active);
                this.AnalyzeConjugationInStemTenseVoiceDefinition(stem.perfect?.passive);
                this.AnalyzeConjugationInStemTenseVoiceDefinition(stem.present?.active);
                this.AnalyzeConjugationInStemTenseVoiceDefinition(stem.present?.passive);
            }
        }*/
    }

    public Conjugate(root: VerbRoot, params: ConjugationParams, dialect: DialectType)
    {
        if( (params.mood === "imperative") && (params.voice === "passive") )
            throw new Error("imperative and passive does not exist");
        if( (params.mood === "imperative") && (params.person !== "second") )
            return "";

        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const pattern = dialectConjugator.Conjugate(root, params);
        return Hamzate(pattern);
    }

    public ConjugateParticiple(dialect: DialectType, root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): string
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        return dialectConjugator.ConjugateParticiple(root, stem, voice, stem1Context);
    }

    public GenerateAllPossibleVerbalNouns(dialect: DialectType, root: VerbRoot, stem: number): VerbalNoun[]
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        return dialectConjugator.GenerateAllPossibleVerbalNouns(root, stem);
    }

    //Private methods
    private AnalyzeConjugationInStemTenseVoiceDefinition(stemTenseVoiceDefinition: StemTenseVoiceDefinition | undefined)
    {
        if(stemTenseVoiceDefinition === undefined)
            return;

        for (const rootType in stemTenseVoiceDefinition)
        {
            if (Object.prototype.hasOwnProperty.call(stemTenseVoiceDefinition, rootType))
            {
                throw new Error("TODO implement me");
                /*const rules = stemTenseVoiceDefinition[rootType]!.rules;

                for (const rule of rules)
                {
                    console.log("test rule", rule.conjugation);
                }*/
            }
        }
    }

    private CreateDialectConjugator(dialect: DialectType)
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return new MSAConjugator;
            case DialectType.NorthLevantineArabic:
                throw new Error("implement me");
        }
    }
}