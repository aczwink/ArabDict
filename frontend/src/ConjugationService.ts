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

import { Injectable } from "acfrontend";
import { Conjugator, DialectType } from "arabdict-domain/src/Conjugator";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Tense, Voice, Gender, Person, Numerus, Mood } from "arabdict-domain/src/rule_sets/msa/_legacy/VerbStem";
import { Stem1Context } from "../dist/api";

@Injectable
export class ConjugationService
{
    constructor()
    {
        this.conjugator = new Conjugator;
        this._globalDialect = DialectType.ModernStandardArabic;
    }

    //Properties
    public get globalDialect()
    {
        return this._globalDialect;
    }

    public set globalDialect(newValue: DialectType)
    {
        this._globalDialect = newValue;
    }

    //Public methods
    public AnalyzeConjugation(conjugated: string)
    {
        return this.conjugator.AnalyzeConjugation(this._globalDialect, conjugated);
    }

    public Conjugate(rootRadicals: string, stem: number, tense: Tense, voice: Voice, gender: Gender, person: Person, numerus: Numerus, mood: Mood, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.Conjugate(root, {
            stem,
            tense,
            voice,
            gender,
            person,
            numerus,
            mood,
            stem1Context
        }, this._globalDialect);
    }

    public ConjugateParticiple(rootRadicals: string, stem: number, voice: Voice, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.ConjugateParticiple(this._globalDialect, root, stem, voice, stem1Context);
    }

    public GenerateAllPossibleVerbalNouns(rootRadicals: string, stem: number)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.GenerateAllPossibleVerbalNouns(this._globalDialect, root, stem);
    }

    //Private state
    private conjugator: Conjugator;
    private _globalDialect: DialectType;
}