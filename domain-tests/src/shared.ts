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
import { AdvancedStemNumber, ConjugationParams, Gender, GenderString, Letter, Mood, MoodString, Numerus, NumerusString, Person, PersonString, Stem1Context, Tashkil, Tense, TenseString, Voice, VoiceString } from "arabdict-domain/dist/Definitions";
import { VerbRoot } from "arabdict-domain/dist/VerbRoot";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "arabdict-domain/dist/Vocalization";

function ToDisplayVersion(v: DisplayVocalized[])
{
    function conv_letter(c: string)
    {
        switch(c)
        {
            case Letter.Alef:
                return "a";
            case Letter.Ba:
                return "b";
            case Letter.Ta:
                return "t";
            //tha
            case Letter.Jiim:
                return "j";
            case Letter.Hha:
                return "7";
            //kha
            case Letter.Dal:
                return "d";
            //dhal
            //ra
            //zay
            case Letter.Siin:
                return "s";
            //shin
            //Saad
            //Daad
            //Taa
            //Tha
            case Letter.A3ein:
                return "3";
            //ghayn
            case Letter.Fa:
                return "f";
            //qaf
            case Letter.Kaf:
                return "k";
            case Letter.Lam:
                return "l";
            case Letter.Mim:
                return "m";
            case Letter.Nun:
                return "n";
            //haa
            case Letter.Waw:
                return "w";
            case Letter.Ya:
                return "y";
            case Letter.Hamza:
                return "2";
            case Letter.AlefHamza:
                return "I^2";
            //waw hamza
            //ya hamza
            //alif maddah
            //ta marbuta
            case Letter.AlefHamzaBelow:
                return "I_2";
            case Letter.AlefMaksura:
                return "~";
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
                return "&";
            case Tashkil.Fatha:
                return "'";
            case Tashkil.Kasra:
                return ",";
            case Tashkil.Sukun:
                return "°";
        }
    }

    function conv(v: DisplayVocalized)
    {
        const l = conv_letter(v.letter);

        return l + conv_tashkil(v.tashkil) + (v.shadda ? "-w" : "");
    }

    return v.map(conv).join("");
}

function CompareVocalized(a: DisplayVocalized[], b: DisplayVocalized[])
{
    //comparison is of strings is non trivial because the position of the shadda can be before or after the primary tashkil, also we have the emphasis optional field
    if(a.length !== b.length)
        return false;

    for (let i = 0; i < a.length; i++)
    {
        if(a[i].letter !== b[i].letter)
            return false;
        if(a[i].shadda !== b[i].shadda)
            return false;
        if(a[i].tashkil !== b[i].tashkil)
            return false;
    }

    return true;
}

function Test(expected: string, got: DisplayVocalized[], params: ConjugationParams)
{
    const a = ParseVocalizedText(expected);
    const gotStr = got.Values().Map(VocalizedToString).Join("");
    Expect(CompareVocalized(a, got)).ToBe(true, "expected: " + expected + " / " + ToDisplayVersion(a) + " got: " + gotStr + " / " + ToDisplayVersion(got) + " tense: " + params.tense + ", numerus: " + params.numerus + ", person: " + params.person + ", gender: " + params.gender);
}

function TestParticiple(expected: string, got: DisplayVocalized[], voice: VoiceString)
{
    const a = ParseVocalizedText(expected);
    const gotStr = got.Values().Map(VocalizedToString).Join(""); 
    Expect(CompareVocalized(a, got)).ToBe(true, "expected: " + expected + " / " + ToDisplayVersion(a) + " got: " + gotStr + " / " + ToDisplayVersion(got) + " voice: " + voice);
}

interface BasicConjugationTest
{
    root: string;
    past: string;
    present: string;
}

export function RunBasicConjugationTest(conjugations: BasicConjugationTest[], stem: AdvancedStemNumber)
{
    const conjugator = new Conjugator();
    
    for (const test of conjugations)
    {
        const root = new VerbRoot(test.root.split("-").join(""));

        const params1: ConjugationParams = {
            gender: Gender.Male,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem,
            tense: Tense.Perfect,
            voice: Voice.Active,
        };
        const pastResult = conjugator.Conjugate(root, params1, DialectType.ModernStandardArabic);
        Test(test.past, pastResult, params1);

        const params2: ConjugationParams = {
            gender: Gender.Male,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem,
            tense: Tense.Present,
            voice: Voice.Active,
            mood: Mood.Indicative,
        };
        const presentResult = conjugator.Conjugate(root, params2, DialectType.ModernStandardArabic);
        Test(test.present, presentResult, params2);
    }
}

export interface ConjugationTest
{
    expected: string;
    gender?: GenderString;
    mood?: MoodString;
    numerus?: NumerusString;
    person?: PersonString;
    tense?: TenseString;
    voice?: VoiceString;
}
export function RunConjugationTest(rootRadicals: string, stem: AdvancedStemNumber | Stem1Context, conjugations: ConjugationTest[], dialect: DialectType = DialectType.ModernStandardArabic)
{
    function MapMood(mood: MoodString)
    {
        switch(mood)
        {
            case "imperative":
                return Mood.Imperative;
            case "indicative":
                return Mood.Indicative;
            case "jussive":
                return Mood.Jussive;
            case "subjunctive":
                return Mood.Subjunctive;
        }
    }
    function MapNumerus(numerus: NumerusString)
    {
        switch(numerus)
        {
            case "dual":
                return Numerus.Dual;
            case "plural":
                return Numerus.Plural;
            case "singular":
                return Numerus.Singular;
        }
    }
    function MapPerson(person: PersonString)
    {
        switch(person)
        {
            case "first":
                return Person.First;
            case "second":
                return Person.Second;
            case "third":
                return Person.Third;
        }
    }

    const conjugator = new Conjugator();

    const root = new VerbRoot(rootRadicals.split("-").join(""));    
    for (const test of conjugations)
    {
        const stringParams = {
            gender: test.gender ?? "male",
            numerus: test.numerus ?? "singular",
            person: test.person ?? "third",
            stem1Context: (typeof stem === "number") ? undefined : stem,
            tense: test.tense ?? "perfect",
            voice: test.voice ?? "active",
            mood: test.mood ?? "indicative"
        };
        const params: ConjugationParams = {
            gender: (stringParams.gender === "female") ? Gender.Female : Gender.Male,
            mood: MapMood(stringParams.mood),
            numerus: MapNumerus(stringParams.numerus),
            person: MapPerson(stringParams.person),
            stem: ((typeof stem === "number") ? stem : 1) as any,
            stem1Context: stem as any,
            tense: stringParams.tense === "perfect" ? Tense.Perfect : Tense.Present,
            voice: stringParams.voice === "active" ? Voice.Active : Voice.Passive,
        };
        const pastResult = conjugator.Conjugate(root, params, dialect);
        Test(test.expected, pastResult, params);
    }
}

export function RunParticipleTest(rootRadicals: string, stem: number | Stem1Context, activeExpected: string, passiveExpected: string)
{
    const conjugator = new Conjugator();

    const stemNumber = (typeof stem === "number") ? stem : 1;
    const ctx = (typeof stem === "number") ? undefined : stem;

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    const activeGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, "active", ctx);
    TestParticiple(activeExpected, activeGot, "active");

    const passiveGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, "passive", ctx);
    TestParticiple(passiveExpected, passiveGot, "passive");
}