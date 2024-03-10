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
import { FATHA, KASRA } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%88%D8%B9%D9%89

It("doubly weak verb وَعَى test", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "وَعَى", gender: "male", person: "third", },
        { expected: "وَعَتْ", gender: "female", person: "third", },
        { expected: "وَعَيْتَ", gender: "male", person: "second" },
        { expected: "وَعَيْتِ", gender: "female", person: "second" },
        { expected: "وَعَيْتُ", gender: "male", person: "first" },

        { expected: "وَعَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "وَعَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "وَعَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "وَعَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "وَعَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "وَعَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "وَعَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "وَعَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَعِي", gender: "male", person: "third", tense: "present" },
        { expected: "تَعِي", gender: "female", person: "third", tense: "present" },
        { expected: "تَعِي", gender: "male", person: "second", tense: "present" },
        { expected: "تَعِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَعِي", gender: "male", person: "first", tense: "present" },

        { expected: "يَعِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَعِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَعِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَعِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَعِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَعِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَعِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَعِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَعِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَعِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَعِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَعِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَعِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَعِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَعِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَعِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَعِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَعِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَعِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَعِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَعِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَعِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "عِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "عِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "عِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "عُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "عِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "وُعِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "وُعِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "وُعِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "وُعِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "وُعِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "وُعِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُعِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "وُعِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "وُعُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُعِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "وُعِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُعِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "وُعِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُوعَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوعَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُوعَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُوعَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُوعَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُوعَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوعَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُوعَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُوعَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُوعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوعَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُوعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُوعَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُوعَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوعَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُوعَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُوعَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُوعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُوعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُوعَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُوعَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوعَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُوعَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُوعَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُوعَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُوعَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُوعَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("و-ع-ي", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, conjugations);
});