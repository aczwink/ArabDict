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
//Table: 14

It("Stem 6", () => {
    const root = "ف-د-و";
    const stem = 6;

    RunActiveParticipleTest(root, stem, "مِتْفَادِي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تْفَادَى" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تْفَادِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تْفَادَيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تْفَادَيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تْفَادَيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تْفَادُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تْفَادَيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تْفَادَيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِتْفَادَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِتْفَادَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِتْفَادَى" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِتْفَادِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِتْفَادَى" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِتْفَادُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِتْفَادُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِتْفَادَى" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِتْفَادَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِتْفَادَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِتْفَادَى" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِتْفَادِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِتْفَادَى" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِتْفَادُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِتْفَادُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِتْفَادَى" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تْفَادَى" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تْفَادِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تْفَادُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});