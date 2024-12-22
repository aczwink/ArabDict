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
//Table: 13

It("Stem 5", () => {
    const root = "غ-ذ-و";
    const stem = 5;

    RunActiveParticipleTest(root, stem, "مِتْغَذِّي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تْغَذَّى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تْغَذِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تْغَذَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تْغَذَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تْغَذَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تْغَذُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تْغَذَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تْغَذَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِتْغَذَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِتْغَذَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِتْغَذَّى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِتْغَذِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِتْغَذَّى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِتْغَذُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِتْغَذُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِتْغَذَّى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِتْغَذَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِتْغَذَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِتْغَذَّى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِتْغَذِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِتْغَذَّى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِتْغَذُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِتْغَذُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِتْغَذَّى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تْغَذَّى" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تْغَذِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تْغَذُّوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});