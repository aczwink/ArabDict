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

//Source: https://en.wiktionary.org/wiki/%D8%AA%D8%B6%D9%85%D9%86

It("Stem 5", () => {
    RunParticipleTest("ض-م-ن", 5, "مُتَضَمِّن", "مُتَضَمَّن");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "تَضَمَّنَ", gender: "male", person: "third", },
        { expected: "تَضَمَّنَتْ", gender: "female", person: "third", },
        { expected: "تَضَمَّنْتَ", gender: "male", person: "second" },
        { expected: "تَضَمَّنْتِ", gender: "female", person: "second" },
        { expected: "تَضَمَّنْتُ", gender: "male", person: "first" },

        { expected: "تَضَمَّنَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "تَضَمَّنَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "تَضَمَّنْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "تَضَمَّنُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "تَضَمَّنَّ", gender: "female", person: "third", numerus: "plural" },
        { expected: "تَضَمَّنْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "تَضَمَّنْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "تَضَمَّنَّا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَتَضَمَّنُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَتَضَمَّنُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَتَضَمَّنُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَتَضَمَّنِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَتَضَمَّنُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَتَضَمَّنَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَضَمَّنَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَتَضَمَّنَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَتَضَمَّنُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَتَضَمَّنُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَتَضَمَّنُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَتَضَمَّنَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَتَضَمَّنَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَتَضَمَّنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَتَضَمَّنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَتَضَمَّنَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَتَضَمَّنْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَتَضَمَّنْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَتَضَمَّنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَتَضَمَّنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَتَضَمَّنْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "تَضَمَّنْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "تَضَمَّنِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "تَضَمَّنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "تَضَمَّنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "تَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "تُضُمِّنَ", gender: "male", person: "third", },
        { voice: "passive", expected: "تُضُمِّنَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "تُضُمِّنْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "تُضُمِّنْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "تُضُمِّنْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "تُضُمِّنَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "تُضُمِّنَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "تُضُمِّنْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "تُضُمِّنُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "تُضُمِّنَّ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "تُضُمِّنْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "تُضُمِّنْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "تُضُمِّنَّا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُتَضَمَّنُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُتَضَمَّنُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُتَضَمَّنَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُتَضَمَّنُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُتَضَمَّنُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُتَضَمَّنَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُتَضَمَّنَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَضَمَّنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُتَضَمَّنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُتَضَمَّنَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُتَضَمَّنْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُتَضَمَّنْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَضَمَّنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُتَضَمَّنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُتَضَمَّنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَضَمَّنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُتَضَمَّنْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ض-م-ن", 5, conjugations);
});