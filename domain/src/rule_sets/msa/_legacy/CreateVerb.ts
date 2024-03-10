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

import { VerbRoot } from "../../../VerbRoot";
import { VerbStem } from "./VerbStem";
import { VerbStem8 } from "./VerbStem8";

export interface Stem1Context
{
    middleRadicalTashkil: string;
    middleRadicalTashkilPresent: string;

    /**
     * Some hollow verbs like لَيسَ are actually conjugated as if they were sound, although the root is hollow.
     */
    soundOverride: boolean;
}

export function CreateVerb(root: string, stem: number): VerbStem
{
    const vRoot = new VerbRoot(root);
    switch(stem)
    {
        case 8:
            return new VerbStem8(vRoot);
    }
    return {
        Conjugate: () => "TODO",
    };
}