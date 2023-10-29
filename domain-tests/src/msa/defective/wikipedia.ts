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
import { ConjugationTest, RunConjugationTest } from "../../shared";
import { DHAMMA, FATHA, KASRA } from "arabdict-domain/dist/Definitions";

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Defective_(third-weak)_roots

It("Wikipedia defective stem1 type 1", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "رَمَى", gender: "male", person: "third", },
        { expected: "رَمَتْ", gender: "female", person: "third", },
        { expected: "رَمَيْتَ", gender: "male", person: "second" },
        { expected: "رَمَيْتِ", gender: "female", person: "second" },
        { expected: "رَمَيْتُ", gender: "male", person: "first" },
        //TODO: dual
        { expected: "رَمَوْا", gender: "male", person: "third", numerus: "plural" },
        //present indicative
        { expected: "يَرْمِي", tense: "present" },
        //TODO: rest
    ];

    RunConjugationTest("ر-م-ي", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: KASRA, soundOverride: false }, conjugations);
});

It("Wikipedia defective stem1 type 2", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "دَعَا", gender: "male", person: "third", },
        { expected: "دَعَتْ", gender: "female", person: "third", },
        { expected: "دَعَوْتَ", gender: "male", person: "second" },
        { expected: "دَعَوْتِ", gender: "female", person: "second" },
        { expected: "دَعَوْتُ", gender: "male", person: "first" },
        //TODO: dual
        { expected: "دَعَوْا", gender: "male", person: "third", numerus: "plural" },
        //present indicative
        { expected: "يَدْعُو", tense: "present" },
        //TODO: rest
    ];

    RunConjugationTest("د-ع-و", { middleRadicalTashkil: FATHA, middleRadicalTashkilPresent: DHAMMA, soundOverride: false }, conjugations);
});

It("Wikipedia defective stem1 type 3", () => {
    const conjugations: ConjugationTest[] = [
        //past
        { expected: "نَسِيَ", gender: "male", person: "third", },
        { expected: "نَسِيَتْ", gender: "female", person: "third", },
        { expected: "نَسِيتَ", gender: "male", person: "second" },
        { expected: "نَسِيتِ", gender: "female", person: "second" },
        { expected: "نَسِيتُ", gender: "male", person: "first" },
        //TODO: dual
        { expected: "نَسُوا", gender: "male", person: "third", numerus: "plural" },
        //present indicative
        { expected: "يَنْسَى", tense: "present" },
        //TODO: rest
    ];

    RunConjugationTest("ن-س-ي", { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: FATHA, soundOverride: false }, conjugations);
});