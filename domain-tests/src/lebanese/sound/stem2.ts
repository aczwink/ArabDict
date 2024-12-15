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
//Table: 29

It("Stem2", () => {
    const root = "خ-ل-ص";
    const stem = 2;

    RunActiveParticipleTest(root, stem, "مْخَلِّص", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "خَلَّصْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "خَلَّصِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "خَلَّصِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "خَلَّصْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "خَلَّصِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "خَلَّصُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "خَلَّصْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "خَلَّصْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيخَلِّصْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْخَلِّصْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْخَلِّصْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْخَلّْصِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْخَلِّصْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيخَلّْصُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْخَلّْصُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْخَلِّصْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْخَلِّصْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْخَلِّصْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْخَلِّصْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْخَلّْصِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "خَلِّصْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْخَلّْصُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْخَلّْصُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْخَلِّصْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "خَلِّصْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "خَلّْصِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "خَلّْصُوا" },
    ];

    RunConjugationTest(root, 2, conjugations, DialectType.Lebanese);
});

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 9

It("Stem 2 - No shadda on r1", () => {
    const root = "ب-ل-ش";
    const stem = 2;
    
    const conjugations: ConjugationTest[] = [
        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْبَلِّشْ" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});