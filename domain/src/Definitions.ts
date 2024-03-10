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
    Tha = "\u062B",
    Jiim = "\u062C",
    Thal = "\u0630",
    Zay = "\u0632",
    Saad = "\u0635",
    Daad = "\u0636",
    Tta = "\u0637",
    Ththa = "\u0638",
    Ghain = "\u063A",
    Kaf = "\u0643",
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
}

export enum Tashkil
{
    Dhamma = "\u064F",
    Fatha = "\u064E",
    Kasra = "\u0650",
    Sukun = "\u0652",
    Vowel = 0, //marks this as the tashkil of the long vowel letter
    WordEnd = 1, //marks the end of words (not verbs)
}

export const ALEF = "\u0627"; //TODO: REMOVE
export const ALEF_HAMZA = "\u0623"; //TODO: REMOVE
export const ALEF_MAKSURA = "\u0649";
export const BA = "\u0628";
export const HHA = "\u062D";
export const DAL = "\u062F";
export const LETTER_RA = "\u0631";
export const ZAY = "\u0632"; //TODO: REMOVE
export const A3EIN = "\u0639";
export const FA = "\u0641";
export const QAF = "\u0642";
export const LAM = "\u0644";
export const MIM = "\u0645";
export const WAW = "\u0648"; //TODO: REMOVE

export const FATHA = "\u064E"; //TODO: REMOVE
export const FATHATAN = "\u064B";
export const DHAMMA = "\u064F"; //TODO: REMOVE
export const KASRA = "\u0650"; //TODO: REMOVE
export const KASRATAN = "\u064D";
export const SHADDA = "\u0651";
export const SUKUN = "\u0652"; //TODO: remove

export type PRIMARY_TASHKIL = "\u064E" | "\u064F" | "\u0650";
export type BASE_TASHKIL = PRIMARY_TASHKIL | "\u0652";
export type FULL_TASHKIL = BASE_TASHKIL | "\u064B" | "\u064D";
export type LONG_VOWEL = "\u0627" | "\u064A";