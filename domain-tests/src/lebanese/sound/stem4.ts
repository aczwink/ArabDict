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

//Source: "Levantine Arabic Verbs: Conjugation Tables and Grammar" by "Aldrich, M. and Choucaire, N.L.", ISBN: 9780998641133
//Table: 3

It("Stem 4", () => {
    const root = "ع-ل-ن";
    const stem = 4;

    RunActiveParticipleTest(root, stem, "مُعْلِن", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "أَعْلَنْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "أَعْلَنِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "أَعْلَنِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "أَعْلَنْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "أَعْلَنِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "أَعْلَنُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "أَعْلَنْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "أَعْلَنَّا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِعْلُنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِعْلُنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِعْلُنْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِعِلْنِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِعْلُنْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِعِلْنُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِعِلْنُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِعْلُنْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِعْلُنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِعْلُنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِعْلُنْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِعِلْنِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِعْلُنْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِعِلْنُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِعِلْنُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِعْلُنْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "عْلُونْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "عْلِنِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "عْلِنُوا" },
    ];

    RunConjugationTest(root, stem, conjugations, DialectType.Lebanese);
});