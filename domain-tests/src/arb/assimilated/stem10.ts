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

//Source: https://en.wiktionary.org/wiki/%D8%A7%D8%B3%D8%AA%D9%88%D8%B7%D9%86

It("Stem 10", () => {
    throw new Error("TODO verbal noun test :)");
    
    RunParticipleTest("و-ط-ن", 10, "مُسْتَوْطِن", "مُسْتَوْطَن");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "اِسْتَوْطَنَ", gender: "male", person: "third", },
        { expected: "اِسْتَوْطَنَتْ", gender: "female", person: "third", },
        { expected: "اِسْتَوْطَنْتَ", gender: "male", person: "second" },
        { expected: "اِسْتَوْطَنْتِ", gender: "female", person: "second" },
        { expected: "اِسْتَوْطَنْتُ", gender: "male", person: "first" },

        { expected: "اِسْتَوْطَنَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "اِسْتَوْطَنَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "اِسْتَوْطَنْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "اِسْتَوْطَنُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "اِسْتَوْطَنَّ", gender: "female", person: "third", numerus: "plural" },
        { expected: "اِسْتَوْطَنْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "اِسْتَوْطَنْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "اِسْتَوْطَنَّا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَسْتَوْطِنُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَسْتَوْطِنُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَسْتَوْطِنُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَسْتَوْطِنِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَسْتَوْطِنُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَسْتَوْطِنَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَوْطِنَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَسْتَوْطِنَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَسْتَوْطِنُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَسْتَوْطِنَّ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَسْتَوْطِنُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَسْتَوْطِنَّ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَسْتَوْطِنُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَسْتَوْطِنَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَسْتَوْطِنَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَسْتَوْطِنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَسْتَوْطِنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَسْتَوْطِنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَسْتَوْطِنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَسْتَوْطِنَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَسْتَوْطِنْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَسْتَوْطِنْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَسْتَوْطِنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَسْتَوْطِنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَسْتَوْطِنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَسْتَوْطِنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَسْتَوْطِنْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِسْتَوْطِنْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِسْتَوْطِنِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِسْتَوْطِنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِسْتَوْطِنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِسْتَوْطِنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "اُسْتُوطِنَ", gender: "male", person: "third", },
        { voice: "passive", expected: "اُسْتُوطِنَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "اُسْتُوطِنْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "اُسْتُوطِنْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "اُسْتُوطِنْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "اُسْتُوطِنَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُوطِنَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "اُسْتُوطِنْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "اُسْتُوطِنُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُوطِنَّ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُوطِنْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُوطِنْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "اُسْتُوطِنَّا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُسْتَوْطَنُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُسْتَوْطَنُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُسْتَوْطَنَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُسْتَوْطَنُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُسْتَوْطَنَّ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُسْتَوْطَنَّ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُسْتَوْطَنُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُسْتَوْطَنَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُسْتَوْطَنَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُسْتَوْطَنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُسْتَوْطَنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُسْتَوْطَنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُسْتَوْطَنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُسْتَوْطَنَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُسْتَوْطَنْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُسْتَوْطَنْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُسْتَوْطَنَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُسْتَوْطَنُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُسْتَوْطَنَّ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُسْتَوْطَنَّ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُسْتَوْطَنْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ط-ن", 10, conjugations);
});