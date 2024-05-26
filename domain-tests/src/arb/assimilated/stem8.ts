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

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%AA%D8%AC%D9%87

It("Stem 8", () => {
    //Source for passive participle: https://en.wikipedia.org/wiki/Arabic_verbs#Assimilated_(first-weak)_verbs
    RunParticipleTest("و-ج-ه", 8, "مُتَّجِه", "مُتَّجَه");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِتَّجَهَ", gender: "male", person: "third", },
        { expected: "اِتَّجَهَتْ", gender: "female", person: "third", },
        { expected: "اِتَّجَهْتَ", gender: "male", person: "second" },
        { expected: "اِتَّجَهْتِ", gender: "female", person: "second" },
        { expected: "اِتَّجَهْتُ", gender: "male", person: "first" },

        { expected: "اِتَّجَهَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِتَّجَهَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِتَّجَهْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِتَّجَهُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِتَّجَهْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِتَّجَهْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِتَّجَهْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِتَّجَهْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَتَّجِهُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَتَّجِهُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَتَّجِهُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَتَّجِهِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَتَّجِهُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَتَّجِهَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَّجِهَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَّجِهَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَتَّجِهُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَتَّجِهْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَتَّجِهُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَتَّجِهْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَتَّجِهُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَتَّجِهَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَتَّجِهَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَتَّجِهَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَتَّجِهُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَتَّجِهْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَّجِهْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَتَّجِهَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَتَّجِهْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَتَّجِهْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَتَّجِهَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَتَّجِهُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَتَّجِهْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَّجِهْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَتَّجِهْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِتَّجِهْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِتَّجِهِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِتَّجِهَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِتَّجِهُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِتَّجِهْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("و-ج-ه", 8, conjugations);
});