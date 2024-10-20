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
//Table: 36

It("Stem8", () => {
    throw new Error("TODO verbal noun test :)");
    RunActiveParticipleTest("ر-و-ح", 8, "مِرْتَاحْ", DialectType.Lebanese);
    
    const conjugations: ConjugationTest[] = [
        //past
        { tense: "perfect", numerus: "singular", person: "third", gender: "male", expected: "رْتَاحْ" },
        { tense: "perfect", numerus: "singular", person: "third", gender: "female", expected: "رْتَاحِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "male", expected: "رْتَحِتْ" },
        { tense: "perfect", numerus: "singular", person: "second", gender: "female", expected: "رْتَحْتِي" },
        { tense: "perfect", numerus: "singular", person: "first", gender: "male", expected: "رْتَحِتْ" },

        { tense: "perfect", numerus: "plural", person: "third", expected: "رْتَاحُوا" },
        { tense: "perfect", numerus: "plural", person: "second", expected: "رْتَحْتُوا" },
        { tense: "perfect", numerus: "plural", person: "first", expected: "رْتَحْنَا" },

        //present
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "male", expected: "بْيِرْتَاحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "third", gender: "female", expected: "بْتِرْتَاحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "male", expected: "بْتِرْتَاحْ" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "second", gender: "female", expected: "بْتِرْتَاحِي" },
        { tense: "present", mood: "indicative", numerus: "singular", person: "first", gender: "male", expected: "بِرْتَاحْ" },

        { tense: "present", mood: "indicative", numerus: "plural", person: "third", expected: "بْيِرْتَاحُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "second", expected: "بْتِرْتَاحُوا" },
        { tense: "present", mood: "indicative", numerus: "plural", person: "first", expected: "مْنِرْتَاحْ" },

        //subjunctive
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "male", expected: "يِرْتَاحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "third", gender: "female", expected: "تِرْتَاحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "male", expected: "تِرْتَاحْ" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "second", gender: "female", expected: "تِرْتَاحِي" },
        { tense: "present", mood: "subjunctive", numerus: "singular", person: "first", gender: "male", expected: "إِرْتَاحْ" },

        { tense: "present", mood: "subjunctive", numerus: "plural", person: "third", expected: "يِرْتَاحُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "second", expected: "تِرْتَاحُوا" },
        { tense: "present", mood: "subjunctive", numerus: "plural", person: "first", expected: "نِرْتَاحْ" },

        //imperative
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "male", expected: "رْتَاحْ" },
        { tense: "present", mood: "imperative", numerus: "singular", person: "second", gender: "female", expected: "رْتَاحِي" },
        { tense: "present", mood: "imperative", numerus: "plural", person: "second", expected: "رْتَاحُوا" },
    ];

    RunConjugationTest("ر-و-ح", 8, conjugations, DialectType.Lebanese);
});