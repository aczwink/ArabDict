/**
 * OpenArabDictViewer
 * Copyright (C) 2025 Amir Czwink (amir130@hotmail.de)
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
import { VerbConjugationScheme } from "openarabicconjugation/src/Definitions";

export function ConjugationSchemeToString(scheme: VerbConjugationScheme): string
{
    switch(scheme)
    {
        case VerbConjugationScheme.Assimilated:
            return "Assimilated";
        case VerbConjugationScheme.AssimilatedAndDefective:
            return "Assimilated + Defective";
        case VerbConjugationScheme.Defective:
            return "Defective";
        case VerbConjugationScheme.Geminate:
            return "Geminate";
        case VerbConjugationScheme.HamzaOnR1:
            return "Hamza on R1";
        case VerbConjugationScheme.Hollow:
            return "Hollow";
        case VerbConjugationScheme.Sound:
            return "Sound";
    }
}