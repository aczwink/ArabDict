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
import { RunConjugationTest, RunParticipleTest } from "../../shared";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Formation_of_derived_stems_(%22forms%22)

It("Stem 5", () => {
    RunConjugationTest("ف-ع-ل", 5, [
        { expected: "تَفَعَّلَ" },
        { expected: "يَتَفَعَّلُ", tense: "present" },
        { expected: "تَفَعَّلْ", tense: "present", mood: "imperative", person: "second" },
        { expected: "تُفُعِّلَ", voice: "passive" },
        { expected: "يُتَفَعَّلُ", voice: "passive", tense: "present" },
    ]);
    RunParticipleTest("ف-ع-ل", 5, "مُتَفَعِّل", "مُتَفَعَّل");
    
    throw new Error("TODO rest is missing :)");
});