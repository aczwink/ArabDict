/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationRule, Vowel } from "../../Conjugation";
import { Gender, Letter, Mood, Numerus, Person, Tense } from "../../Definitions";
import { VerbRoot } from "../../VerbRoot";

export function IrregularIja(root: VerbRoot): ConjugationRule[]
{
    return [
        {
            conditions: { tense: Tense.Perfect, person: Person.Third, numerus: Numerus.Plural },
            symbols: [Letter.Hamza, root.r1],
            vowels: [Vowel.ShortI]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third, gender: Gender.Male },
            symbols: [Letter.Hamza, root.r1],
            vowels: [Vowel.ShortI, Vowel.LongA]
        },
        {
            conditions: { tense: Tense.Perfect, person: Person.Third },
            symbols: [Letter.Hamza, root.r1],
            vowels: [Vowel.ShortI]
        },
        {
            conditions: { tense: Tense.Perfect },
            symbols: [root.r1],
            vowels: [Vowel.LongI]
        },
        {
            conditions: { mood: Mood.Imperative, gender: Gender.Male, numerus: Numerus.Singular },
            symbols: [Letter.Ta, Letter.A3ein],
            vowels: [Vowel.ShortA, Vowel.LongA]
        },
        {
            conditions: { mood: Mood.Imperative },
            symbols: [Letter.Ta, Letter.A3ein],
            vowels: [Vowel.ShortA]
        },
        {
            conditions: { mood: Mood.Subjunctive, numerus: Numerus.Singular, person: Person.First, },
            prefixVowel: Vowel.ShortI,
            symbols: [Letter.Hamza, root.r1],
            vowels: [Vowel.ShortI, Vowel.LongI]
        },
        {
            conditions: { tense: Tense.Present, numerus: Numerus.Plural, person: Person.First },
            prefixVowel: Vowel.ShortI,
            symbols: [root.r1],
            vowels: [Vowel.LongI]
        },
        {
            conditions: { tense: Tense.Present, numerus: Numerus.Plural },
            prefixVowel: Vowel.ShortI,
            symbols: [root.r1],
            vowels: []
        },
        {
            conditions: { tense: Tense.Present },
            prefixVowel: Vowel.ShortI,
            symbols: [root.r1],
            vowels: [Vowel.LongI]
        }
    ];
}

export function IsHamzaOnR1SpecialCase(root: VerbRoot)
{
    const r2 = root.r2;
    const r3 = root.r3;

    const condition = ((r2 === Letter.Kha) && (r3 === Letter.Thal))
        || ((r2 === Letter.Kaf) && (r3 === Letter.Lam));
    return condition;
}