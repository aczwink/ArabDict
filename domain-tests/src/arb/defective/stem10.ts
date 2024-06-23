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
import { ConjugationTest, RunDefectiveConjugationTest, RunDefectiveParticipleTest } from "../../shared";

It("Stem 10", () => {
    RunDefectiveParticipleTest("ه-د", 10, "مُسْتَهْدٍ", "مُسْتَهْدًى");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِسْتَهْدَى", gender: "male", person: "third", },
        { expected: "اِسْتَهْدَتْ", gender: "female", person: "third", },
        { expected: "اِسْتَهْدَيْتَ", gender: "male", person: "second" },
        { expected: "اِسْتَهْدَيْتِ", gender: "female", person: "second" },
        { expected: "اِسْتَهْدَيْتُ", gender: "male", person: "first" },

        { expected: "اِسْتَهْدَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِسْتَهْدَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِسْتَهْدَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِسْتَهْدَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِسْتَهْدَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِسْتَهْدَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِسْتَهْدَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِسْتَهْدَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَسْتَهْدِي", gender: "male", person: "third", tense: "present" },
        { expected: "تَسْتَهْدِي", gender: "female", person: "third", tense: "present" },
        { expected: "تَسْتَهْدِي", gender: "male", person: "second", tense: "present" },
        { expected: "تَسْتَهْدِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَسْتَهْدِي", gender: "male", person: "first", tense: "present" },

        { expected: "يَسْتَهْدِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَهْدِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَهْدِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَسْتَهْدُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَسْتَهْدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَسْتَهْدُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَسْتَهْدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَسْتَهْدِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَسْتَهْدِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَسْتَهْدِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَسْتَهْدِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَسْتَهْدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَسْتَهْدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَهْدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَسْتَهْدِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَسْتَهْدِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَسْتَهْدِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَسْتَهْدِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَسْتَهْدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَسْتَهْدِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَهْدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَسْتَهْدِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِسْتَهْدِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِسْتَهْدِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِسْتَهْدِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِسْتَهْدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِسْتَهْدِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "اُسْتُهْدِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُسْتُهْدِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُسْتُهْدِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُسْتُهْدِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُسْتُهْدِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُسْتُهْدِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُهْدِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُهْدِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُسْتُهْدُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُهْدِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُهْدِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُهْدِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُهْدِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُسْتَهْدَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُسْتَهْدَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُسْتَهْدَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُسْتَهْدَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُسْتَهْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَهْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُسْتَهْدَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُسْتَهْدَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُسْتَهْدَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُسْتَهْدَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُسْتَهْدَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُسْتَهْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَهْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُسْتَهْدَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُسْتَهْدَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُسْتَهْدَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُسْتَهْدَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُسْتَهْدَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُسْتَهْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَهْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُسْتَهْدَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunDefectiveConjugationTest("ه-د", 10, conjugations);
});