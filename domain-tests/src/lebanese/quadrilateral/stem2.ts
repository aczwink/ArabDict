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
//Table: 15

It("Stem 2", () => {
    const root = "ل-خ-ب-ط";
    const stem = 2;

    RunActiveParticipleTest(root, stem, "مِتْلَخْبَطْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تْلَخْبَطْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تْلَخْبَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تْلَخْبَطِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تْلَخْبَطْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تْلَخْبَطِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تْلَخْبَطُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تْلَخْبَطْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تْلَخْبَطْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِتْلَخْبَطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِتْلَخْبَطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِتْلَخْبَطْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِتْلَخْبَطِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِتْلَخْبَطْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِتْلَخْبَطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِتْلَخْبَطُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِتْلَخْبَطْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِتْلَخْبَطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِتْلَخْبَطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِتْلَخْبَطْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِتْلَخْبَطِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِتْلَخْبَطْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِتْلَخْبَطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِتْلَخْبَطُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِتْلَخْبَطْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "لَخْبِطْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "لَخْبْطِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "لَخْبْطُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});