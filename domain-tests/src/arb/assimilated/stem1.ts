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
import { Tashkil } from "arabdict-domain/dist/Definitions";
import { RunConjugationTest } from "../../shared";

It("Stem 1", () => {
    RunConjugationTest("و-ج-د", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, [
        { expected: "وَجَدَ" },
        { expected: "يَجِدُ", tense: "present" },
        { expected: "جِدْ", tense: "present", mood: "imperative", person: "second" },
    ]);

    RunConjugationTest("و-ج-ل", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: true }, [
        { expected: "وَجِلَ" },
        { expected: "يَوْجَلُ", tense: "present" },
        { expected: "إيجَلْ", tense: "present", mood: "imperative", person: "second" },
    ]);

    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, [
        { expected: "وَعَلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, [
        { expected: "وَعَلَ" },
        { expected: "يَعِلُ", tense: "present" },
        { expected: "عِلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, [
        { expected: "وَعِلَ" },
        { expected: "يَعَلُ", tense: "present" },
        { expected: "عَلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("و-ع-ل", { middleRadicalTashkil: Tashkil.Dhamma, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, [
        { expected: "وَعُلَ" },
        { expected: "يَعُلُ", tense: "present" },
        { expected: "عُلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "وُعِلَ", voice: "passive" },
        { expected: "يُوعَلُ", voice: "passive", tense: "present" },
    ]);

    throw new Error("TODO :)");
});