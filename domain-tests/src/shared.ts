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
import { Fail } from "acts-util-test";
import { Conjugator, DialectType } from "arabdict-domain/dist/Conjugator";
import { AdvancedStemNumber, ConjugationParams, Gender, GenderString, Mood, MoodString, Numerus, NumerusString, Person, PersonString, Stem1Context, Tashkil, Tense, TenseString, Voice, VoiceString } from "arabdict-domain/dist/Definitions";
import { VerbRoot } from "arabdict-domain/dist/VerbRoot";
import { GenderToString, MoodToString, NumerusToString, PersonToString, TenseToString, VoiceToString } from "arabdict-domain/dist/Util";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "arabdict-domain/dist/Vocalization";
import { Buckwalter } from "arabdict-domain/dist/Transliteration";

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

function Test(expected: string[], got: DisplayVocalized[], params: ConjugationParams)
{
    const gotStr = got.Values().Map(VocalizedToString).Join("");
    const anyExpected = expected.Values().Map(ex => CompareVocalized(ParseVocalizedText(ex), got)).AnyTrue();
    if(!anyExpected)
    {
        const stemData = (params.stem === 1) ? (params.stem + " (past:" + Buckwalter.TashkilToString(params.stem1Context.middleRadicalTashkil) + " present:" + Buckwalter.TashkilToString(params.stem1Context.middleRadicalTashkilPresent) + ")") : params.stem;
        const context = ["stem " + stemData, TenseToString(params.tense), VoiceToString(params.voice)];
        if(params.tense === Tense.Present)
            context.push(MoodToString(params.mood));
        context.push(NumerusToString(params.numerus), PersonToString(params.person), GenderToString(params.gender));
        const firstExpected = ParseVocalizedText(expected[0]);
        const buckwalterExpected = expected.Values().Map(ex => Buckwalter.ToString(ParseVocalizedText(ex)));
        Fail("expected: " + expected.join(", ") + " / " + buckwalterExpected.Join(", ") + " got: " + gotStr + " / " + Buckwalter.ToString(got) + " " + context.join(" "));
    }
}

function TestParticiple(expected: string, got: DisplayVocalized[], voice: VoiceString)
{
    const a = ParseVocalizedText(expected);
    const gotStr = got.Values().Map(VocalizedToString).Join(""); 
    if(!CompareVocalized(a, got))
        Fail("expected: " + expected + " / " + Buckwalter.ToString(a) + " got: " + gotStr + " / " + Buckwalter.ToString(got) + " voice: " + voice);
}

function ValidateStem1Context(ctx: Stem1Context, root: VerbRoot)
{
    const choices = root.GetStem1ContextChoices();
    for (const opt of choices.r2options)
    {
        const match = (ctx.middleRadicalTashkil === opt.past) && (ctx.middleRadicalTashkilPresent === opt.present);
        if(match)
            return;
    }
    throw new Error("Illegal stem 1 context");
}

export interface ConjugationTest
{
    expected: string | string[];
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
    if(typeof stem !== "number")
        ValidateStem1Context(stem, root);

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
        Test(Array.isArray(test.expected) ? test.expected : [test.expected], pastResult, params);
    }
}

export function RunDefectiveConjugationTest(rootRadicalsWithoutR3: string, stem: AdvancedStemNumber | Stem1Context, conjugations: ConjugationTest[])
{
    RunConjugationTest(rootRadicalsWithoutR3 + "-و", stem, conjugations);
    RunConjugationTest(rootRadicalsWithoutR3 + "-ي", stem, conjugations);
}

export function RunActiveParticipleTest(rootRadicals: string, stem: number | Stem1Context, expected: string, dialect: DialectType)
{
    const conjugator = new Conjugator();

    const stemNumber = (typeof stem === "number") ? stem : 1;
    const ctx = (typeof stem === "number") ? undefined : stem;

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    if(typeof stem !== "number")
        ValidateStem1Context(stem, root);
    
    const activeGot = conjugator.ConjugateParticiple(dialect, root, stemNumber, Voice.Active, ctx);
    TestParticiple(expected, activeGot, "active");
}

export function RunParticipleTest(rootRadicals: string, stem: number | Stem1Context, activeExpected: string, passiveExpected: string)
{
    const conjugator = new Conjugator();

    const stemNumber = (typeof stem === "number") ? stem : 1;
    const ctx = (typeof stem === "number") ? undefined : stem;

    const root = new VerbRoot(rootRadicals.split("-").join(""));
    if(typeof stem !== "number")
        ValidateStem1Context(stem, root);
    
    const activeGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, Voice.Active, ctx);
    TestParticiple(activeExpected, activeGot, "active");

    const passiveGot = conjugator.ConjugateParticiple(DialectType.ModernStandardArabic, root, stemNumber, Voice.Passive, ctx);
    TestParticiple(passiveExpected, passiveGot, "passive");
}

export function RunDefectiveParticipleTest(rootRadicalsWithoutR3: string, stem: number | Stem1Context, activeExpected: string, passiveExpected: string)
{
    RunParticipleTest(rootRadicalsWithoutR3 + "-و", stem, activeExpected, passiveExpected);
    RunParticipleTest(rootRadicalsWithoutR3 + "-ي", stem, activeExpected, passiveExpected);
}