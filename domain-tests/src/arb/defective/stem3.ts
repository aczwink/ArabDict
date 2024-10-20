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

//Source: https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%AF%D9%89#Verb

It("Stem 3", () => {
    throw new Error("TODO verbal noun test :)");
    RunDefectiveParticipleTest("ن-د", 3, "مُنَادٍ", "مُنَادًى");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "نَادَى", gender: "male", person: "third", },
        { expected: "نَادَتْ", gender: "female", person: "third", },
        { expected: "نَادَيْتَ", gender: "male", person: "second" },
        { expected: "نَادَيْتِ", gender: "female", person: "second" },
        { expected: "نَادَيْتُ", gender: "male", person: "first" },

        { expected: "نَادَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "نَادَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "نَادَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "نَادَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "نَادَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "نَادَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "نَادَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "نَادَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُنَادِي", gender: "male", person: "third", tense: "present" },
        { expected: "تُنَادِي", gender: "female", person: "third", tense: "present" },
        { expected: "تُنَادِي", gender: "male", person: "second", tense: "present" },
        { expected: "تُنَادِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُنَادِي", gender: "male", person: "first", tense: "present" },

        { expected: "يُنَادِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُنَادِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُنَادِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُنَادُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُنَادِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُنَادُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُنَادِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُنَادِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُنَادِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُنَادِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُنَادِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُنَادُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُنَادِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُنَادِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُنَادِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُنَادِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُنَادِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُنَادِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُنَادِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُنَادِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُنَادِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُنَادِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُنَادِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُنَادُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُنَادِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُنَادُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُنَادِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُنَادِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "نَادِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "نَادِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "نَادِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "نَادُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "نَادِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "نُودِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "نُودِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "نُودِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "نُودِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "نُودِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "نُودِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "نُودِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "نُودِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "نُودُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "نُودِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "نُودِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "نُودِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "نُودِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُنَادَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُنَادَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُنَادَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُنَادَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُنَادَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُنَادَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُنَادَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُنَادَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُنَادَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُنَادَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُنَادَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُنَادَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُنَادَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُنَادَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُنَادَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُنَادَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُنَادَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُنَادَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنَادَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُنَادَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُنَادَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُنَادَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُنَادَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُنَادَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُنَادَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنَادَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُنَادَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunDefectiveConjugationTest("ن-د", 3, conjugations);
});