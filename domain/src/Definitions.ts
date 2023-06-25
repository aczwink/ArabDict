/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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

export const ALEF = "\u0627";
export const ALEF_HAMZA = "\u0623";
export const ALEF_MAKSURA = "\u0649";
export const LETTER_RA = "\u0631";
export const ZAY = "\u0632";
export const A3EIN = "\u0639";
export const FA = "\u0641";
export const QAF = "\u0642";
export const LAM = "\u0644";
export const MIM = "\u0645";
export const WAW = "\u0648";
export const WAW_HAMZA = "\u0624";
export const YA = "\u064A";

export const HAMZA = "\u0621";

export const FATHA = "\u064E";
export const DHAMMA = "\u064F";
export const KASRA = "\u0650";
export const SHADDA = "\u0651";
export const SUKUN = "\u0652";

export type PRIMARY_TASHKIL = "\u064E" | "\u064F" | "\u0650";
export type BASE_TASHKIL = PRIMARY_TASHKIL | "\u0652";