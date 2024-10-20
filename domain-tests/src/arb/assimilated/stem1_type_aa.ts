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
import { Tashkil } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%88%D9%82%D8%B9#Verb

It("Stem 1 - Type Past:a Present:a", () => {
    throw new Error("TODO verbal noun test :)");

    RunParticipleTest("و-ق-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, "وَاقِع", "مَوْقُوع");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "وَقَعَ", gender: "male", person: "third", },
        { expected: "وَقَعَتْ", gender: "female", person: "third", },
        { expected: "وَقَعْتَ", gender: "male", person: "second" },
        { expected: "وَقَعْتِ", gender: "female", person: "second" },
        { expected: "وَقَعْتُ", gender: "male", person: "first" },

        { expected: "وَقَعَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "وَقَعَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "وَقَعْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "وَقَعُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "وَقَعْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "وَقَعْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "وَقَعْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "وَقَعْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَقَعُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَقَعُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَقَعُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَقَعِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَقَعُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَقَعَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقَعَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقَعَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَقَعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَقَعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَقَعُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَقَعَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَقَعَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَقَعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَقَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَقَعَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَقَعْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقَعْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقَعْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَقَعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَقَعْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَقَعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقَعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقَعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَقَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَقَعْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "قَعْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "قَعِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "قَعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "قَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "قَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("و-ق-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});