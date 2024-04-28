/**
 * ArabDict
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
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

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Hollow_(second-weak)_roots

It("Stem 1 قَالَ - يَقُول", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "قَالَ", gender: "male", person: "third", },
        { expected: "قَالَتْ", gender: "female", person: "third", },
        { expected: "قُلْتَ", gender: "male", person: "second" },
        { expected: "قُلْتِ", gender: "female", person: "second" },
        { expected: "قُلْتُ", gender: "male", person: "first" },

        { expected: "قَالَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "قَالَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "قُلْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "قَالُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "قُلْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "قُلْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "قُلْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "قُلْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَقُول", gender: "male", person: "third", tense: "present" },
        { expected: "تَقُول", gender: "female", person: "third", tense: "present" },
        { expected: "تَقُولُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَقُولِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَقُولُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَقُولَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقُولَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَقُولَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَقُولُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَقُولُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَقُول", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَقُول", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقُول", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَقُولَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَقُولَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَقُولُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَقُول", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَقُل", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقُل", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَقُل", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَقُولِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَقُلْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَقُولَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقُولَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَقُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَقُولُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَقُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَقُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَقُل", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "قُلْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "قُولِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "قُولَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "قُولُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "قُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ق-و-ل", { middleRadicalTashkil: Tashkil.Dhamma, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations);
});

//Source: https://en.wiktionary.org/wiki/%D8%AE%D8%A7%D9%81#Verb

It("Stem 1 خَافَ - يَخَافُ", () => {
    RunParticipleTest("خ-و-ف", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, "خَائِف", "مَخُوف");

    const conjugations: ConjugationTest[] = [
        //past
        { expected: "خَافَ", gender: "male", person: "third", },
        { expected: "خَافَتْ", gender: "female", person: "third", },
        { expected: "خِفْتَ", gender: "male", person: "second" },
        { expected: "خِفْتِ", gender: "female", person: "second" },
        { expected: "خِفْتُ", gender: "male", person: "first" },

        { expected: "خَافَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "خَافَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "خِفْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "خَافُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "خِفْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "خِفْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "خِفْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "خِفْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَخَافُ", gender: "male", person: "third", tense: "present" },
        { expected: "تَخَافُ", gender: "female", person: "third", tense: "present" },
        { expected: "تَخَافُ", gender: "male", person: "second", tense: "present" },
        { expected: "تَخَافِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَخَافُ", gender: "male", person: "first", tense: "present" },

        { expected: "يَخَافَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَخَافَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَخَافَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَخَافُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَخَافُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَخَافُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَخَافَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَخَافَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَخَافَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَخَفْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَخَفْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَخَفْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَخَافِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَخَفْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَخَفْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "خَفْ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "خَافِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "خَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "خَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "خَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //past passive
        { voice: "passive", expected: "خِيفَ", gender: "male", person: "third", },
        { voice: "passive", expected: "خِيفَتْ", gender: "female", person: "third", },
        { voice: "passive", expected: "خِفْتَ", gender: "male", person: "second" },
        { voice: "passive", expected: "خِفْتِ", gender: "female", person: "second" },
        { voice: "passive", expected: "خِفْتُ", gender: "male", person: "first" },

        { voice: "passive", expected: "خِيفَا", gender: "male", person: "third", numerus: "dual" },
        { voice: "passive", expected: "خِيفَتَا", gender: "female", person: "third", numerus: "dual" },
        { voice: "passive", expected: "خِفْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { voice: "passive", expected: "خِيفُوا", gender: "male", person: "third", numerus: "plural" },
        { voice: "passive", expected: "خِفْنَ", gender: "female", person: "third", numerus: "plural" },
        { voice: "passive", expected: "خِفْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { voice: "passive", expected: "خِفْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { voice: "passive", expected: "خِفْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { voice: "passive", expected: "يُخَافُ", gender: "male", person: "third", tense: "present" },
        { voice: "passive", expected: "تُخَافُ", gender: "female", person: "third", tense: "present" },
        { voice: "passive", expected: "تُخَافُ", gender: "male", person: "second", tense: "present" },
        { voice: "passive", expected: "تُخَافِينَ", gender: "female", person: "second", tense: "present" },
        { voice: "passive", expected: "أُخَافُ", gender: "male", person: "first", tense: "present" },

        { voice: "passive", expected: "يُخَافَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُخَافَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { voice: "passive", expected: "تُخَافَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { voice: "passive", expected: "يُخَافُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُخَافُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { voice: "passive", expected: "نُخَافُ", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُخَافَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُخَافَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { voice: "passive", expected: "يُخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُخَافَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُخَفْ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُخَفْ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُخَافَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { voice: "passive", expected: "يُخَافُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُخَفْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَافُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُخَفْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُخَفْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("خ-و-ف", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});