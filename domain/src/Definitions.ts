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

//Source: https://en.wikipedia.org/wiki/Arabic_script_in_Unicode

export enum Letter
{
    Alef = "\u0627",
    Ba = "\u0628",
    Ta = "\u062A",
    Tha = "\u062B",
    Jiim = "\u062C",
    Kha = "\u062E",
    Dal = "\u062F",
    Thal = "\u0630",
    Zay = "\u0632",
    Siin = "\u0633",
    Shiin = "\u0634",
    Saad = "\u0635",
    Daad = "\u0636",
    Tta = "\u0637",
    Ththa = "\u0638",
    Ghain = "\u063A",
    Kaf = "\u0643",
    Mim = "\u0645",
    Nun = "\u0646",
    Ha = "\u0647",
    Waw = "\u0648",
    Ya = "\u064A",

    Hamza = "\u0621",
    AlefMadda = "\u0622",
    AlefHamza = "\u0623",
    WawHamza = "\u0624",
    AlefHamzaBelow = "\u0625",
    YaHamza = "\u0626",
    TaMarbuta = "\u0629",
    AlefMaksura = "\u0649"
}

export enum Tashkil
{
    Dhamma = "\u064F",
    Fatha = "\u064E",
    Fathatan = "\u064B",
    Kasra = "\u0650",
    Kasratan = "\u064D",
    Sukun = "\u0652",
    LongVowelMarker = 0, //marks this as the tashkil of the long vowel letter
    EndOfWordMarker = 1, //marks the end of words (not verbs)
}

export type PrimaryTashkil = Tashkil.Dhamma | Tashkil.Fatha | Tashkil.Kasra;

export interface Stem1Context
{
    middleRadicalTashkil: PrimaryTashkil | "";
    middleRadicalTashkilPresent: PrimaryTashkil | "";

    /**
     * Some hollow verbs like لَيسَ are actually conjugated as if they were sound, although the root is hollow.
     */
    soundOverride: boolean;
}

export const TASHKIL_SHADDA = "\u0651";

//TODO: REMOVE THE FOLLOWING:
export const HHA = "\u062D";
export const LETTER_RA = "\u0631";
export const A3EIN = "\u0639";
export const FA = "\u0641";
export const QAF = "\u0642";
export const LAM = "\u0644";
//TODO: end of REMOVE THE FOLLOWING

export type Gender = "male" | "female";
export type _LegacyMood = "indicative" | "subjunctive" | "jussive" | "imperative";
export type Numerus = "singular" | "dual" | "plural";
export type _LegacyPerson = "first" | "second" | "third";
export type _LegacyTense = "perfect" | "present";
export type _LegacyVoice = "active" | "passive";

type AdvancedStem = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10;
export enum Mood
{
    Indicative,
    Subjunctive,
    Jussive,
    Imperative
}
export enum Person
{
    First,
    Second,
    Third
}
export enum Tense
{
    Perfect,
    Present
}
export enum Voice
{
    Active,
    Passive
}

interface Stem1Params
{
    readonly stem: 1;
    readonly stem1Context: Stem1Context;
}
interface AdvancedStemParams
{
    readonly stem: AdvancedStem;
}
type StemParams = Stem1Params | AdvancedStemParams;

interface PerfectTenseParams
{
    readonly tense: Tense.Perfect;
}
interface PresentTenseParams
{
    readonly tense: Tense.Present;
    readonly mood: Mood;
}
type TenseParams = PerfectTenseParams | PresentTenseParams;

interface BasicConjugationParams
{
    readonly person: Person;
    readonly voice: Voice;

    //TODO: LEGACY REMOVE
    readonly _legacyGender: Gender;
    readonly _legacyMood: _LegacyMood;
    readonly _legacyNumerus: Numerus;
    readonly _legacyPerson: _LegacyPerson;
    readonly _legacyStem1Context?: Stem1Context;
    readonly _legacyTense: _LegacyTense;
    readonly _legacyVoice: _LegacyVoice;
}

export type ConjugationParams = BasicConjugationParams & StemParams & TenseParams;