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
//Table: 19

It("Stem 3", () => {
    const root = "ح-و-ل";
    const stem = 3;

    RunActiveParticipleTest(root, stem, "مْحَاوِل", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حَاوَلْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حَاوَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حَاوَلِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حَاوَلْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حَاوَلِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حَاوَلُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حَاوَلْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حَاوَلْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيحَاوِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْحَاوِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْحَاوِلْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْحَاوْلِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْحَاوِلْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيحَاوْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْحَاوْلُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْحَاوِلْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْحَاوِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْحَاوِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْحَاوِلْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْحَاوْلِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "حَاوِلْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْحَاوْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْحَاوْلُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْحَاوِلْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حَاوِلْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حَاوْلِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حَاوْلُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});