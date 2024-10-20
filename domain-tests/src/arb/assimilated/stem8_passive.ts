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

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%AA%D9%87%D9%85

It("Stem 8 passive", () => {
    throw new Error("TODO verbal noun test :)");
    
    const conjugations: ConjugationTest[] = [
        //past passive
        { voice: "passive", expected: "اُتُّهِمَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُتُّهِمَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُتُّهِمْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُتُّهِمْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُتُّهِمْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُتُّهِمَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُتُّهِمَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُتُّهِمْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُتُّهِمُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُتُّهِمْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُتُّهِمْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُتُّهِمْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُتُّهِمْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُتَّهَمُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُتَّهَمُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُتَّهَمَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُتَّهَمُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُتَّهَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُتَّهَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُتَّهَمُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُتَّهَمَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُتَّهَمَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُتَّهَمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُتَّهَمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُتَّهَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُتَّهَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُتَّهَمَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُتَّهَمْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُتَّهَمْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُتَّهَمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُتَّهَمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُتَّهَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُتَّهَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُتَّهَمْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ه-م", 8, conjugations);
});