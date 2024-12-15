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
//Table: 12

It("Stem 5", () => {
    const root = "ع-ل-م";
    const stem = 5;

    RunActiveParticipleTest(root, stem, "مِتْعَلَّمْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تْعَلَّمْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تْعَلَّمِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تْعَلَّمِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تْعَلَّمْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تْعَلَّمِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تْعَلَّمُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تْعَلَّمْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تْعَلَّمْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِتْعَلَّمْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِتْعَلَّمْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِتْعَلَّمْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِتْعَلَّمِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِتْعَلَّمْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِتْعَلَّمُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِتْعَلَّمُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِتْعَلَّمْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِتْعَلَّمْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِتْعَلَّمْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِتْعَلَّمْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِتْعَلَّمِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِتْعَلَّمْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِتْعَلَّمُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِتْعَلَّمُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِتْعَلَّمْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تْعَلَّمْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تْعَلَّمِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تْعَلَّمُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});