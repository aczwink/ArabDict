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

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 30

It("Stem 2", () => {
    const root = "خ-ل-و";
    const stem = 2;

    RunActiveParticipleTest(root, stem, "مْخَلِّي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "خَلَّى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "خَلِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "خَلَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "خَلَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "خَلَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "خَلُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "خَلَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "خَلَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيخَلِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْخَلِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْخَلِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْخَلِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْخَلِّي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيخَلُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْخَلُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْخَلِّي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْخَلِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْخَلِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْخَلِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْخَلِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "خَلِّي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْخَلُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْخَلُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْخَلِّي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "خَلِّي" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "خَلِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "خَلُّوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});