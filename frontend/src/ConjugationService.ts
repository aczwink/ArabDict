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
import { Stem1Context } from "arabdict-domain/src/CreateVerb";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Gender, Numerus, Person, Tense, Voice } from "arabdict-domain/src/VerbStem";

@Injectable
export class ConjugationService
{
    constructor()
    {
        this.conjugator = new Conjugator;
        this.globalDialect = DialectType.ModernStandardArabic;
    }

    //Public methods
    public Conjugate(rootRadicals: string, stem: number, tense: Tense, voice: Voice, gender: Gender, person: Person, numerus: Numerus, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.Conjugate(root, {
            dialect: this.globalDialect,
            stem,
            tense,
            voice,
            gender,
            person,
            numerus,
            stem1Context
        });
    }

    //Private state
    private conjugator: Conjugator;
    private globalDialect: DialectType;
}