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
import { Tashkil } from "../../../Definitions";
import { VerbRoot } from "../../../VerbRoot";
import { _LegacyVerbStem } from "./VerbStem";
import { _LegacyVerbStem8 } from "./VerbStem8";

//TODO: REMOVE
export function _LegacyCreateVerb(root: string, stem: number): _LegacyVerbStem
{
    const vRoot = new VerbRoot(root);
    switch(stem)
    {
        case 8:
            return new _LegacyVerbStem8(vRoot);
    }
    return {
        Conjugate: () => "T" + Tashkil.Fatha + "O" + Tashkil.Fatha + "D" + Tashkil.Fatha + "O" + Tashkil.Fatha,
    };
}