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
//Table: 2
//Modifications: The table in the book uses د instead of ذ because thats how it is pronounced in lebanese. This test uses the original ذ.

It("Irregular أخذ", () => {
    const root = "ء-خ-ذ";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false };

    RunActiveParticipleTest(root, stem, "آخِذ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "أَخَذْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "أَخَذِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "أَخَذِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "أَخَذْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "أَخَذِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "أَخَذُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "أَخَذْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "أَخَذْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيَاخُذْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتَاخُذْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتَاخُذْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتَاخْذِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بَاخُذْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيَاخْذُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتَاخْذُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنَاخُذْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يَاخُذْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تَاخُذْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تَاخُذْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تَاخْذِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "آخُذْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يَاخْذُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تَاخْذُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نَاخُذْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "خُذْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "خِذِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "خِذُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});