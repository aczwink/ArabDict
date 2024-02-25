/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { DHAMMA, FATHA, WAW, YA } from "../../../Definitions";
import { ReverseConjugationResult } from "../../../DialectConjugator";
import { VerbRoot } from "../../../VerbRoot";
import { PartiallyVocalized } from "../../../Vocalization";

function TryMatchRootFromPresentWithoutPrefix(conjugated: PartiallyVocalized[]): ReverseConjugationResult[]
{
    switch(conjugated.length)
    {
        case 2:
            return [
                {
                    //assimilated
                    root: new VerbRoot(WAW + conjugated[0].letter + conjugated[1].letter),
                    tense: "present"
                },
                {
                    //hollow
                    root: new VerbRoot(conjugated[0].letter + WAW + conjugated[1].letter),
                    tense: "present"
                },
                {
                    //doubled r2
                    root: new VerbRoot(conjugated[0].letter + conjugated[1].letter + conjugated[1].letter),
                    tense: "present"
                }
            ];
    }
    throw new Error("TODO: implement me");
}

function TryMatchRootWithPrefix(conjugated: PartiallyVocalized[])
{
    switch(conjugated[0].letter)
    {
        case YA:
            switch(conjugated[0].tashkil)
            {
                case DHAMMA:
                case FATHA:
                case undefined:
                    return TryMatchRootFromPresentWithoutPrefix(conjugated.slice(1));
            }
    }
    return [];
}

export function ReverseConjugate(conjugated: PartiallyVocalized[]): ReverseConjugationResult[]
{
    return TryMatchRootWithPrefix(conjugated);
}