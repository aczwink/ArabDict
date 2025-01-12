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
import { ConjugationTest, RunActiveParticipleTest, RunConjugationTest } from "../../shared";
import { DialectType } from "arabdict-domain/dist/Conjugator";
import { Stem1Context, Tashkil } from "arabdict-domain/dist/Definitions";

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 25

It("Stem 1 Past:a, Present:u", () => {
    const root = "ح-ط-ط";
    const stem: Stem1Context = { middleRadicalTashkil: Tashkil.Fatha, middleRadicalTashkilPresent: Tashkil.Dhamma, soundOverride: false };

    RunActiveParticipleTest(root, stem, "حَاطِط", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "حَطّْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "حَطِّتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "حَطَّيْتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "حَطَّيْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "حَطَّيْتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "حَطُّوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "حَطَّيْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "حَطَّيْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بِيحُطّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بِتْحُطّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بِتْحُطّْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بِتْحُطِّي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بْحُطّْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بِيحُطُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بِتْحُطُّوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مِنْحُطّْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يْحُطّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تْحُطّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تْحُطّْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تْحُطِّي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "حُطّْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يْحُطُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تْحُطُّوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نْحُطّْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "حُطّْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "حُطِّي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "حُطُّوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});