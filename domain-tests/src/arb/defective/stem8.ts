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
import { ConjugationTest, RunDefectiveConjugationTest, RunDefectiveParticipleTest, RunDefectiveVerbalNounTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%82%D8%AA%D8%AF%D9%89

It("Stem 8", () => {
    const root = "ق-د"
    const stem = 8;
    RunDefectiveVerbalNounTest(root, stem, "اِقْتِدَاء");
    RunDefectiveParticipleTest(root, stem, "مُقْتَدٍ", "مُقْتَدًى");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِقْتَدَى", gender: "male", person: "third", },
        { expected: "اِقْتَدَتْ", gender: "female", person: "third", },
        { expected: "اِقْتَدَيْتَ", gender: "male", person: "second" },
        { expected: "اِقْتَدَيْتِ", gender: "female", person: "second" },
        { expected: "اِقْتَدَيْتُ", gender: "male", person: "first" },

        { expected: "اِقْتَدَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِقْتَدَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِقْتَدَيْتُمَا", gender: "male", person: "second", numerus: "dual" },

        { expected: "اِقْتَدَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِقْتَدَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِقْتَدَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِقْتَدَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِقْتَدَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَقْتَدِي", gender: "male", person: "third", tense: "present" },
        { expected: "تَقْتَدِي", gender: "female", person: "third", tense: "present" },
        { expected: "تَقْتَدِي", gender: "male", person: "second", tense: "present" },
        { expected: "تَقْتَدِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَقْتَدِي", gender: "male", person: "first", tense: "present" },

        { expected: "يَقْتَدِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقْتَدِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقْتَدِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَقْتَدُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَقْتَدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَقْتَدُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَقْتَدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَقْتَدِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَقْتَدِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَقْتَدِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَقْتَدِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَقْتَدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَقْتَدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقْتَدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَقْتَدِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَقْتَدِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَقْتَدِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَقْتَدِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَقْتَدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَقْتَدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقْتَدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَقْتَدِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِقْتَدِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِقْتَدِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِقْتَدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِقْتَدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِقْتَدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest("ق-د", 8, conjugations);
});