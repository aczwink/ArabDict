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
import { ConjugationTest, RunConjugationTest, RunParticipleTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%A7%D9%83%D8%AA%D8%AA%D8%A8#Arabic

It("Stem 8: اِكْتَتَبَ - يَكْتَتِبُ", () => {
    throw new Error("TODO verbal noun test :)");
    RunParticipleTest("ك-ت-ب", 8, "مُكْتَتِب", "مُكْتَتَب");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِكْتَتَبَ", gender: "male", person: "third", },
        { expected: "اِكْتَتَبَتْ", gender: "female", person: "third", },
        { expected: "اِكْتَتَبْتَ", gender: "male", person: "second" },
        { expected: "اِكْتَتَبْتِ", gender: "female", person: "second" },
        { expected: "اِكْتَتَبْتُ", gender: "male", person: "first" },

        { expected: "اِكْتَتَبَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِكْتَتَبَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِكْتَتَبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِكْتَتَبُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِكْتَتَبْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِكْتَتَبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِكْتَتَبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِكْتَتَبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَكْتَتِبُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَكْتَتِبُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَكْتَتِبُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَكْتَتِبِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَكْتَتِبُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَكْتَتِبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَكْتَتِبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَكْتَتِبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَكْتَتِبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَكْتَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَكْتَتِبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَكْتَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَكْتَتِبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَكْتَتِبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَكْتَتِبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَكْتَتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَكْتَتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَكْتَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَكْتَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَكْتَتِبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَكْتَتِبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَكْتَتِبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَكْتَتِبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَكْتَتِبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَكْتَتِبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَكْتَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَكْتَتِبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِكْتَتِبْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِكْتَتِبِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِكْتَتِبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِكْتَتِبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِكْتَتِبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "اُكْتُتِبَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُكْتُتِبَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُكْتُتِبْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُكْتُتِبْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُكْتُتِبْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُكْتُتِبَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُكْتُتِبَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُكْتُتِبْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُكْتُتِبُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُكْتُتِبْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُكْتُتِبْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُكْتُتِبْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُكْتُتِبْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُكْتَتَبُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُكْتَتَبُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُكْتَتَبَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُكْتَتَبُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُكْتَتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُكْتَتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُكْتَتَبُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُكْتَتَبَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُكْتَتَبَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُكْتَتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُكْتَتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُكْتَتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُكْتَتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُكْتَتَبَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُكْتَتَبْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُكْتَتَبْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُكْتَتَبَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُكْتَتَبُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُكْتَتَبْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُكْتَتَبْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُكْتَتَبْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ك-ت-ب", 8, conjugations);
});