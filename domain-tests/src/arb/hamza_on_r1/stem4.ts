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

//Source: https://en.wiktionary.org/wiki/%D8%A2%D9%84%D9%85

It("Stem 4", () => {
    RunParticipleTest("ء-ل-م", 4, "مُؤْلِم", "مُؤْلَم");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "آلَمَ", gender: "male", person: "third", },
        { expected: "آلَمَتْ", gender: "female", person: "third", },
        { expected: "آلَمْتَ", gender: "male", person: "second" },
        { expected: "آلَمْتِ", gender: "female", person: "second" },
        { expected: "آلَمْتُ", gender: "male", person: "first" },

        { expected: "آلَمَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "آلَمَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "آلَمْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "آلَمُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "آلَمْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "آلَمْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "آلَمْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "آلَمْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُؤْلِمُ", gender: "male", person: "third", tense: "present" },
        { expected: "تُؤْلِمُ", gender: "female", person: "third", tense: "present" },
        { expected: "تُؤْلِمُ", gender: "male", person: "second", tense: "present" },
        { expected: "تُؤْلِمِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُولِمُ", gender: "male", person: "first", tense: "present" },

        { expected: "يُؤْلِمَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُؤْلِمَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُؤْلِمَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُؤْلِمُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُؤْلِمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُؤْلِمُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُؤْلِمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُؤْلِمُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُؤْلِمَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُولِمَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُؤْلِمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُؤْلِمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُؤْلِمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُؤْلِمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُؤْلِمَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُؤْلِمْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُولِمْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُؤْلِمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُؤْلِمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُؤْلِمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُؤْلِمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُؤْلِمْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "آلِمْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "آلِمِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "آلِمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "آلِمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "آلِمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "أُولِمَ", gender: "male", person: "third", },
        { voice: "passive", expected: "أُولِمَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "أُولِمْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "أُولِمْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "أُولِمْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "أُولِمَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُولِمَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُولِمْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "أُولِمُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُولِمْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُولِمْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُولِمْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُولِمْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُؤْلَمُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُولَمُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُؤْلَمَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُؤْلَمُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُؤْلَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُؤْلَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُؤْلَمُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُؤْلَمَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُولَمَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُؤْلَمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُؤْلَمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُؤْلَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْلَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُؤْلَمَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُؤْلَمْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُولَمْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُؤْلَمَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُؤْلَمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُؤْلَمْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْلَمْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُؤْلَمْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ء-ل-م", 4, conjugations);
});