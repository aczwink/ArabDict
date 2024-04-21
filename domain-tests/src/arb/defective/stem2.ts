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
import { RunDefectiveConjugationTest } from "../../shared";

It("Stem 2", () => {
    RunDefectiveConjugationTest("ف-ع", 2, [
        { expected: "فَعَّى" },
        { expected: "يُفَعِّي", tense: "present" },
        { expected: "فَعِّ", tense: "present", mood: "imperative", person: "second" },
        { voice: "passive", expected: "فُعِّيَ" },
        { voice: "passive", expected: "يُفَعّى", tense: "present" },
    ]);
    
    throw new Error("TODO :)");
});