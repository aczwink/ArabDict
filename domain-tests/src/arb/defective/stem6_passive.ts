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
import { ConjugationTest, RunDefectiveConjugationTest } from "../../shared";

//Source: https://en.wiktionary.org/wiki/%D8%AA%D8%B9%D8%A7%D9%84%D9%89

It("Stem 6 passive", () => {
    const conjugations: ConjugationTest[] = [
        //past passive
        { voice: "passive", expected: "تُعُولِيَ", gender: "male", person: "third", },

        //present indicative
        { voice: "passive", expected: "يُتَعَالَى", gender: "male", person: "third", tense: "present" },

        //subjunctive
        { voice: "passive", expected: "يُتَعَالَى", gender: "male", person: "third", tense: "present", mood: "subjunctive" },

        //jussive
        { voice: "passive", expected: "يُتَعَالَ", gender: "male", person: "third", tense: "present", mood: "jussive" },
    ];

    RunDefectiveConjugationTest("ع-ل", 6, conjugations);
    
    throw new Error("TODO: find source");
});