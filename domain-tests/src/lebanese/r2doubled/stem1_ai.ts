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
//Table: 20

It("Stem 1 Past:a, Present:i", () => {
    const root = "ح-ب-ب";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false };

    RunActiveParticipleTest(root, stem, "حَابِب", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حَبّْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حَبِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حَبَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حَبَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حَبَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حَبُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حَبَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حَبَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيحِبّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْحِبّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْحِبّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْحِبِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْحِبّْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيحِبُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْحِبُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْحِبّْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْحِبّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْحِبّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْحِبّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْحِبِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "حِبّْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْحِبُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْحِبُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْحِبّْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حِبّْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حِبِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حِبُّوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});