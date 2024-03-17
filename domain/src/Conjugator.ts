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
import { DialectConjugator } from "./DialectConjugator";
import { MSAConjugator } from "./rule_sets/msa/MSAConjugator";
import { CompareVocalized, ParseVocalizedText, _LegacyPartiallyVocalized, FullyVocalized, VocalizedToString, PartiallyVocalized } from "./Vocalization";
import { ConjugationParams, PrimaryTashkil, Stem1Context, Tashkil, Tense, _LegacyVoice, _LegacyTense, Voice, Gender, _LegacyMood, Numerus, _LegacyPerson, Mood, Person } from "./Definitions";
import { APCConjugator } from "./rule_sets/apc/APCConjugator";
import { LebaneseConjugator } from "./rule_sets/lebanese/LebaneseConjugator";

export enum DialectType
{
    ModernStandardArabic,
    NorthLevantineArabic,
    Lebanese
}

export interface StringConjugationParams
{
    tense: _LegacyTense;
    voice: _LegacyVoice;
    gender: Gender;
    person: _LegacyPerson;
    numerus: Numerus;
    mood: _LegacyMood;
    stem: number;
    stem1Context?: Stem1Context;
}

export interface VerbReverseConjugationResult
{
    root: VerbRoot;
    params: StringConjugationParams;
    score: number;
}

export class Conjugator
{
    //Public methods
    public AnalyzeConjugation(dialect: DialectType, toAnalyze: _LegacyPartiallyVocalized[])
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const analysisResults = dialectConjugator.AnalyzeConjugation(toAnalyze);

        const numeruses: Numerus[] = ["singular", "dual", "plural"];
        const persons: _LegacyPerson[] = ["first", "second", "third"];
        const genders: Gender[] = ["male", "female"];
        const voices: _LegacyVoice[] = ["active", "passive"];
        const stems = [2, 3, 4, 5, 6, 7, 8, 10];

