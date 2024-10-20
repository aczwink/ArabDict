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
import { ConjugationTest, RunConjugationTest, RunDefectiveParticipleTest } from "../../shared";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_roots
//and for participles: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_verbs

It("Wikipedia defective stem1 type 2", () => {
    throw new Error("TODO verbal noun test :)");
    RunDefectiveParticipleTest("ف-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, "فَاعٍ", "مَفْعُوّ");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "دَعَا", gender: "male", person: "third", },
        { expected: "دَعَتْ", gender: "female", person: "third", },
        { expected: "دَعَوْتَ", gender: "male", person: "second" },
        { expected: "دَعَوْتِ", gender: "female", person: "second" },
        { expected: "دَعَوْتُ", gender: "male", person: "first" },

        { expected: "دَعَوَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "دَعَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "دَعَوْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "دَعَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "دَعَوْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "دَعَوْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "دَعَوْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "دَعَوْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَدْعُو", gender: "male", person: "third", tense: "present" },
        { expected: "تَدْعُو", gender: "female", person: "third", tense: "present" },
        { expected: "تَدْعُو", gender: "male", person: "second", tense: "present" },
        { expected: "تَدْعِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَدْعُو", gender: "male", person: "first", tense: "present" },

        { expected: "يَدْعُوَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَدْعُوَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَدْعُوَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَدْعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَدْعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَدْعُو", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَدْعُوَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَدْعُوَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَدْعُوَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَدْعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَدْعُوَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَدْعُ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَدْعُ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَدْعُ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَدْعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَدْعُ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَدْعُوَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَدْعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَدْعُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اُدْعُ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اُدْعِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اُدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اُدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اُدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("د-ع-و", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations);
});