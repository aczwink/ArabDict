/**
 * ArabDict
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
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
import { Tashkil } from "arabdict-domain/dist/Definitions";
import { ConjugationTest, RunDefectiveConjugationTest, RunDefectiveParticipleTest } from "../../shared";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_roots
//and for participles: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_verbs

It("Wikipedia defective stem1 type 3", () => {
    RunDefectiveParticipleTest("ف-ع", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, "فَاعٍ", "مَفْعِيّ");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "نَسِيَ", gender: "male", person: "third", },
        { expected: "نَسِيَتْ", gender: "female", person: "third", },
        { expected: "نَسِيتَ", gender: "male", person: "second" },
        { expected: "نَسِيتِ", gender: "female", person: "second" },
        { expected: "نَسِيتُ", gender: "male", person: "first" },

        { expected: "نَسِيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "نَسِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "نَسِيتُمَا", gender: "male", person: "second", numerus: "dual" },

        { expected: "نَسُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "نَسِينَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "نَسِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "نَسِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "نَسِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَنْسَى", gender: "male", person: "third", tense: "present" },
        { expected: "تَنْسَى", gender: "female", person: "third", tense: "present" },
        { expected: "تَنْسَى", gender: "male", person: "second", tense: "present" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَنْسَى", gender: "male", person: "first", tense: "present" },

        { expected: "يَنْسَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْسَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْسَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَنْسَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَنْسَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَنْسَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَنْسَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَنْسَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْسَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْسَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَنْسَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَنْسَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِنْسَ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِنْسَيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest("ن-س", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});