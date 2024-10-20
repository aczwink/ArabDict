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

//Source: https://en.wiktionary.org/wiki/%D8%AA%D8%B9%D8%A7%D9%84%D9%89

It("Stem 6", () => {
    throw new Error("TODO verbal noun test :)");
    RunDefectiveParticipleTest("ع-ل", 6, "مُتَعَالٍ", "مُتَعَالًى");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "تَعَالَى", gender: "male", person: "third", },
        { expected: "تَعَالَتْ", gender: "female", person: "third", },
        { expected: "تَعَالَيْتَ", gender: "male", person: "second" },
        { expected: "تَعَالَيْتِ", gender: "female", person: "second" },
        { expected: "تَعَالَيْتُ", gender: "male", person: "first" },

        { expected: "تَعَالَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "تَعَالَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "تَعَالَيْتُمَا", gender: "male", person: "second", numerus: "dual" },

        { expected: "تَعَالَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "تَعَالَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "تَعَالَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "تَعَالَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "تَعَالَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَتَعَالَى", gender: "male", person: "third", tense: "present" },
        { expected: "تَتَعَالَى", gender: "female", person: "third", tense: "present" },
        { expected: "تَتَعَالَى", gender: "male", person: "second", tense: "present" },
        { expected: "تَتَعَالَيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَتَعَالَى", gender: "male", person: "first", tense: "present" },

        { expected: "يَتَعَالَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَعَالَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَعَالَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَتَعَالَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَتَعَالَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَتَعَالَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَتَعَالَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَتَعَالَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَتَعَالَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَتَعَالَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَتَعَالَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَتَعَالَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَتَعَالَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَعَالَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَتَعَالَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَتَعَالَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَتَعَالَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَتَعَالَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَتَعَالَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَتَعَالَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَعَالَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَتَعَالَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "تَعَالَ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "تَعَالَيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "تَعَالَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "تَعَالَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "تَعَالَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest("ع-ل", 6, conjugations);
});