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
import { RunConjugationTest } from "../../shared";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Hollow_(second-weak)_verbs

It("Wikipedia hollow stem table", () => {
    //TODO: I
    //TODO: IV
    //TODO: VII
    //TODO: VIII

    RunConjugationTest("ف-و-ل", 10, [
        { expected: "اِسْتَفَالَ" },
        { expected: "يَسْتَفْيلُ", tense: "present" },
        { expected: "اِسْتَفِلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "اُسْتُفِيلَ", voice: "passive" },
        { expected: "يُسْتَفَالُ", voice: "passive", tense: "present" },
    ]);
});