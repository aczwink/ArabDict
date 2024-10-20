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

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Hollow_(second-weak)_roots
//Source for participles: https://en.wiktionary.org/wiki/%D9%82%D8%A7%D9%84#Verb

It("Stem 1 past:u, present:u", () => {
    throw new Error("TODO verbal noun test :)");
    RunParticipleTest("ق-و-ل", { middleRadicalTashkil: Tashkil.Dhamma, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, "قَائِل", "مَقُول");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "قَالَ", gender: "male", person: "third", },
        { expected: "قَالَتْ", gender: "female", person: "third", },
        { expected: "قُلْتَ", gender: "male", person: "second" },
        { expected: "قُلْتِ", gender: "female", person: "second" },
        { expected: "قُلْتُ", gender: "male", person: "first" },

        { expected: "قَالَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "قَالَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "قُلْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "قَالُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "قُلْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "قُلْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "قُلْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "قُلْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَقُول", gender: "male", person: "third", tense: "present" },
        { expected: "تَقُول", gender: "female", person: "third", tense: "present" },
        { expected: "تَقُولُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَقُولِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَقُولُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَقُولَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقُولَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقُولَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَقُولُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَقُولُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَقُول", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَقُول", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقُول", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَقُولَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَقُولَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَقُولُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَقُول", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَقُل", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقُل", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقُل", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَقُولِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَقُلْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَقُولَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقُولَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَقُولُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَقُل", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "قُلْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "قُولِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "قُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "قُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "قُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ق-و-ل", { middleRadicalTashkil: Tashkil.Dhamma, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations);
});