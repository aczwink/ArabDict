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

//Source: https://en.wiktionary.org/wiki/%D8%A3%D9%88%D9%82%D8%B9

It("Stem 4", () => {
    RunParticipleTest("و-ق-ع", 4, "مُوقِع", "مُوقَع");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "أَوْقَعَ", gender: "male", person: "third", },
        { expected: "أَوْقَعَتْ", gender: "female", person: "third", },
        { expected: "أَوْقَعْتَ", gender: "male", person: "second" },
        { expected: "أَوْقَعْتِ", gender: "female", person: "second" },
        { expected: "أَوْقَعْتُ", gender: "male", person: "first" },

        { expected: "أَوْقَعَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "أَوْقَعَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "أَوْقَعْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "أَوْقَعُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "أَوْقَعْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "أَوْقَعْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "أَوْقَعْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "أَوْقَعْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يُوقِعُ", gender: "male", person: "third", tense: "present" },
        { expected: "تُوقِعُ", gender: "female", person: "third", tense: "present" },
        { expected: "تُوقِعُ", gender: "male", person: "second", tense: "present" },
        { expected: "تُوقِعِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أُوقِعُ", gender: "male", person: "first", tense: "present" },

        { expected: "يُوقِعَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُوقِعَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تُوقِعَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يُوقِعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يُوقِعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تُوقِعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تُوقِعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نُوقِعُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يُوقِعَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أُوقِعَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يُوقِعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يُوقِعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يُوقِعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تُوقِعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نُوقِعَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يُوقِعْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُوقِعْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تُوقِعْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تُوقِعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أُوقِعْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يُوقِعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُوقِعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تُوقِعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يُوقِعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يُوقِعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُوقِعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تُوقِعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نُوقِعْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "أَوْقِعْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "أَوْقِعِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "أَوْقِعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "أَوْقِعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "أَوْقِعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "أُوقِعَ", gender: "male", person: "third", },
        { voice: "passive", expected: "أُوقِعَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "أُوقِعْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "أُوقِعْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "أُوقِعْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "أُوقِعَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُوقِعَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "أُوقِعْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "أُوقِعُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُوقِعْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "أُوقِعْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُوقِعْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "أُوقِعْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُوقَعُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوقَعُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوقَعُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُوقَعِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُوقَعُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُوقَعَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوقَعَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوقَعَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُوقَعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُوقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوقَعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُوقَعُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُوقَعَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوقَعَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُوقَعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُوقَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُوقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُوقَعَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُوقَعْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوقَعْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُوقَعَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُوقَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُوقَعْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوقَعْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُوقَعْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ق-ع", 4, conjugations);
});