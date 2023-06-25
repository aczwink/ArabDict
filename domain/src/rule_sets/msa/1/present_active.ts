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

import { DHAMMA, FATHA, HAMZA, KASRA, LETTER_RA, YA } from "../../../Definitions";
import { RootType } from "../../../VerbRoot";
import { Stem1DefectiveContext, StemTenseVoiceDefinition } from "../../Definitions";

export const stem1_present_active: StemTenseVoiceDefinition = {
    [RootType.Assimilated]: {
        rules: [
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "third", gender: "male", conjugation: "يَعَلُ" }
        ]
    },

    [RootType.Defective]: {
        rules: [
            //special cases
            { condition: (root, _) => root.radicalsAsSeparateLetters.Equals([LETTER_RA, HAMZA, YA]), numerus: "singular", person: "third", gender: "male", conjugation: "يَرَى" },

            { condition: (_, ctx: Stem1DefectiveContext) => ctx.middleRadicalTashkilPresent === KASRA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفْعِي" }
        ]
    },

    [RootType.Hollow]: {
        rules: [
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === DHAMMA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفُولُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === KASRA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفِيلُ" }
        ]
    },

    [RootType.Quadriliteral]: {
        rules: [
            { numerus: "singular", person: "third", gender: "male", conjugation: "يُفَعْلِقُ" }
        ]
    },

    [RootType.Sound]: {
        rules: [
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "first", gender: "male", conjugation: "أَفْعَلُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "second", gender: "male", conjugation: "تَفْعَلُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "second", gender: "female", conjugation: "تَفْعَلِينَ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفْعَلُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === DHAMMA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفْعُلُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "singular", person: "third", gender: "female", conjugation: "تَفْعَلُ" },

            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "dual", person: "second", gender: "male", conjugation: "تَفْعَلَانِ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "dual", person: "third", gender: "male", conjugation: "يَفْعَلَانِ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "dual", person: "third", gender: "female", conjugation: "تَفْعَلَانِ" },

            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "plural", person: "first", gender: "male", conjugation: "نَفْعَلُ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "plural", person: "second", gender: "male", conjugation: "تَفْعَلُونَ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "plural", person: "second", gender: "female", conjugation: "تَفْعَلْنَ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "plural", person: "third", gender: "male", conjugation: "يَفْعَلُونَ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === FATHA, numerus: "plural", person: "third", gender: "female", conjugation: "يَفْعَلْنَ" },
        ]
    },

    [RootType.SecondConsonantDoubled]: {
        rules: [
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === DHAMMA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفُلُّ" },
            { condition: (_, ctx) => ctx.middleRadicalTashkilPresent === KASRA, numerus: "singular", person: "third", gender: "male", conjugation: "يَفِلُّ" }
        ]
    },

    [RootType.DoublyWeak_WawOnR1_WawOrYaOnR3]: {
        rules: [
            { numerus: "singular", person: "third", gender: "male", conjugation: "يَعِي" }
        ]
    },
};