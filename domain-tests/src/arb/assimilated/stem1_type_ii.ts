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

//Source: https://en.wiktionary.org/wiki/%D9%88%D9%81%D9%82#Verb

It("Stem 1 - Type Past:i Present:i", () => {
    throw new Error("TODO verbal noun test :)");
    
    RunParticipleTest("و-ف-ق", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, "وَافِق", "مَوْفُوق");
    
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "وَفِقَ", gender: "male", person: "third", },
        { expected: "وَفِقَتْ", gender: "female", person: "third", },
        { expected: "وَفِقْتَ", gender: "male", person: "second" },
        { expected: "وَفِقْتِ", gender: "female", person: "second" },
        { expected: "وَفِقْتُ", gender: "male", person: "first" },

        { expected: "وَفِقَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "وَفِقَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "وَفِقْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "وَفِقُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "وَفِقْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "وَفِقْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "وَفِقْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "وَفِقْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَفِقُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَفِقُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَفِقُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَفِقِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَفِقُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَفِقَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَفِقَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَفِقَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَفِقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَفِقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَفِقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَفِقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَفِقُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَفِقَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَفِقَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَفِقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَفِقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَفِقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَفِقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَفِقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَفِقْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَفِقْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَفِقْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَفِقِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَفِقْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَفِقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَفِقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَفِقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَفِقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَفِقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَفِقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَفِقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَفِقْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "فِقْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "فِقِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "فِقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "فِقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "فِقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "وُفِقَ", gender: "male", person: "third", },
        { voice: "passive", expected: "وُفِقَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "وُفِقْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "وُفِقْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "وُفِقْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "وُفِقَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُفِقَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُفِقْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "وُفِقُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُفِقْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُفِقْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُفِقْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُفِقْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُوفَقُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوفَقُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوفَقُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُوفَقِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُوفَقُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُوفَقَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوفَقَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوفَقَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُوفَقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُوفَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوفَقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوفَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُوفَقُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُوفَقَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوفَقَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُوفَقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُوفَقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُوفَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوفَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُوفَقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُوفَقْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوفَقْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُوفَقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُوفَقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُوفَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوفَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُوفَقْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ف-ق", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, conjugations);
});