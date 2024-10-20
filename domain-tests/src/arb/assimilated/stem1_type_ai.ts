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

//Source: https://en.wiktionary.org/wiki/%D9%88%D8%AC%D8%AF#Verb

It("Stem 1 - Type Past:a Present:i", () => {
    throw new Error("TODO verbal noun test :)");
    
    RunParticipleTest("و-ج-د", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, "وَاجِد", "مَوْجُود");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "وَجَدَ", gender: "male", person: "third", },
        { expected: "وَجَدَتْ", gender: "female", person: "third", },
        { expected: "وَجَدْتَ", gender: "male", person: "second" },
        { expected: "وَجَدْتِ", gender: "female", person: "second" },
        { expected: "وَجَدْتُ", gender: "male", person: "first" },

        { expected: "وَجَدَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "وَجَدَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "وَجَدْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "وَجَدُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "وَجَدْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "وَجَدْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "وَجَدْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "وَجَدْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَجِدُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَجِدُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَجِدُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَجِدِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَجِدُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَجِدَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَجِدَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَجِدَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَجِدُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَجِدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَجِدُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَجِدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَجِدُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَجِدَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَجِدَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَجِدَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَجِدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَجِدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَجِدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَجِدَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَجِدْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَجِدْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَجِدْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَجِدِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَجِدْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَجِدَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَجِدَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَجِدَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَجِدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَجِدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَجِدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَجِدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَجِدْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "جِدْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "جِدِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "جِدَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "جِدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "جِدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "وُجِدَ", gender: "male", person: "third", },
        { voice: "passive", expected: "وُجِدَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "وُجِدْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "وُجِدْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "وُجِدْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "وُجِدَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُجِدَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُجِدْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "وُجِدُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُجِدْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُجِدْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُجِدْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُجِدْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُوجَدُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوجَدُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوجَدُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُوجَدِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُوجَدُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُوجَدَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوجَدَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوجَدَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُوجَدُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُوجَدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوجَدُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوجَدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُوجَدُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُوجَدَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوجَدَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُوجَدَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُوجَدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُوجَدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوجَدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُوجَدَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُوجَدْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوجَدْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُوجَدَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُوجَدُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُوجَدْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوجَدْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُوجَدْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ج-د", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, conjugations);
});