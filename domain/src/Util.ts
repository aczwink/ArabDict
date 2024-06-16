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
import { Gender, GenderString, Letter, Mood, MoodString, Numerus, NumerusString, Person, PersonString, TASHKIL_SHADDA, Tashkil, Tense, TenseString, Voice, VoiceString } from "./Definitions";

export function GenderToString(gender: Gender): GenderString
{
    if(gender === Gender.Female)
        return "female";
    return "male";
}

export function IsSunLetter(letter: Letter)
{
    switch(letter)
    {
        case Letter.Ta:
        case Letter.Tha:
        case Letter.Dal:
        case Letter.Thal:
        case Letter.Ra:
        case Letter.Zay:
        case Letter.Siin:
        case Letter.Shiin:
        case Letter.Saad:
        case Letter.Daad:
        case Letter.Tta:
        case Letter.Ththa:
        case Letter.Lam:
        case Letter.Nun:
            return true;
    }
    return false;
}

export function MoodToString(mood: Mood): MoodString
{
    switch(mood)
    {
        case Mood.Imperative:
            return "imperative";
        case Mood.Indicative:
            return "indicative";
        case Mood.Jussive:
            return "jussive";
        case Mood.Subjunctive:
            return "subjunctive";
    }
}

export function NumerusToString(numerus: Numerus): NumerusString
{
    switch(numerus)
    {
        case Numerus.Dual:
            return "dual";
        case Numerus.Plural:
            return "plural";
        case Numerus.Singular:
            return "singular";
    }
}

export function PersonToString(person: Person): PersonString
{
    switch(person)
    {
        case Person.First:
            return "first";
        case Person.Second:
            return "second";
        case Person.Third:
            return "third";
    }
}

export function RemoveTashkil(text: string)
{
    return RemoveTashkilButKeepShadda(text).ReplaceAll(TASHKIL_SHADDA, "");
}

export function RemoveTashkilButKeepShadda(text: string)
{
    return text.ReplaceAll(Tashkil.Dhamma, "")
        .ReplaceAll(Tashkil.Fatha, "")
        .ReplaceAll(Tashkil.Fathatan, "")
        .ReplaceAll(Tashkil.Kasra, "")
        .ReplaceAll(Tashkil.Kasratan, "")
        .ReplaceAll(Tashkil.Sukun, "");
}

export function TenseToString(tense: Tense): TenseString
{
    if(tense === Tense.Perfect)
        return "perfect";
    return "present";
}

export function VoiceToString(voice: Voice): VoiceString
{
    if(voice === Voice.Active)
        return "active";
    return "passive";
}

export function VowelLetterToPreTashkil(vowel: Letter.Alef | Letter.Waw | Letter.Ya)
{
    switch(vowel)
    {
        case Letter.Alef:
            return Tashkil.Fatha;
        case Letter.Waw:
            return Tashkil.Dhamma;
        case Letter.Ya:
            return Tashkil.Kasra;
    }
}