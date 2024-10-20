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
import { ConjugationTest, RunConjugationTest } from "../../shared";
import { Tashkil } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%86%D8%AF%D9%8A

It("Stem 1 type 3 with waw as third radical", () => {
    throw new Error("TODO verbal noun test :)");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "نَدِيَ", gender: "male", person: "third", },
        { expected: "نَدِيَتْ", gender: "female", person: "third", },
        { expected: "نَدِيتَ", gender: "male", person: "second" },
        { expected: "نَدِيتِ", gender: "female", person: "second" },
        { expected: "نَدِيتُ", gender: "male", person: "first" },

        { expected: "نَدِيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "نَدِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "نَدِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "نَدُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "نَدِينَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "نَدِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "نَدِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "نَدِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَنْدَى", gender: "male", person: "third", tense: "present" },
        { expected: "تَنْدَى", gender: "female", person: "third", tense: "present" },
        { expected: "تَنْدَى", gender: "male", person: "second", tense: "present" },
        { expected: "تَنْدَيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَنْدَى", gender: "male", person: "first", tense: "present" },

        { expected: "يَنْدَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْدَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْدَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَنْدَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَنْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَنْدَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَنْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَنْدَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَنْدَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَنْدَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَنْدَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَنْدَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَنْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَنْدَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَنْدَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْدَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْدَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَنْدَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَنْدَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَنْدَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْدَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْدَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَنْدَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَنْدَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْدَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَنْدَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِنْدَ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِنْدَيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِنْدَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِنْدَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِنْدَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ن-د-و", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});