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
//Table: 11

It("Stem 6", () => {
    const root = "ع-م-ل";
    const stem = 6;

    RunActiveParticipleTest(root, stem, "مِتْعَامَلْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تْعَامَلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تْعَامَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تْعَامَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تْعَامَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تْعَامَلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تْعَامَلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تْعَامَلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تْعَامَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِتْعَامَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِتْعَامَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِتْعَامَلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِتْعَامَلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِتْعَامَلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِتْعَامَلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِتْعَامَلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِتْعَامَلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِتْعَامَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِتْعَامَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِتْعَامَلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِتْعَامَلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِتْعَامَلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِتْعَامَلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِتْعَامَلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِتْعَامَلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تْعَامَلْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تْعَامَلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تْعَامَلُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});