        const matches: VerbReverseConjugationResult[] = [];
        for (const result of analysisResults)
        {
            const moods: _LegacyMood[] = (result.tense === "perfect") ? ["indicative"] : ["indicative", "subjunctive", "jussive"];
            for (const voice of voices)
            {
                for (const mood of moods)
                {
                    for (const numerus of numeruses)
                    {
                        for (const person of persons)
                        {
                            for (const gender of genders)
                            {
                                const context = this;
                                function CompareAndAdd(stem: number, stem1Context?: Stem1Context)
                                {
                                    const params: StringConjugationParams = {
                                        gender,
                                        mood: mood,
                                        numerus,
                                        person,
                                        stem,
                                        tense: result.tense,
                                        voice,
                                        stem1Context,
                                    };
                                    const conjugated = context.ConjugateStringBased(result.root, params, dialect);

                                    const match = CompareVocalized(toAnalyze, ParseVocalizedText(conjugated));
                                    if(match > 0)
                                    {
                                        matches.push({
                                            root: result.root,
                                            params,
                                            score: match
                                        })
                                    }
                                }
                                
                                for (const t1 of [Tashkil.Dhamma, Tashkil.Fatha, Tashkil.Kasra])
                                {
                                    for (const t2 of [Tashkil.Dhamma, Tashkil.Fatha, Tashkil.Kasra])
                                    {
                                        const stem1ctx: Stem1Context = {
                                            middleRadicalTashkil: t1 as PrimaryTashkil,
                                            middleRadicalTashkilPresent: t2 as PrimaryTashkil,
                                            soundOverride: false
                                        };
                                        CompareAndAdd(1, stem1ctx);
                                    }
                                }

                                for (const stem of stems)
                                    CompareAndAdd(stem);
                            }
                        }
                    }
                }
            }
        }
        return matches;
    }

    public Conjugate(root: VerbRoot, params: ConjugationParams, dialect: DialectType)
    {
        if( (params.tense === Tense.Present) && (params.mood === Mood.Imperative) )
        {
            if(params.voice === Voice.Passive)
                throw new Error("imperative and passive does not exist");
            if(params._legacyPerson !== "second")
            throw new Error("imperative does only exist for second person");
        }
        if( (params.stem === 1) && (params._legacyStem1Context === undefined) )
            throw new Error("missing context for stem 1 conjugation");

        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const pattern = dialectConjugator.Conjugate(root, params);

        this.CheckShaddaPattern(pattern);
        return this.ExecuteWordTransformationPipeline(pattern);
    }

    public ConjugateStringBased(root: VerbRoot, params: StringConjugationParams, dialect: DialectType)
    {
        function MapMood()
        {
            switch(params.mood)
            {
                case "imperative":
                    return Mood.Imperative;
                case "indicative":
                    return Mood.Indicative;
                case "jussive":
                    return Mood.Jussive;
                case "subjunctive":
                    return Mood.Subjunctive;
            }
        }
        function MapPerson()
        {
            switch(params.person)
            {
                case "first":
                    return Person.First;
                case "second":
                    return Person.Second;
                case "third":
                    return Person.Third;
            }
        }

        return this.Conjugate(root, {
            mood: MapMood(),
            person: MapPerson(),
            stem: params.stem as any,
            stem1Context: params.stem1Context as any,
            tense: params.tense === "perfect" ? Tense.Perfect : Tense.Present,
            voice: params.voice === "active" ? Voice.Active : Voice.Passive,

            _legacyTense: params.tense,
            _legacyVoice: params.voice,
            _legacyGender: params.gender,
            _legacyMood: params.mood,
            _legacyNumerus: params.numerus,
            _legacyPerson: params.person,
            _legacyStem1Context: params.stem1Context,
        }, dialect);
    }

    public ConjugateParticiple(dialect: DialectType, root: VerbRoot, stem: number, voice: _LegacyVoice, stem1Context?: Stem1Context): string
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const pattern = dialectConjugator.ConjugateParticiple(root, stem, voice, stem1Context);

        return this.ExecuteWordTransformationPipeline(pattern);
    }

    public GenerateAllPossibleVerbalNouns(dialect: DialectType, root: VerbRoot, stem: number): string[]
    {
        const dialectConjugator = this.CreateDialectConjugator(dialect);
        const patterns = dialectConjugator.GenerateAllPossibleVerbalNouns(root, stem);

        return patterns.map(x => {
            if(typeof x === "string")
                return x;
            return this.ExecuteWordTransformationPipeline(x);
        });
    }

    //Private methods
    private CheckShaddaPattern(vocalized: (_LegacyPartiallyVocalized | FullyVocalized)[])
    {
        for(let i = 0; i < vocalized.length - 1; i++)
        {
            const current = vocalized[i];
            const next = vocalized[i + 1];

            if((current.letter === next.letter) && (current.shadda === next.shadda) && (current.shadda === false) && (current.tashkil === Tashkil.Sukun))
            {
                next.shadda = true;
                vocalized.Remove(i);
                i--;
            }
        }
    }

    private CreateDialectConjugator(dialect: DialectType): DialectConjugator
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return new MSAConjugator;
            case DialectType.NorthLevantineArabic:
                return new APCConjugator;
            case DialectType.Lebanese:
                return new LebaneseConjugator;
        }
    }

    private ExecuteWordTransformationPipeline(pattern: (_LegacyPartiallyVocalized | FullyVocalized)[]): string
    {
        const migrated = this.MigrateLegacyVocalized(pattern);
        const hamzated = Hamzate(migrated);
        const partial = this.RemoveRedundantTashkil(hamzated);
        this.RemoveWordEndMarker(partial);
        return this.ToString(partial);
    }

    private MigrateLegacyVocalized(vocalized: (_LegacyPartiallyVocalized | FullyVocalized)[]): FullyVocalized[]
    {
        function MigrateTashkil(v: _LegacyPartiallyVocalized | FullyVocalized): Tashkil
        {
            switch(v.tashkil)
            {
                case Tashkil.Dhamma:
                    return Tashkil.Dhamma;
                case Tashkil.Fatha:
                    return Tashkil.Fatha;
                case Tashkil.Kasra:
                    return Tashkil.Kasra;
                case Tashkil.LongVowelMarker:
                    return Tashkil.LongVowelMarker;
                case Tashkil.EndOfWordMarker:
                    return Tashkil.EndOfWordMarker;
                case Tashkil.Sukun:
                    return Tashkil.Sukun;
                case Tashkil.Kasratan:
                    return Tashkil.Kasratan;
                case Tashkil.Fathatan:
                    return Tashkil.Fathatan;
                case undefined:
                    console.error(vocalized);
                    alert("undefined is not allowed anymore");
                    throw new Error("undefined is not allowed anymore");
                default:
                    throw new Error("Function not implemented: " + v.tashkil);
            }
        }

        return vocalized.map(v => ({
            letter: v.letter as any,
            shadda: v.shadda,
            tashkil: MigrateTashkil(v),
        }));
    }

    private RemoveRedundantTashkil(vocalized: FullyVocalized[]): PartiallyVocalized[]
    {
        return vocalized.map( (v, i) => {
            const predecessor: FullyVocalized | undefined = vocalized[i - 1];

            return {
                letter: v.letter,
                shadda: v.shadda,
                tashkil: v.tashkil
            };
        });
        /*for(let i = 1; i < vocalized.length; i++)
        {
            if( (v.letter === ALEF) && (v.tashkil === FATHA) )
                v.tashkil = undefined;
            else if( (v.letter === WAW) && (v.tashkil === DHAMMA) )
                v.tashkil = undefined;
            else if( (v.letter === YA) && (v.tashkil === KASRA) && (p.tashkil === KASRA) )
                v.tashkil = undefined;
            else if( (v.letter === ALEF_MAKSURA) && (v.tashkil === FATHA) )
                v.tashkil = undefined;
        }*/
    }

    private RemoveWordEndMarker(pattern: PartiallyVocalized[])
    {
        const last = pattern[pattern.length - 1];
        if(last.tashkil === Tashkil.EndOfWordMarker)
            last.tashkil = undefined;
    }

    private ToString(vocalized: PartiallyVocalized[])
    {
        return vocalized.Values().Map(VocalizedToString).Join("");
    }
}
