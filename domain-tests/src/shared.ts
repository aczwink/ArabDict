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
import "acts-util-core";
import { Expect } from "acts-util-test";
import { Conjugator, DialectType } from "arabdict-domain/dist/Conjugator";
import { A3EIN, ALEF, ALEF_HAMZA, ALEF_MAKSURA, BASE_TASHKIL, DAL, DHAMMA, FATHA, KASRA, MIM, SUKUN, WAW, YA, YA_HAMZA } from "arabdict-domain/dist/Definitions";
import { ConjugationParams } from "arabdict-domain/dist/DialectConjugator";
import { VerbRoot } from "arabdict-domain/dist/VerbRoot";
import { ParseVocalizedText, Vocalized } from "arabdict-domain/dist/Vocalization";
import { Stem1Context } from "arabdict-domain/dist/rule_sets/msa/_legacy/CreateVerb";
import { Gender, Mood, NUN, Numerus, Person, SIIN, TA, Tense, Voice } from "arabdict-domain/dist/rule_sets/msa/_legacy/VerbStem";

function ToDisplayVersion(v: Vocalized[])
{
    function conv_letter(c: string)
    {
        switch(c)
        {
            case ALEF:
                return "alef";
            //ba
            case TA:
                return "ta";
            //tha
            //jim
            //7aa
            //kha
            case DAL:
                return "dal";
            //dhal
            //ra
            //zay
            case SIIN:
                return "siin";
            //shin
            //Saad
            //Daad
            //Taa
            //Tha
            case A3EIN:
                return "a3ein";
            //ghayn
            //fa
            //qaf
            //kaf
            //lam
            case MIM:
                return "mim";
            case NUN:
                return "nun";
            //haa
            case WAW:
                return "waw";
            case YA:
                return "ya";
            //hamza
            case ALEF_HAMZA:
                return "alef_hamza";
            //waw hamza
            //ya hamza
            //alif maddah
            //ta marbuta
            case ALEF_MAKSURA:
                return "alef_maksura";
        }
        return "TODO: " + c + " " + c.codePointAt(0);
    }

    function conv_tashkil(t: BASE_TASHKIL | undefined)
    {
        if(t === undefined)
            return "";
        switch(t)
        {
            case DHAMMA:
                return "/dhamma";
            case FATHA:
                return "/fatha";
            case KASRA:
                return "/kasra";
            case SUKUN:
                return "/sukun";
        }
    }

    function conv(v: Vocalized)
    {
        const l = conv_letter(v.letter);

        return l + conv_tashkil(v.tashkil) + (v.shadda ? "shadda" : "");
    }

    return v.map(conv);
}

function Test(expected: string, got: string, params: ConjugationParams)
{
    const a = ParseVocalizedText(expected);
    const b = ParseVocalizedText(got);

    if(!a.Equals(b))
    {
        console.log("expected:", a, "(" + ToDisplayVersion(a) + ")", "got:", b, "(" + ToDisplayVersion(b) + ")");
        console.log("conjugation params:", params);
        Expect(expected).Equals(got);
    }
}

interface BasicConjugationTest
{
    root: string;
    past: string;
    present: string;
}

export function RunBasicConjugationTest(conjugations: BasicConjugationTest[], stem: number)
{
    const conjugator = new Conjugator();
    
    for (const test of conjugations)
    {
        const root = new VerbRoot(test.root.split("-").join(""));

        const params1: ConjugationParams = {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "perfect",
            voice: "active",
            mood: "indicative"
        };
        const pastResult = conjugator.Conjugate(root, params1, DialectType.ModernStandardArabic);
        Test(test.past, pastResult, params1);

        const params2: ConjugationParams = {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "present",
            voice: "active",
            mood: "indicative"
        };
        const presentResult = conjugator.Conjugate(root, params2, DialectType.ModernStandardArabic);
        Test(test.present, presentResult, params2);
    }
}

export interface ConjugationTest
{
    expected: string;
    gender?: Gender;
    mood?: Mood;
    numerus?: Numerus;
    person?: Person;
    tense?: Tense;
    voice?: Voice;
}
export function RunConjugationTest(rootRadicals: string, stem: number | Stem1Context, conjugations: ConjugationTest[])
{
    const conjugator = new Conjugator();
    
    for (const test of conjugations)
    {
        const root = new VerbRoot(rootRadicals.split("-").join(""));

        const params = {
            gender: test.gender ?? "male",
            numerus: test.numerus ?? "singular",
            person: test.person ?? "third",
            stem: (typeof stem === "number") ? stem : 1,
            stem1Context: (typeof stem === "number") ? undefined : stem,
            tense: test.tense ?? "perfect",
            voice: test.voice ?? "active",
            mood: test.mood ?? "indicative"
        };
        const pastResult = conjugator.Conjugate(root, params, DialectType.ModernStandardArabic);
        Test(test.expected, pastResult, params);
    }
}