/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { RootType, VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { RootOverviewData } from "../../dist/api";
import { ExtraTashkil, Letter, Tashkil } from "openarabicconjugation/src/Definitions";

export function AreValidRootCharacters(rootRadicals: string)
{
    const chars = rootRadicals.split("");
    if(chars.length > 4)
        return false;
    return chars.Values().Map(IsValidRootRadical).All();
}

export function DoRootCharactersFormValidRoot(rootRadicals: string)
{
    const chars = rootRadicals.split("");
    if(chars.length < 3)
        return false;
    if(chars.length > 4)
        return false;
    return AreValidRootCharacters(rootRadicals);
}

function IsArabicChar(char: string)
{
    switch(char)
    {
        case Letter.Alef:
        case Letter.AlefHamza:
        case Letter.AlefHamzaBelow:
        case Letter.AlefMadda:
        case Letter.AlefMaksura:
        case Letter.TaMarbuta:
        case Letter.WawHamza:
        case Letter.YaHamza:
            return true;

        case Tashkil.Dhamma:
        case Tashkil.Dhammatan:
        case Tashkil.Fatha:
        case Tashkil.Fathatan:
        case Tashkil.Kasra:
        case Tashkil.Kasratan:
        case Tashkil.Sukun:
        case ExtraTashkil.Shadda:
        case ExtraTashkil.DaggerAlef:
            return true;
    }
    return IsValidRootRadical(char);
}

export function IsArabicText(text: string)
{
    for (const char of text)
    {
        if(!IsArabicChar(char))
            return false;
    }
    return true;
}

export function IsValidRootRadical(char: string)
{
    switch(char)
    {
        case Letter.Hamza:
        case Letter.Ba:
        case Letter.Ta:
        case Letter.Tha:
        case Letter.Jiim:
        case Letter.Hha:
        case Letter.Kha:
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
        case Letter.A3ein:
        case Letter.Ghain:
        case Letter.Fa:
        case Letter.Qaf:
        case Letter.Kaf:
        case Letter.Lam:
        case Letter.Mim:
        case Letter.Nun:
        case Letter.Ha:
        case Letter.Waw:
        case Letter.Ya:
            return true;
    }
    return false;
}

export function RootToString(rootData: RootOverviewData)
{
    const root = new VerbRoot(rootData.radicals);

    if(rootData.ya === true)
    {
        switch(root.type)
        {
            case RootType.FinalWeak:
                {
                    const radicalsYa = rootData.radicals.substring(0, 2) + Letter.Ya;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
            case RootType.MiddleWeak:
                {
                    const radicalsYa = root.r1 + Letter.Ya + root.r3;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
        }
    }

    return root.ToString();
}

export function RootTypeToPattern(rootType: RootType)
{
    switch(rootType)
    {
        case RootType.InitialWeak:
            return "(و|ي)-r2-r3";
        case RootType.FinalWeak:
            return "r1-r2-(و|ي)";
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            return "و-r2-(و|ي)";
        case RootType.HamzaOnR1:
            return "ء-r2-r3";
        case RootType.MiddleWeak:
            return "r1-(و|ي)-r3";
        case RootType.Quadriliteral:
            return "r1-r2-r3-r4";
        case RootType.SecondConsonantDoubled:
            return "r1-r2-r2";
        case RootType.Regular:
            return "r1-r2-r3";
    }
}

export function RootTypeToString(rootType: RootType)
{
    switch(rootType)
    {
        case RootType.InitialWeak:
            return "Initial-weak";
        case RootType.FinalWeak:
            return "final-weak";
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            return "Doubly-weak";
        case RootType.HamzaOnR1:
            return "Hamza on first radical";
        case RootType.MiddleWeak:
            return "middle-weak";
        case RootType.Quadriliteral:
            return "Quadriliteral";
        case RootType.SecondConsonantDoubled:
            return "Second consonant doubled";
        case RootType.Regular:
            return "regular";
    }
}