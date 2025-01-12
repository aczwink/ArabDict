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
    Hha = "\u062D",
    Kha = "\u062E",
    Dal = "\u062F",
    Thal = "\u0630",
    Ra = "\u0631",
    Zay = "\u0632",
    Siin = "\u0633",
    Shiin = "\u0634",
    Saad = "\u0635",
    Daad = "\u0636",
    Tta = "\u0637",
    Ththa = "\u0638",
    A3ein = "\u0639",
    Ghain = "\u063A",
    Fa = "\u0641",
    Qaf = "\u0642",
    Kaf = "\u0643",
    Lam = "\u0644",
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
    Dhammatan = "\u064C",
    Fatha = "\u064E",
    Fathatan = "\u064B",
    Kasra = "\u0650",
    Kasratan = "\u064D",
    Sukun = "\u0652",
    LongVowelMarker = 0, //marks this as the tashkil of the long vowel letter
    AlefMaksuraMarker = 1, //only used for marking a final alef maksura
    EndOfWordMarker = 2, //marks the end of words (not verbs)
}

export type PrimaryTashkil = Tashkil.Dhamma | Tashkil.Fatha | Tashkil.Kasra;
export type BaseTashkil = (PrimaryTashkil | Tashkil.Sukun);

export interface Stem1Context
{
    middleRadicalTashkil: BaseTashkil;
    middleRadicalTashkilPresent: BaseTashkil;

    /**
     * Some hollow verbs like لَيسَ are actually conjugated as if they were sound, although the root is hollow.
     */
    soundOverride: boolean;
}

export const TASHKIL_SHADDA = "\u0651";

export enum Case
{
    Accusative,
    Genitive,
    Nominative,
}

export type AdvancedStemNumber = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type StemNumber = 1 | AdvancedStemNumber;
export enum Gender
{
    Male,
    Female
}
export enum Mood
{
    Indicative,
    Subjunctive,
    Jussive,
    Imperative
}
export enum Numerus
{
    Singular,
    Dual,
    Plural
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

export type GenderString = "male" | "female";
export type MoodString = "indicative" | "subjunctive" | "jussive" | "imperative";
export type NumerusString = "singular" | "dual" | "plural";
export type PersonString = "first" | "second" | "third";
export type TenseString = "perfect" | "present";
export type VoiceString = "active" | "passive";

interface Stem1Params
{
    readonly stem: 1;
    readonly stem1Context: Stem1Context;
}
interface AdvancedStemParams
{
    readonly stem: AdvancedStemNumber;
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
    readonly gender: Gender;
    readonly numerus: Numerus;
    readonly person: Person;
    readonly voice: Voice;
}

export type ConjugationParams = BasicConjugationParams & StemParams & TenseParams;


export interface AdjectiveDeclensionParams
{
    gender: Gender;
    definite: boolean;
    case: Case;
}

export enum NounState
{
    Indefinite,
    Definite,
    Construct
}

export interface NounDeclensionParams
{
    case: Case;
    state: NounState;
}