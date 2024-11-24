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
import { Stem1Context, Tashkil } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D8%A3%D8%AE%D8%B0#Verb
//https://en.wikipedia.org/wiki/Arabic_verbs#Hamzated_verbs

It("Stem 1 irregular short imperative ء-خ-ذ", () => {
    throw new Error("TODO verbal noun test :)");
    RunParticipleTest("ء-خ-ذ", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, "آخِذ", "مَأْخُوذ");
    
    const conjugations: ConjugationTest[] = [
        //active past
        { voice: "active", expected: "أَخَذَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَخَذَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَخَذُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَخَذْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَأْخُذُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "آخُذُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَأْخُذَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَأْخُذُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَأْخُذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْخُذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَأْخُذُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَأْخُذَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "آخُذَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَأْخُذَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَأْخُذُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَأْخُذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْخُذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَأْخُذَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَأْخُذْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "آخُذْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَأْخُذَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَأْخُذُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَأْخُذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْخُذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَأْخُذْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "خُذْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "خُذِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "خُذَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "خُذُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "خُذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "أُخِذَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُخِذَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُخِذُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُخِذْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُؤْخَذُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُوخَذُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُؤْخَذَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُؤْخَذُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُؤْخَذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْخَذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُؤْخَذُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُؤْخَذَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوخَذَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُؤْخَذَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُؤْخَذُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُؤْخَذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْخَذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُؤْخَذَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُؤْخَذْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوخَذْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُؤْخَذَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُؤْخَذُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُؤْخَذْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْخَذْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُؤْخَذْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest("ء-خ-ذ", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations);
});

//Source: https://en.wiktionary.org/wiki/%D8%A3%D9%83%D9%84#Verb

It("Stem 1 irregular short imperative ء-ك-ل", () => {
    const root = "ء-ك-ل";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false };

    //throw new Error("TODO verbal noun test :)");
    RunParticipleTest(root, stem, "آكِل", "مَأْكُول");
    
    const conjugations: ConjugationTest[] = [
        //active past
        { voice: "active", expected: "أَكَلَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَكَلَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "active", expected: "أَكَلُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "active", expected: "أَكَلْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //active indicative
        { voice: "active", expected: "يَأْكُلُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "active", expected: "آكُلُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَأْكُلَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "active", expected: "يَأْكُلُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "يَأْكُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "تَأْكُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "active", expected: "نَأْكُلُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //active subjunctive
        { voice: "active", expected: "يَأْكُلَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "آكُلَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَأْكُلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "active", expected: "يَأْكُلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "يَأْكُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "تَأْكُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "active", expected: "نَأْكُلَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //active jussive
        { voice: "active", expected: "يَأْكُلْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "active", expected: "آكُلْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَأْكُلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "active", expected: "يَأْكُلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "يَأْكُلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "تَأْكُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "active", expected: "نَأْكُلْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { voice: "active", expected: "كُلْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "imperative" },
        { voice: "active", expected: "كُلِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "imperative" },

        { voice: "active", expected: "كُلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { voice: "active", expected: "كُلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { voice: "active", expected: "كُلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },

        //passive past
        { voice: "passive", expected: "أُكِلَ", gender: "male", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلَتْ", gender: "female", person: "third", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتَ", gender: "male", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتِ", gender: "female", person: "second", numerus: "singular", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتُ", gender: "male", person: "first", numerus: "singular", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُكِلَا", gender: "male", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلَتَا", gender: "female", person: "third", numerus: "dual", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتُمَا", gender: "male", person: "second", numerus: "dual", tense: "perfect", mood: "indicative" },

        { voice: "passive", expected: "أُكِلُوا", gender: "male", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْنَ", gender: "female", person: "third", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتُمْ", gender: "male", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْتُنَّ", gender: "female", person: "second", numerus: "plural", tense: "perfect", mood: "indicative" },
        { voice: "passive", expected: "أُكِلْنَا", gender: "male", person: "first", numerus: "plural", tense: "perfect", mood: "indicative" },

        //passive indicative
        { voice: "passive", expected: "يُؤْكَلُ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلُ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلُ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلِينَ", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "أُوكَلُ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُؤْكَلَانِ", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلَانِ", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلَانِ", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "indicative" },

        { voice: "passive", expected: "يُؤْكَلُونَ", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "يُؤْكَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلُونَ", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "تُؤْكَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "indicative" },
        { voice: "passive", expected: "نُؤْكَلُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "indicative" },

        //passive subjunctive
        { voice: "passive", expected: "يُؤْكَلَ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلَ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلَ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "أُوكَلَ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُؤْكَلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },

        { voice: "passive", expected: "يُؤْكَلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "يُؤْكَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "تُؤْكَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { voice: "passive", expected: "نُؤْكَلَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //passive jussive
        { voice: "passive", expected: "يُؤْكَلْ", gender: "male", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلْ", gender: "female", person: "third", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلْ", gender: "male", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلِي", gender: "female", person: "second", numerus: "singular", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "أُوكَلْ", gender: "male", person: "first", numerus: "singular", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُؤْكَلَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },

        { voice: "passive", expected: "يُؤْكَلُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "يُؤْكَلْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "تُؤْكَلْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { voice: "passive", expected: "نُؤْكَلْ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },
    ];

    RunConjugationTest(root, stem, conjugations);
});