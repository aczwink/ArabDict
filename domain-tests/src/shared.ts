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
import "acts-util-core";
import { Expect } from "acts-util-test";
import { Conjugator, DialectType } from "arabdict-domain/dist/Conjugator";
import { VerbRoot } from "arabdict-domain/dist/VerbRoot";
import { ParseVocalizedText } from "arabdict-domain/dist/Vocalization";
import { Stem1Context } from "arabdict-domain/dist/rule_sets/msa/_legacy/CreateVerb";
import { Mood, Person, Tense, Voice } from "arabdict-domain/dist/rule_sets/msa/_legacy/VerbStem";

function Test(expected: string, got: string)
{
    const a = ParseVocalizedText(expected);
    const b = ParseVocalizedText(got);

    if(!a.Equals(b))
    {
        console.log("expected:", a, "got:", b);
        Expect(expected).Equals(got);
    }
}

interface BasicConjugationTest
{
    root: string;
    past: string;
    present: string;
}

export function RunBasicConjugationTest(conjugations: BasicConjugationTest[], stem: number)
{
    const conjugator = new Conjugator();
    
    for (const test of conjugations)
    {
        const root = new VerbRoot(test.root.split("-").join(""));

        const pastResult = conjugator.Conjugate(root, {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "perfect",
            voice: "active",
            mood: "indicative"
        }, DialectType.ModernStandardArabic);
        Test(test.past, pastResult);

        const presentResult = conjugator.Conjugate(root, {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "present",
            voice: "active",
            mood: "indicative"
        }, DialectType.ModernStandardArabic);
        Test(test.present, presentResult);
    }
}

export interface ConjugationTest
{
    expected: string;
    tense?: Tense;
    person?: Person;
    mood?: Mood;
    voice?: Voice;
}
export function RunConjugationTest(rootRadicals: string, stem: number | Stem1Context, conjugations: ConjugationTest[])
{
    const conjugator = new Conjugator();
    
    for (const test of conjugations)
    {
        const root = new VerbRoot(rootRadicals.split("-").join(""));

        const pastResult = conjugator.Conjugate(root, {
            gender: "male",
            numerus: "singular",
            person: test.person ?? "third",
            stem: (typeof stem === "number") ? stem : 1,
            stem1Context: (typeof stem === "number") ? undefined : stem,
            tense: test.tense ?? "perfect",
            voice: test.voice ?? "active",
            mood: test.mood ?? "indicative"
        }, DialectType.ModernStandardArabic);
        Test(test.expected, pastResult);
    }
}