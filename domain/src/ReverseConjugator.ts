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

import { DialectType, VerbReverseConjugationResult, Conjugator } from "./Conjugator";
import { Stem1Context, ConjugationParams, Gender, Mood, Numerus, Person, Tense, Voice, AdvancedStemNumber } from "./Definitions";
import { DialectReverseConjugator, ReverseConjugationResult } from "./DialectReverseConjugator";
import { VerbRoot } from "./VerbRoot";
import { DisplayVocalized, CompareVocalized } from "./Vocalization";
import { MSAReverseConjugator } from "./rule_sets/msa/MSAReverseConjugator";

export class ReverseConjugator
{
    constructor(private dialect: DialectType, private toAnalyze: DisplayVocalized[])
    {
        this.conjugator = new Conjugator;
        this.matches = [];
    }

    //Public methods
    public AnalyzeConjugation()
    {
        const dialectConjugator = this.CreateDialectReverseConjugator(this.dialect);
        const analysisResults = dialectConjugator.AnalyzeConjugation(this.toAnalyze);
        this.TryReconstructConjugationParams(analysisResults);

        return this.matches;
    }

    //State
    private conjugator: Conjugator;
    private matches: VerbReverseConjugationResult[];

    //Private methods
    private CheckConjugation(root: VerbRoot, params: ConjugationParams)
    {
        const conjugated = this.conjugator.Conjugate(root, params, this.dialect);

        const match = CompareVocalized(this.toAnalyze, conjugated);
        if(match > 0)
        {
            this.matches.push({
                root: root,
                params,
                score: match
            })
        }
    }

    private TryReconstructConjugationParamsForResult(result: ReverseConjugationResult)
    {
        const numeruses: Numerus[] = [Numerus.Singular, Numerus.Dual, Numerus.Plural];
        const genders: Gender[] = [Gender.Male, Gender.Female];

        const moods: Mood[] = (result.tense === Tense.Perfect) ? [Mood.Indicative] : [Mood.Indicative, Mood.Subjunctive, Mood.Jussive, Mood.Imperative];
        for (const mood of moods)
        {
            const voices = (mood === Mood.Imperative) ? [Voice.Active] : [Voice.Active, Voice.Passive];
            const persons = (mood === Mood.Imperative) ? [Person.Second] : [Person.First, Person.Second, Person.Third];

            for (const voice of voices)
            {
                for (const numerus of numeruses)
                {
                    for (const person of persons)
                    {
                        for (const gender of genders)
                        {
                            if(result.stem === 1)
                            {
                                for (const choice of result.root.GetStem1ContextChoices().r2options)
                                {
                                    const stem1ctx: Stem1Context = {
                                        middleRadicalTashkil: choice.past,
                                        middleRadicalTashkilPresent: choice.present,
                                        soundOverride: false
                                    };
                                    this.CheckConjugation(result.root, {
                                        gender,
                                        mood,
                                        numerus,
                                        person,
                                        stem: 1,
                                        tense: result.tense,
                                        voice,
                                        stem1Context: stem1ctx,
                                    });
                                }
                            }
                            else
                            {
                                this.CheckConjugation(result.root, {
                                    gender,
                                    mood,
                                    numerus,
                                    person,
                                    stem: result.stem,
                                    tense: result.tense,
                                    voice,
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    private TryReconstructConjugationParams(analysisResults: ReverseConjugationResult[])
    {
        for (const result of analysisResults)
            this.TryReconstructConjugationParamsForResult(result);
    }

    private CreateDialectReverseConjugator(dialect: DialectType): DialectReverseConjugator
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return new MSAReverseConjugator;
            default:
                throw new Error("TODO: NOT IMPLEMENTED");
        }
    }
}