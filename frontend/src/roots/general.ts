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

import { RootType, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { RootCreationData, RootOverviewData } from "../../dist/api";
import { IsFlagSet, RootFlags } from "../shared/flags";
import { LETTER_RA, Letter, QAF } from "arabdict-domain/src/Definitions";

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
        case LETTER_RA:
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
        case QAF:
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

export function RootToString(rootData: RootCreationData | RootOverviewData)
{
    const root = new VerbRoot(rootData.radicals);

    if(IsFlagSet(rootData.flags, RootFlags.DefectiveOrHollowAlsoYa))
    {
        switch(root.type)
        {
            case RootType.Defective:
                {
                    const radicalsYa = rootData.radicals.substring(0, 2) + Letter.Ya;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
            case RootType.Hollow:
                {
                    const radicalsYa = root.r1 + Letter.Ya + root.r3;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
        }
    }

    return root.ToString();
}