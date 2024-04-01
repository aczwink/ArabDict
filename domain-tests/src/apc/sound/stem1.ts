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
import { ConjugationTest, RunConjugationTest } from "../../shared";
import { DialectType } from "arabdict-domain/dist/Conjugator";
import { Tashkil } from "arabdict-domain/dist/Definitions";

//Source: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar#Regular_verb_conjugation

It("apc: Stem1 basic conjugation test", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "كَتَبْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "كَتَبِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "كَتَبِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "كَتَبْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "كَتَبِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "كَتَبُو" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "كَتَبْتُو" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "كَتَبْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِكْتُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِكْتُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِكْتُبْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِكْتْبِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِكْتُبْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِكْتْبُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِكْتْبُو" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِكْتُبْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِكْتُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِكْتُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِكْتُبْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِكْتْبِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "اِكْتُبْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِكْتْبُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِكْتْبُو" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِكْتُبْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "كْتُوبْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "كْتِبِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "كْتِبُو" },
    ];

    RunConjugationTest("ك-ت-ب", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations, DialectType.NorthLevantineArabic);
});