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
import { Tashkil } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D9%86%D8%B3%D9%8A#Verb

It("Stem 1 type 3 passive", () => {
    const conjugations: ConjugationTest[] = [
        //past passive
        { voice: "passive", expected: "نُسِيَ", gender: "male", person: "third", },
        { voice: "passive", expected: "نُسِيَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "نُسِيتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "نُسِيتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "نُسِيتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "نُسِيَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "نُسِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "نُسِيتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "نُسُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "نُسِينَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "نُسِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "نُسِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "نُسِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُنْسَى", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُنْسَى", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُنْسَى", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُنْسَيْنَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُنْسَى", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُنْسَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُنْسَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُنْسَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُنْسَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُنْسَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُنْسَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُنْسَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُنْسَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُنْسَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُنْسَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ن-س-ي", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});