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
import { ConjugationTest, RunConjugationTest, RunParticipleTest, RunVerbalNounPatternTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D9%83%D8%A7%D8%AA%D8%A8#Arabic

It("Stem 3: كَاتَبَ - يُكَاتِبُ", () => {
    const root = "ك-ت-ب";
    const stem = 3;

    RunVerbalNounPatternTest(stem, [
        { rootRadicals: root, expected: "مُكَاتَبَة" },
        //Source: https://en.wiktionary.org/wiki/%D8%AD%D8%A7%D9%81%D8%B8#Arabic
        { rootRadicals: "ح-ف-ظ", expected: "حِفَاظ" },
    ]);
    RunParticipleTest(root, stem, "مُكَاتِب", "مُكَاتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "كَاتَبَ", gender: "male", person: "third", },
        { expected: "كَاتَبَتْ", gender: "female", person: "third", },
        { expected: "كَاتَبْتَ", gender: "male", person: "second" },
        { expected: "كَاتَبْتِ", gender: "female", person: "second" },
        { expected: "كَاتَبْتُ", gender: "male", person: "first" },

        { expected: "كَاتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "كَاتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "كَاتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "كَاتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "كَاتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "كَاتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "كَاتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "كَاتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُكَاتِبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تُكَاتِبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تُكَاتِبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تُكَاتِبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُكَاتِبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يُكَاتِبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُكَاتِبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُكَاتِبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُكَاتِبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُكَاتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُكَاتِبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُكَاتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُكَاتِبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُكَاتِبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُكَاتِبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُكَاتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُكَاتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُكَاتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُكَاتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُكَاتِبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُكَاتِبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُكَاتِبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُكَاتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُكَاتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُكَاتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُكَاتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُكَاتِبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "كَاتِبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "كَاتِبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "كَاتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "كَاتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "كَاتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ك-ت-ب", 3, conjugations);
});