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
//Table: 6
//Modifications: First person singular present gets a shadda according to the rules. This is not shown in the book however

It("باع", () => {
    const root = "ب-ي-ع";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false };

    RunActiveParticipleTest(root, stem, "بَايِع", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "بَاعْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "بَاعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "بِعِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "بِعْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "بِعِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "بَاعُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "بِعْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "بِعْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيبِيعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْبِيعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْبِيعْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْبِيعِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِّيعْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيبِيعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْبِيعُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْبِيعْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْبِيعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْبِيعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْبِيعْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْبِيعِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "بِيعْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْبِيعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْبِيعُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْبِيعْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "بِيعْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "بِيعِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "بِيعُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});