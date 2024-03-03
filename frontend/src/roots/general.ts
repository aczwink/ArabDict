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
import { BA, HAMZA, HHA, LAM, LETTER_RA, Letter, MIM, QAF, WAW, YA } from "arabdict-domain/src/Definitions";
import { NUN, SIIN, TA } from "arabdict-domain/src/rule_sets/msa/_legacy/VerbStem";

export function AreValidRootCharacters(rootRadicals: string)
{
    const chars = rootRadicals.split("");
    if(chars.length < 3)
        return false;
    if(chars.length > 4)
        return false;
    return chars.Values().Map(IsValidRootRadical).All();
}

export function IsValidRootRadical(char: string)
{
    switch(char)
    {
        case BA:
        case TA:
        case Letter.Tha:
        case HHA:
        case LETTER_RA:
        case SIIN:
        case Letter.Tta:
        case Letter.Ththa:
        case Letter.Ghain:
        case QAF:
        case Letter.Kaf:
        case LAM:
        case MIM:
        case NUN:
        case WAW:
        case YA:
        case HAMZA:
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
                    const radicalsYa = rootData.radicals.substring(0, 2) + YA;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
            case RootType.Hollow:
                {
                    const radicalsYa = root.r1 + YA + root.r3;
                    const root2 = new VerbRoot(radicalsYa);
                    return root.ToString() + " / " + root2.ToString();
                }
        }
    }

    return root.ToString();
}