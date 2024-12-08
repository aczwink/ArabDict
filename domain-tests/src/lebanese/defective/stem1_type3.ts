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
import { It } from "acts-util-test";
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "arabdict-domain/dist/Conjugator";
import { Stem1Context, Tashkil } from "arabdict-domain/dist/Definitions";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 8

It("بقي", () => {
    const root = "ب-ق-ي";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false };

    RunActiveParticipleTest(root, stem, "بَاقِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "بِقِي" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "بِقْيِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "بْقِيتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "بْقِيتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "بْقِيتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "بِقْيُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "بْقِيتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "بْقِينَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِبْقَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِبْقَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِبْقَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِبْقِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِبْقَى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِبْقُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِبْقُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِبْقَى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِبْقَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِبْقَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِبْقَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِبْقِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِبْقَى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِبْقُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِبْقُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِبْقَى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "بْقِي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "بْقِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "بْقُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});