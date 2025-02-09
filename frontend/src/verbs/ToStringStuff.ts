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
            return "assimilated";
        case VerbConjugationScheme.AssimilatedAndDefective:
            return "assimilated+defective";
        case VerbConjugationScheme.Defective:
            return "defective";
        case VerbConjugationScheme.Geminate:
            return "geminate";
        case VerbConjugationScheme.HamzaOnR1:
            return "hamza on r1";
        case VerbConjugationScheme.Hollow:
            return "hollow";
        case VerbConjugationScheme.Sound:
            return "sound";
    }
}