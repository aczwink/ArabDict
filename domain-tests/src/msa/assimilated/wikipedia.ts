/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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
import { RunConjugationTest } from "../../shared";
import { DHAMMA, FATHA, KASRA } from "arabdict-domain/dist/Definitions";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs

It("Wikipedia assimilated stem1", () => {
    RunConjugationTest("و-ج-د", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "وَجَدَ" },
        { expected: "يَجِدُ", tense: "present" },
        { expected: "جِدْ", tense: "present", mood: "imperative", person: "second" },
    ]);
    RunConjugationTest("و-ر-ث", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "وَرِثَ" },
        { expected: "يَرِثُ", tense: "present" },
        { expected: "رِثْ", tense: "present", mood: "imperative", person: "second" },
    ]);
    RunConjugationTest("و-ض-ع", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: FATHA, soundOverride: false }, [
        { expected: "وَضَعَ" },
        { expected: "يَضَعُ", tense: "present" },
        { expected: "ضَعْ", tense: "present", mood: "imperative", person: "second" },
    ]);
    RunConjugationTest("و-ج-ل", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: FATHA, soundOverride: true }, [
        { expected: "وَجِلَ" },
        { expected: "يَوْجَلُ", tense: "present" },
        { expected: "إيجَلْ", tense: "present", mood: "imperative", person: "second" },
    ]);
    RunConjugationTest("ي-س-ر", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "يَسَرَ" },
        { expected: "يَيْسِرُ", tense: "present" },
        { expected: "إيسِرْ", tense: "present", mood: "imperative", person: "second" },
    ]);

    //TODO: rest
});

It("Wikipedia assimilated stem table", () => {
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: DHAMMA, soundOverride: false }, [
        { expected: "وَعَلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "وَعَلَ" },
        { expected: "يَعِلُ", tense: "present" },
        { expected: "عِلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: FATHA, soundOverride: false }, [
        { expected: "وَعِلَ" },
        { expected: "يَعَلُ", tense: "present" },
        { expected: "عَلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "وَعِلَ" },
        { expected: "يَعِلُ", tense: "present" },
        { expected: "عِلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: DHAMMA, middleRadicalTashkilPresent: DHAMMA, soundOverride: false }, [
        { expected: "وَعُلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
});