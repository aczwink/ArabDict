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
import { DHAMMA, KASRA } from "arabdict-domain/dist/Definitions";
import { RunConjugationTest } from "../../shared";

It("Hollow stem1", () => {
    RunConjugationTest("ف-و-ت", { middleRadicalTashkil: DHAMMA, middleRadicalTashkilPresent: DHAMMA, soundOverride: false }, [
        { expected: "فِتُّ", person: "first", voice: "passive" },
    ]);

    RunConjugationTest("ل-و-م", { middleRadicalTashkil: DHAMMA, middleRadicalTashkilPresent: DHAMMA, soundOverride: false }, [
        { expected: "لِمْتُ", person: "first", voice: "passive" },
    ]);

    RunConjugationTest("ز-ي-ح", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, [
        { expected: "زِحْتُ", person: "first", voice: "passive" },
    ]);
});