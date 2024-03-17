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
import { Conjugator, DialectType, StringConjugationParams } from "arabdict-domain/dist/Conjugator";
import { A3EIN, Gender, LAM, Letter, Mood, Numerus, Person, Stem1Context, Tashkil, Voice, _LegacyMood, _LegacyPerson, _LegacyTense, _LegacyVoice } from "arabdict-domain/dist/Definitions";
import { VerbRoot } from "arabdict-domain/dist/VerbRoot";
import { ParseVocalizedText, _LegacyPartiallyVocalized } from "arabdict-domain/dist/Vocalization";

function ToDisplayVersion(v: _LegacyPartiallyVocalized[])
{
    function conv_letter(c: string)
    {
        switch(c)
        {
            case Letter.Alef:
                return "alef";
            case Letter.Ba:
                return "ba";
            case Letter.Ta:
                return "ta";
            //tha
            case Letter.Jiim:
                return "jiim";
            //7aa
            //kha
            case Letter.Dal:
                return "dal";
            //dhal
            //ra
            //zay
            case Letter.Siin:
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
            case LAM:
                return "laam";
            case Letter.Mim:
                return "mim";
            case Letter.Nun:
                return "nun";
            //haa
            case Letter.Waw:
                return "waw";
            case Letter.Ya:
                return "ya";
            case Letter.Hamza:
                return "hamza";
            case Letter.AlefHamza:
                return "alef_hamza";
            //waw hamza
            //ya hamza
            //alif maddah
            //ta marbuta
            case Letter.AlefHamzaBelow:
                return "alef_hamza_below";
            case Letter.AlefMaksura:
                return "alef_maksura";
        }
        return "TODO: " + c + " " + c.codePointAt(0);
    }

    function conv_tashkil(t: Tashkil | undefined)
    {
        if(t === undefined)
            return "";
        switch(t)
        {
            case Tashkil.Dhamma:
                return "/dhamma";
            case Tashkil.Fatha:
                return "/fatha";
            case Tashkil.Kasra:
                return "/kasra";
            case Tashkil.Sukun:
                return "/sukun";
        }
    }

    function conv(v: _LegacyPartiallyVocalized)
    {
        const l = conv_letter(v.letter);

        return l + conv_tashkil(v.tashkil as any) + (v.shadda ? "shadda" : "");
    }

    return v.map(conv);
}

function Test(expected: string, got: string, params: StringConjugationParams)
{
    const a = ParseVocalizedText(expected);
    const b = ParseVocalizedText(got);

    if(!a.Equals(b))
    {
        //console.error("conjugation params:", params);
        Expect(expected).Equals(got, "expected: " + ToDisplayVersion(a) + " got: " + ToDisplayVersion(b) + " tense: " + params.tense + ", numerus: " + params.numerus + ", person: " + params.person + ", gender: " + params.gender);
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

        const params1: StringConjugationParams = {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "perfect",
            voice: "active",
            mood: "indicative"
        };
        const pastResult = conjugator.ConjugateStringBased(root, params1, DialectType.ModernStandardArabic);
        Test(test.past, pastResult, params1);

        const params2: StringConjugationParams = {
            gender: "male",
            numerus: "singular",
            person: "third",
            stem,
            tense: "present",
            voice: "active",
            mood: "indicative"
        };
        const presentResult = conjugator.ConjugateStringBased(root, params2, DialectType.ModernStandardArabic);
        Test(test.present, presentResult, params2);
    }
}

export interface ConjugationTest
{
    expected: string;
    gender?: Gender;
    mood?: _LegacyMood;
    numerus?: Numerus;
    person?: _LegacyPerson;
    tense?: _LegacyTense;
    voice?: _LegacyVoice;
}
export function RunConjugationTest(rootRadicals: string, stem: number | Stem1Context, conjugations: ConjugationTest[], dialect: DialectType = DialectType.ModernStandardArabic)
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
        const pastResult = conjugator.ConjugateStringBased(root, params, dialect);
        Test(test.expected, pastResult, params);
    }
}
