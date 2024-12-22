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
//Table: 16
//Modifications: Present singular 2nd person and 3rd person singular female have a shadda on the ta

It("Stem 1", () => {
    const root = "ت-ل-ف-ن";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Sukun, middleRadicalTashkilPresent: Tashkil.Sukun, soundOverride: false };

    RunActiveParticipleTest(root, stem, "مْتَلْفِن", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "تَلْفَنْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "تَلْفَنِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "تَلْفَنِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "تَلْفَنْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "تَلْفَنِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "تَلْفَنُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "تَلْفَنْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "تَلْفَنَّا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيتَلْفِنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتَّلْفِنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتَّلْفِنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتَّلْفْنِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْتَلْفِنْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيتَلْفْنُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتَّلْفْنُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْتَلْفِنْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْتَلْفِنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْتَلْفِنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْتَلْفِنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْتَلْفْنِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "تَلْفِنْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْتَلْفْنُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْتَلْفْنُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْتَلْفِنْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "تَلْفِنْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "تَلْفْنِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "تَلْفْنُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});