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
import { RunDefectiveConjugationTest, RunDefectiveParticipleTest } from "../../shared";

It("Stem 5", () => {
    RunDefectiveConjugationTest("ف-ع", 5, [
        { expected: "تَفَعَّى" },
        { expected: "يَتَفَعَّى", tense: "present" },
        { expected: "تَفَعَّ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "تُفُعِّيَ" },
        { voice: "passive", expected: "يُتَفَعَّى", tense: "present" },
    ]);
    RunDefectiveParticipleTest("ف-ع", 5, "مُتَفَعٍّ", "مُتَفَعًّى");
    
    throw new Error("TODO :)");
});