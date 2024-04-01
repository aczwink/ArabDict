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
import { Tashkil } from "arabdict-domain/dist/Definitions";

//TODO: the conjugation table from https://en.wikipedia.org/wiki/Arabic_verbs#Doubled_roots

//Source: https://en.wikipedia.org/wiki/Arabic_verbs#Doubled_verbs
It("Wikipedia doubled roots stem table", () => {
    RunConjugationTest("ف-ل-ل", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false }, [
        { expected: "فَلَّ" },
        { expected: "فَلَلْتُ", person: "first" },
        { expected: "يَفُلُّ", tense: "present" },
        { expected: "فُلَّ", voice: "passive" },
        { expected: "يُفَلُّ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("ف-ل-ل", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Kasra, soundOverride: false }, [
        { expected: "فَلَّ" },
        { expected: "فَلَلْتُ", person: "first" },
        { expected: "يَفِلُّ", tense: "present" },
        { expected: "فُلَّ", voice: "passive" },
        { expected: "يُفَلُّ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("ف-ل-ل", { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, [
        { expected: "فَلَّ" },
        { expected: "فَلَلْتُ", person: "first" },
        { expected: "يَفَلُّ", tense: "present" },
        { expected: "فُلَّ", voice: "passive" },
        { expected: "يُفَلُّ", voice: "passive", tense: "present" },
    ]);
    RunConjugationTest("ف-ل-ل", { middleRadicalTashkil: Tashkil.Kasra, middleRadicalTashkilPresent: Tashkil.Fatha, soundOverride: false }, [
        { expected: "فَلَّ" },
        { expected: "فَلِلْتُ", person: "first" },
        { expected: "يَفَلُّ", tense: "present" },
        { expected: "فُلَّ", voice: "passive" },
        { expected: "يُفَلُّ", voice: "passive", tense: "present" },
    ]);

    //TODO: III

    RunConjugationTest("ف-ل-ل", 4, [
        { expected: "أَفَلَّ" },
        { expected: "يُفِلُّ", tense: "present" },
        { voice: "passive", expected: "أُفِلَّ" },
        { voice: "passive", expected: "يُفَلُّ", tense: "present" },
    ]);

    //TODO: VI
    
    RunConjugationTest("ف-ل-ل", 7, [
        { expected: "اِنْفَلَّ" },
        { expected: "يَنْفَلُّ", tense: "present" },
    ]);

    //TODO: VIII
    //TODO: X
});