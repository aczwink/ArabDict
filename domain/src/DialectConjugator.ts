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
import { ConjugationVocalized, DisplayVocalized } from "./Vocalization";
import { ConjugationParams, AdjectiveDeclensionParams, Stem1Context, NounDeclensionParams, Gender, Numerus, StemNumber, Voice } from "./Definitions";

export enum TargetNounDerivation
{
    DeriveFeminineSingular,
    DeriveDualSameGender,
    DerivePluralSameGender,
}

export interface NounInput
{
    vocalized: DisplayVocalized[];
    gender: Gender;
    numerus: Numerus;
}

export interface DialectConjugator
{
    Conjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[];
    ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context): ConjugationVocalized[];
    DeclineAdjective(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[];
    DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[];
    DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[];
}