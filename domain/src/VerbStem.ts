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
export const ALEF_HAMZA = "\u0623";
export const TA = "\u062A";
export const SIIN = "\u0633";
export const NUN = "\u0646";

export const DHAMMA = "\u064F";
export const KASRA = "\u0650";
export const SUKUN = "\u0652";

export type Tense = "imperative" | "perfect" | "present";
export type Voice = "active" | "passive";
export type Gender = "male" | "female";
export type Person = "first" | "second" | "third";
export type Numerus = "singular" | "dual" | "plural";

export interface VerbalNoun
{
    id: number;
    text: string;
}

export interface VerbStem
{
    Conjugate(tense: Tense, voice: Voice, gender: Gender, person: Person, numerus: Numerus): string;
    ConjugateParticiple(voice: Voice): string;
    GenerateAllPossibleVerbalNouns(): VerbalNoun[];
}