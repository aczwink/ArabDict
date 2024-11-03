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
import { Tashkil } from "arabdict-domain/dist/Definitions";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 1

It("Irregular إجا", () => {
    RunActiveParticipleTest("ج-ي-ء", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, "جَاي", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "إِجَا" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "إِجِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "جِيتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "جِيتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "جِيتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "إِجِوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "جِيتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "جِينَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِجِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِجِي" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِجِوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِجِوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِجِي" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِجِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِجِي" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِجِوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِجِوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِجِي" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تَعَا" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تَعِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تَعُوا" },
    ];

    RunConjugationTest("ج-ي-ء", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, conjugations, DialectType.Lebanese);
});