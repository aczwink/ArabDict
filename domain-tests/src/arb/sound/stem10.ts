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

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%B3%D8%AA%D9%83%D8%AA%D8%A8#Arabic

It("Stem 10: اِسْتَكْتَبَ - يَسْتَكْتِبُ", () => {
    const root = "ك-ت-ب"
    const stem = 10;
    
    RunVerbalNounTest(root, stem, "اِسْتِكْتَاب");
    RunParticipleTest(root, stem, "مُسْتَكْتِب", "مُسْتَكْتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِسْتَكْتَبَ", gender: "male", person: "third", },
        { expected: "اِسْتَكْتَبَتْ", gender: "female", person: "third", },
        { expected: "اِسْتَكْتَبْتَ", gender: "male", person: "second" },
        { expected: "اِسْتَكْتَبْتِ", gender: "female", person: "second" },
        { expected: "اِسْتَكْتَبْتُ", gender: "male", person: "first" },

        { expected: "اِسْتَكْتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِسْتَكْتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِسْتَكْتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِسْتَكْتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِسْتَكْتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِسْتَكْتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِسْتَكْتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِسْتَكْتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَسْتَكْتِبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَسْتَكْتِبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَسْتَكْتِبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَسْتَكْتِبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَسْتَكْتِبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَسْتَكْتِبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَكْتِبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَكْتِبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَسْتَكْتِبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَسْتَكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَسْتَكْتِبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَسْتَكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَسْتَكْتِبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَسْتَكْتِبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَسْتَكْتِبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَسْتَكْتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَسْتَكْتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَسْتَكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَسْتَكْتِبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَسْتَكْتِبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَسْتَكْتِبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَسْتَكْتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَسْتَكْتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَسْتَكْتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَسْتَكْتِبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِسْتَكْتِبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِسْتَكْتِبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِسْتَكْتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِسْتَكْتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِسْتَكْتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "اُسْتُكْتِبَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُسْتُكْتِبَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُسْتُكْتِبْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُسْتُكْتِبْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُسْتُكْتِبْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُسْتُكْتِبَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُكْتِبَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُكْتِبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُسْتُكْتِبُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُكْتِبْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُكْتِبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُكْتِبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُكْتِبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُسْتَكْتَبُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُسْتَكْتَبُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُسْتَكْتَبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُسْتَكْتَبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُسْتَكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُسْتَكْتَبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُسْتَكْتَبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُسْتَكْتَبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُسْتَكْتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُسْتَكْتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُسْتَكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُسْتَكْتَبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُسْتَكْتَبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُسْتَكْتَبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُسْتَكْتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُسْتَكْتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُسْتَكْتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَكْتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُسْتَكْتَبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ك-ت-ب", 10, conjugations);
});