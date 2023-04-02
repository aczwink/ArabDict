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

export const ALEF = "\u0627";
export const ALEF_HAMZA = "\u0623";
export const TA = "\u062A";
export const SIIN = "\u0633";
export const NUN = "\u0646";

export const DHAMMA = "\u064F";
export const FATHA = "\u064E";
export const KASRA = "\u0650";
export const SHADDA = "\u0651";
export const SUKUN = "\u0652";

export type Tempus = "perfect";
export type Person = "3rd-singular-masulin";

export interface VerbStem
{
    Conjugate(tempus: Tempus, person: Person): string;
}