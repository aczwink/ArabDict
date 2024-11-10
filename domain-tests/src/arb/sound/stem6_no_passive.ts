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
import { ConjugationTest, RunConjugationTest, RunParticipleTest, RunVerbalNounTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%AA%D9%83%D8%A7%D8%AA%D8%A8#Arabic

It("Stem 6: تَكَاتَبَ - يُكَتِّبُ", () => {
    const root = "ك-ت-ب"
    const stem = 6;

    RunVerbalNounTest(root, stem, "تَكَاتُب");
    RunParticipleTest(root, stem, "مُتَكَاتِب", "مُتَكَاتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "تَكَاتَبَ", gender: "male", person: "third", },
        { expected: "تَكَاتَبَتْ", gender: "female", person: "third", },
        { expected: "تَكَاتَبْتَ", gender: "male", person: "second" },
        { expected: "تَكَاتَبْتِ", gender: "female", person: "second" },
        { expected: "تَكَاتَبْتُ", gender: "male", person: "first" },

        { expected: "تَكَاتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "تَكَاتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "تَكَاتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "تَكَاتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "تَكَاتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "تَكَاتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "تَكَاتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "تَكَاتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَتَكَاتَبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَتَكَاتَبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَتَكَاتَبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَتَكَاتَبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَتَكَاتَبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَتَكَاتَبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَكَاتَبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَكَاتَبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَتَكَاتَبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَتَكَاتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَتَكَاتَبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَتَكَاتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَتَكَاتَبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَتَكَاتَبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَتَكَاتَبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَتَكَاتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَتَكَاتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَتَكَاتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَكَاتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَتَكَاتَبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَتَكَاتَبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَتَكَاتَبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَتَكَاتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَتَكَاتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَتَكَاتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَكَاتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَتَكَاتَبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "تَكَاتَبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "تَكَاتَبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "تَكَاتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "تَكَاتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "تَكَاتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ك-ت-ب", 6, conjugations);
});