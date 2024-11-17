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

//Source: https://en.wiktionary.org/wiki/%D8%A3%D9%84%D9%82%D9%89

It("Stem 4", () => {
    const root = "ل-ق"
    const stem = 4;

    RunDefectiveVerbalNounTest(root, stem, "إِلْقَاء");
    RunDefectiveParticipleTest(root, stem, "مُلْقٍ", "مُلْقًى");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "أَلْقَى", gender: "male", person: "third", },
        { expected: "أَلْقَتْ", gender: "female", person: "third", },
        { expected: "أَلْقَيْتَ", gender: "male", person: "second" },
        { expected: "أَلْقَيْتِ", gender: "female", person: "second" },
        { expected: "أَلْقَيْتُ", gender: "male", person: "first" },

        { expected: "أَلْقَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "أَلْقَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "أَلْقَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "أَلْقَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "أَلْقَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "أَلْقَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "أَلْقَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "أَلْقَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُلْقِي", gender: "male", person: "third", tense: "present" },
        { expected: "تُلْقِي", gender: "female", person: "third", tense: "present" },
        { expected: "تُلْقِي", gender: "male", person: "second", tense: "present" },
        { expected: "تُلْقِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُلْقِي", gender: "male", person: "first", tense: "present" },

        { expected: "يُلْقِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُلْقِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُلْقِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُلْقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُلْقِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُلْقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُلْقِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُلْقِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُلْقِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُلْقِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُلْقِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُلْقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُلْقِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُلْقِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُلْقِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُلْقِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُلْقِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُلْقِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُلْقِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُلْقِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُلْقِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُلْقِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُلْقِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُلْقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُلْقِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُلْقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُلْقِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُلْقِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "أَلْقِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "أَلْقِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "أَلْقِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "أَلْقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "أَلْقِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "أُلْقِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "أُلْقِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "أُلْقِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "أُلْقِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "أُلْقِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "أُلْقِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُلْقِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُلْقِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "أُلْقُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُلْقِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُلْقِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُلْقِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُلْقِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُلْقَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُلْقَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُلْقَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُلْقَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُلْقَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُلْقَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُلْقَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُلْقَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُلْقَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُلْقَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُلْقَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُلْقَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُلْقَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُلْقَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُلْقَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُلْقَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُلْقَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُلْقَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُلْقَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُلْقَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُلْقَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُلْقَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُلْقَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُلْقَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُلْقَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُلْقَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُلْقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunDefectiveConjugationTest("ل-ق", 4, conjugations);
});