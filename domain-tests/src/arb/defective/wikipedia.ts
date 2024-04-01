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
import { AdvancedStemNumber, Stem1Context, Tashkil } from "arabdict-domain/dist/Definitions";

function RunDefectiveConjugationTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | Stem1Context, conjugations: ConjugationTest[])
{
    RunConjugationTest(rootRadicalsWithoutR3 + "-و", stem, conjugations);
    RunConjugationTest(rootRadicalsWithoutR3 + "-ي", stem, conjugations);
}

function RunDefectiveParticipleTest(rootRadicalsWithoutR3: string, stem: number | Stem1Context, activeExpected: string, passiveExpected: string)
{
    RunParticipleTest(rootRadicalsWithoutR3 + "-و", stem, activeExpected, passiveExpected);
    RunParticipleTest(rootRadicalsWithoutR3 + "-ي", stem, activeExpected, passiveExpected);
}

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_roots

It("Wikipedia defective stem1 type 1", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "رَمَى", gender: "male", person: "third", },
        { expected: "رَمَتْ", gender: "female", person: "third", },
        { expected: "رَمَيْتَ", gender: "male", person: "second" },
        { expected: "رَمَيْتِ", gender: "female", person: "second" },
        { expected: "رَمَيْتُ", gender: "male", person: "first" },

        { expected: "رَمَيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "رَمَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "رَمَيْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "رَمَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "رَمَيْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "رَمَيْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "رَمَيْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "رَمَيْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَرْمِي", gender: "male", person: "third", tense: "present" },
        { expected: "تَرْمِي", gender: "female", person: "third", tense: "present" },
        { expected: "تَرْمِي", gender: "male", person: "second", tense: "present" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَرْمِي", gender: "male", person: "first", tense: "present" },

        { expected: "يَرْمِيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرْمِيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَرْمِيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَرْمُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَرْمُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَرْمِي", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَرْمِيَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَرْمِيَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَرْمِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَرْمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَرْمِيَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَرْمِ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرْمِ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَرْمِ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَرْمِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَرْمِ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَرْمِيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرْمِيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَرْمُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَرْمِينَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَرْمِ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِرْمِ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِرْمِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِرْمِيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِرْمُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِرْمِينَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("ر-م-ي", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, conjugations);
});

It("Wikipedia defective stem1 type 2", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "دَعَا", gender: "male", person: "third", },
        { expected: "دَعَتْ", gender: "female", person: "third", },
        { expected: "دَعَوْتَ", gender: "male", person: "second" },
        { expected: "دَعَوْتِ", gender: "female", person: "second" },
        { expected: "دَعَوْتُ", gender: "male", person: "first" },

        { expected: "دَعَوَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "دَعَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "دَعَوْتُمَا", gender: "male", person: "second", numerus: "dual" },
        
        { expected: "دَعَوْا", gender: "male", person: "third", numerus: "plural" },
        { expected: "دَعَوْنَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "دَعَوْتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "دَعَوْتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "دَعَوْنَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَدْعُو", gender: "male", person: "third", tense: "present" },
        { expected: "تَدْعُو", gender: "female", person: "third", tense: "present" },
        { expected: "تَدْعُو", gender: "male", person: "second", tense: "present" },
        { expected: "تَدْعِينَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَدْعُو", gender: "male", person: "first", tense: "present" },

        { expected: "يَدْعُوَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَدْعُوَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَدْعُوَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَدْعُونَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَدْعُونَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَدْعُو", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَدْعُوَ", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَ", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَ", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعِي", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَدْعُوَ", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَدْعُوَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَدْعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَدْعُوَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَدْعُ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَدْعُ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَدْعُ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَدْعِي", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَدْعُ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَدْعُوَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَدْعُوا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَدْعُونَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَدْعُ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اُدْعُ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اُدْعِي", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اُدْعُوَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اُدْعُوا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اُدْعُونَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunConjugationTest("د-ع-و", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, conjugations);
});

It("Wikipedia defective stem1 type 3", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "نَسِيَ", gender: "male", person: "third", },
        { expected: "نَسِيَتْ", gender: "female", person: "third", },
        { expected: "نَسِيتَ", gender: "male", person: "second" },
        { expected: "نَسِيتِ", gender: "female", person: "second" },
        { expected: "نَسِيتُ", gender: "male", person: "first" },

        { expected: "نَسِيَا", gender: "male", person: "third", numerus: "dual" },
        { expected: "نَسِيَتَا", gender: "female", person: "third", numerus: "dual" },
        { expected: "نَسِيتُمَا", gender: "male", person: "second", numerus: "dual" },

        { expected: "نَسُوا", gender: "male", person: "third", numerus: "plural" },
        { expected: "نَسِينَ", gender: "female", person: "third", numerus: "plural" },
        { expected: "نَسِيتُمْ", gender: "male", person: "second", numerus: "plural" },
        { expected: "نَسِيتُنَّ", gender: "female", person: "second", numerus: "plural" },
        { expected: "نَسِينَا", gender: "male", person: "first", numerus: "plural" },

        //present indicative
        { expected: "يَنْسَى", gender: "male", person: "third", tense: "present" },
        { expected: "تَنْسَى", gender: "female", person: "third", tense: "present" },
        { expected: "تَنْسَى", gender: "male", person: "second", tense: "present" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", tense: "present" },
        { expected: "أَنْسَى", gender: "male", person: "first", tense: "present" },

        { expected: "يَنْسَيَانِ", gender: "male", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْسَيَانِ", gender: "female", person: "third", numerus: "dual", tense: "present" },
        { expected: "تَنْسَيَانِ", gender: "male", person: "second", numerus: "dual", tense: "present" },
        
        { expected: "يَنْسَوْنَ", gender: "male", person: "third", numerus: "plural", tense: "present" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present" },
        { expected: "تَنْسَوْنَ", gender: "male", person: "second", numerus: "plural", tense: "present" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present" },
        { expected: "نَنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present" },

        //subjunctive
        { expected: "يَنْسَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَى", gender: "female", person: "third", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَى", gender: "male", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيْ", gender: "female", person: "second", tense: "present", mood: "subjunctive" },
        { expected: "أَنْسَى", gender: "male", person: "first", tense: "present", mood: "subjunctive" },

        { expected: "يَنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "subjunctive" },
        
        { expected: "يَنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "subjunctive" },
        { expected: "نَنْسَى", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "subjunctive" },

        //jussive
        { expected: "يَنْسَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْسَ", gender: "female", person: "third", tense: "present", mood: "jussive" },
        { expected: "تَنْسَ", gender: "male", person: "second", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيْ", gender: "female", person: "second", tense: "present", mood: "jussive" },
        { expected: "أَنْسَ", gender: "male", person: "first", tense: "present", mood: "jussive" },

        { expected: "يَنْسَيَا", gender: "male", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيَا", gender: "female", person: "third", numerus: "dual", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "jussive" },
        
        { expected: "يَنْسَوْا", gender: "male", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "يَنْسَيْنَ", gender: "female", person: "third", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "تَنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "jussive" },
        { expected: "نَنْسَ", gender: "male", person: "first", numerus: "plural", tense: "present", mood: "jussive" },

        //imperative
        { expected: "اِنْسَ", gender: "male", person: "second", tense: "present", mood: "imperative" },
        { expected: "اِنْسَيْ", gender: "female", person: "second", tense: "present", mood: "imperative" },

        { expected: "اِنْسَيَا", gender: "male", person: "second", numerus: "dual", tense: "present", mood: "imperative" },

        { expected: "اِنْسَوْا", gender: "male", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
        { expected: "اِنْسَيْنَ", gender: "female", person: "second", numerus: "plural", tense: "present", mood: "imperative" },
    ];

    RunDefectiveConjugationTest("ن-س", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, conjugations);
});

It("Wikipedia defective stem table", () => {
    RunConjugationTest("ف-ع-ي", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, [
        { expected: "فَعَى" },
        { expected: "يَفْعِي", tense: "present" },
        { expected: "اِفْعِ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "فُعِيَ" },
        { voice: "passive", expected: "يُفْعَى", tense: "present" },
    ]);
    RunDefectiveParticipleTest("ف-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, "فَاعٍ", "مَفْعِيّ");
    RunDefectiveConjugationTest("ف-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, [
        { expected: "فَعَا" },
        { expected: "يَفْعُو", tense: "present" },
        { expected: "اُفْعُ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "فُعِيَ" },
        { voice: "passive", expected: "يُفْعَى", tense: "present" },
    ]);
    RunDefectiveParticipleTest("ف-ع", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, "فَاعٍ", "مَفْعُوّ");
    RunDefectiveConjugationTest("ف-ع", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, [
        { expected: "فَعِيَ" },
        { expected: "يَفْعَى", tense: "present" },
        { expected: "اِفْعَ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "فُعِيَ" },
        { voice: "passive", expected: "يُفْعَى", tense: "present" },
    ]);
    RunDefectiveParticipleTest("ف-ع", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, "فَاعٍ", "مَفْعِيّ");

    RunDefectiveConjugationTest("ف-ع", 2, [
        { expected: "فَعَّى" },
        { expected: "يُفَعِّي", tense: "present" },
        { expected: "فَعِّ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "فُعِّيَ" },
        { voice: "passive", expected: "يُفَعّى", tense: "present" },
    ]);

    //TODO: III

    RunDefectiveConjugationTest("ف-ع", 4, [
        { expected: "أَفْعَى" },
        { expected: "يُفْعِي", tense: "present" },
        { expected: "أَفْعِ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "أُفْعِيَ" },
        { voice: "passive", expected: "يُفْعَى", tense: "present" },
    ]);

    RunDefectiveConjugationTest("ف-ع", 5, [
        { expected: "تَفَعَّى" },
        { expected: "يَتَفَعَّى", tense: "present" },
        { expected: "تَفَعَّ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "تُفُعِّيَ" },
        { voice: "passive", expected: "يُتَفَعَّى", tense: "present" },
    ]);
    RunDefectiveParticipleTest("ف-ع", 5, "مُتَفَعٍّ", "مُتَفَعًّى");

    //TODO: VI
    //TODO: VII

    RunDefectiveConjugationTest("ف-ع", 8, [
        { expected: "اِفْتَعَى" },
        { expected: "يَفْتَعِي", tense: "present" },
        { expected: "اِفْتَعِ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "اُفْتُعِيَ" },
        { voice: "passive", expected: "يُفْتَعَى", tense: "present" },
    ]);

    //TODO: IX
    //TODO: X
});