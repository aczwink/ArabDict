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
//Table: 27

It("Stem 9", () => {
    const root = "ح-م-ر";
    const stem = 9;

    RunActiveParticipleTest(root, stem, "مِحْمَرّ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حْمَرّْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حْمَرِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حْمَرَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حْمَرَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حْمَرَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حْمَرُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حْمَرَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حْمَرَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِحْمَرّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِحْمَرّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِحْمَرّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِحْمَرِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِحْمَرّْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِحْمَرُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِحْمَرُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِحْمَرّْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِحْمَرّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِحْمَرّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِحْمَرّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِحْمَرِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِحْمَرّْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِحْمَرُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِحْمَرُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِحْمَرّْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حْمَرّْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حْمَرِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حْمَرُّوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});