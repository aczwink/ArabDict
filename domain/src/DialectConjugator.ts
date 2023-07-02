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
import { VerbRoot } from "./VerbRoot";
import { Tense, Voice, Gender, Person, Numerus, Mood, VerbalNoun } from "./VerbStem";
import { Vocalized } from "./Vocalization";

export interface ConjugationParams
{
    tense: Tense;
    voice: Voice;
    gender: Gender;
    person: Person;
    numerus: Numerus;
    mood: Mood;
    stem: number;
    stem1Context?: Stem1Context;
}

export interface DialectConjugator
{
    Conjugate(root: VerbRoot, params: ConjugationParams): Vocalized[];
    ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): string;
    GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): VerbalNoun[];
}