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
import { ConjugationTest, RunDefectiveConjugationTest, RunDefectiveParticipleTest, RunVerbalNounTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%AA%D8%AC%D9%86%D9%89

It("Stem 5", () => {
    const root = "ج-ن"
    const stem = 5;

    RunVerbalNounTest(root, stem, "تَجَنٍّ");
    RunDefectiveParticipleTest(root, stem, "مُتَجَنٍّ", "مُتَجَنًّى");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "تَجَنَّى", gender: "male", person: "third", },
        { expected: "تَجَنَّتْ", gender: "female", person: "third", },
        { expected: "تَجَنَّيْتَ", gender: "male", person: "second" },
        { expected: "تَجَنَّيْتِ", gender: "female", person: "second" },
        { expected: "تَجَنَّيْتُ", gender: "male", person: "first" },

        { expected: "تَجَنَّيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "تَجَنَّتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "تَجَنَّيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "تَجَنَّوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "تَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "تَجَنَّيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "تَجَنَّيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "تَجَنَّيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَتَجَنَّى", gender: "male", person: "third", tense: "present" },
        { expected: "تَتَجَنَّى", gender: "female", person: "third", tense: "present" },
        { expected: "تَتَجَنَّى", gender: "male", person: "second", tense: "present" },
        { expected: "تَتَجَنَّيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَتَجَنَّى", gender: "male", person: "first", tense: "present" },

        { expected: "يَتَجَنَّيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَجَنَّيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَجَنَّيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَتَجَنَّوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَتَجَنَّوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَتَجَنَّى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَتَجَنَّى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَتَجَنَّى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَتَجَنَّيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَتَجَنَّوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَتَجَنَّى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَتَجَنَّ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَتَجَنَّ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَتَجَنَّيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَتَجَنَّوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَتَجَنَّ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "تَجَنَّ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "تَجَنَّيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "تَجَنَّيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "تَجَنَّوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "تَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "تُجُنِّيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "تُجُنِّيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "تُجُنِّيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "تُجُنِّيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "تُجُنِّيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "تُجُنِّيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "تُجُنِّيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "تُجُنِّيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "تُجُنُّوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "تُجُنِّينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "تُجُنِّيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "تُجُنِّيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "تُجُنِّينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُتَجَنَّى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُتَجَنَّى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُتَجَنَّيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُتَجَنَّوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُتَجَنَّى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُتَجَنَّى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُتَجَنَّى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَجَنَّيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُتَجَنَّوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُتَجَنَّى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُتَجَنَّ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُتَجَنَّ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَجَنَّيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُتَجَنَّوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُتَجَنَّيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَجَنَّيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُتَجَنَّ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunDefectiveConjugationTest("ج-ن", 5, conjugations);
});