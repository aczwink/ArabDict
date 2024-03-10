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
import { ConjugationTest, RunConjugationTest } from "../../shared";
import { KASRA } from "arabdict-domain/dist/Definitions";

//Source: https://en.wiktionary.org/wiki/%D8%AC%D8%A7%D8%A1

It("Long alef before hamza (with dhamma)", () => {
    const conjugations: ConjugationTest[] = [
        { expected: "جَاؤُوا", numerus: "plural" },
    ];

    RunConjugationTest("ج-ي-ء", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, conjugations);
});