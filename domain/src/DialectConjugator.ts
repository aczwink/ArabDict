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
import { VerbRoot } from "./VerbRoot";
import { FullyVocalized, _LegacyPartiallyVocalized } from "./Vocalization";
import { ConjugationParams, Stem1Context, _LegacyVoice, _LegacyTense } from "./Definitions";

export interface ReverseConjugationResult
{
    root: VerbRoot;
    tense: _LegacyTense;
}

export interface DialectConjugator
{
    AnalyzeConjugation(conjugated: _LegacyPartiallyVocalized[]): ReverseConjugationResult[];
    Conjugate(root: VerbRoot, params: ConjugationParams): (_LegacyPartiallyVocalized | FullyVocalized)[];
    ConjugateParticiple(root: VerbRoot, stem: number, voice: _LegacyVoice, stem1Context?: Stem1Context): (_LegacyPartiallyVocalized | FullyVocalized)[];
    GenerateAllPossibleVerbalNouns(root: VerbRoot, stem: number): (string | FullyVocalized[])[];
}