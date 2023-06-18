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

import { CreateVerb, Stem1Context } from "./CreateVerb";
import { A3EIN, FA, LAM, QAF, WAW } from "./Definitions";
import { Hamzate } from "./Hamza";
import { RootType, VerbRoot } from "./VerbRoot";
import { Tense, Voice, Gender, Person, Numerus, VerbalNoun } from "./VerbStem";
import { ParseVocalizedText } from "./Vocalization";
import { DialectDefinition, StemTenseVoiceDefinition } from "./rule_sets/Definitions";
import { definition as msaDef } from "./rule_sets/msa/dialectDefinition";

export enum DialectType
{
    ModernStandardArabic
}

interface ConjugationParams
{
    dialect: DialectType;
    tense: Tense;
    voice: Voice;
    gender: Gender;
    person: Person;
    numerus: Numerus;
    stem: number;
    stem1Context?: Stem1Context;
}

export class Conjugator
{
    //Public methods
    public AnalyzeConjugation(dialect: DialectType, conjugated: string)
    {
        const dialectDef = this.GetDialectDefiniton(dialect);
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
        }
    }

    public Conjugate(root: VerbRoot, params: ConjugationParams)
    {
        if( (params.tense === "imperative") && (params.voice === "passive") )
            throw new Error("imperative and passive does not exist");
        if( (params.tense === "imperative") && (params.person !== "second") )
            return "";

        const dialectDef = this.GetDialectDefiniton(params.dialect);
        const rules = this.ExtractRules(dialectDef, params.stem, params.tense, params.voice, root.type);
        if(rules !== undefined)
        {
            const rule = rules.find(r => (r.gender === params.gender) && (r.numerus === params.numerus) && (r.person === params.person) && (r.condition ? r.condition(root, params.stem1Context!) : true) );
            if(rule !== undefined)
                return this.ApplyRootConjugationPattern(root, rule.conjugation);
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), params.stem, params.stem1Context);
        return verb.Conjugate(params.tense, params.voice, params.gender, params.person, params.numerus);
    }

    public ConjugateParticiple(dialect: DialectType, root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): string
    {
        const dialectDef = this.GetDialectDefiniton(dialect);

        const rules = dialectDef.stems[stem]?.participleRules[root.type];
        if(rules !== undefined)
        {
            const rule = rules.find(r => (r.voice === voice) && (r.condition ? r.condition(stem1Context!) : true) );
            if(rule !== undefined)
                return this.ApplyRootConjugationPattern(root, rule.conjugation);
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem, { middleRadicalTashkil: "", middleRadicalTashkilPresent: "" }); //stem1 ctx is not needed for participle
        return verb.ConjugateParticiple(voice);
    }

    public GenerateAllPossibleVerbalNouns(dialect: DialectType, root: VerbRoot, stem: number): VerbalNoun[]
    {
        const dialectDef = this.GetDialectDefiniton(dialect);

        const rules = dialectDef.stems[stem]?.verbalNounRules[root.type];
        if(rules !== undefined)
        {
            return rules.map(r => ({
                id: r.id,
                text: this.ApplyRootConjugationPattern(root, r.text)
                })
            );
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), stem, { middleRadicalTashkil: "", middleRadicalTashkilPresent: "" }); //stem1 ctx is not needed for verbal nouns
        return verb.GenerateAllPossibleVerbalNouns();
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
                const rules = stemTenseVoiceDefinition[rootType]!.rules;

                for (const rule of rules)
                {
                    console.log("test rule", rule.conjugation);
                }
            }
        }
    }

    private ApplyRootConjugationPattern(root: VerbRoot, conjugation: string)
    {
        const patternRadicals = this.GetPatternRadicals(root.type);

        const letters = ParseVocalizedText(conjugation);

        const replaced = letters.map(x => {
            const idx = patternRadicals.indexOf(x.letter);
            if(idx === -1)
                return x;
            return {
                letter: root.radicalsAsSeparateLetters[idx],
                tashkil: x.tashkil,
                shadda: x.shadda
            }
        });
        return Hamzate(...replaced);            
    }

    private ExtractRules(dialectDef: DialectDefinition, stem: number, tense: Tense, voice: Voice, rootType: RootType)
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
            return voiceData[rootType]?.rules;
        }
        if(voice !== "active")
            throw new Error("Imperative can only be active");
        return (tenseData as StemTenseVoiceDefinition)[rootType]?.rules;
    }

    private GetDialectDefiniton(dialect: DialectType)
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return msaDef;
        }
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
            case RootType.Regular:
                return [FA, A3EIN, LAM];
            case RootType.SecondConsonantDoubled:
                return [FA, LAM];
        }
        throw new Error("Method not implemented.");
    }
}