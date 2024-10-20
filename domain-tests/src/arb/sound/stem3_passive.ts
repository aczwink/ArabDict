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

//Source: https://en.wiktionary.org/wiki/%D9%81%D8%A7%D8%B1%D9%82

It("Stem 3 passive", () => {
    throw new Error("TODO verbal noun test :)");
    const conjugations: ConjugationTest[] = [
        //past passive
        { voice: "passive", expected: "فُورِقَ", gender: "male", person: "third", },
        { voice: "passive", expected: "فُورِقَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "فُورِقْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "فُورِقْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "فُورِقْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "فُورِقَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "فُورِقَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "فُورِقْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "فُورِقُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "فُورِقْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "فُورِقْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "فُورِقْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "فُورِقْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُفَارَقُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُفَارَقُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُفَارَقُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُفَارَقِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُفَارَقُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُفَارَقَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُفَارَقَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُفَارَقَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُفَارَقُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُفَارَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُفَارَقُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُفَارَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُفَارَقُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُفَارَقَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُفَارَقَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُفَارَقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُفَارَقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُفَارَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُفَارَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُفَارَقَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُفَارَقْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُفَارَقْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُفَارَقَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُفَارَقُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُفَارَقْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُفَارَقْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُفَارَقْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ف-ر-ق", 3, conjugations);
});