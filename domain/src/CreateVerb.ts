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

import { VerbRoot } from "./VerbRoot";
import { VerbStem } from "./VerbStem";
import { VerbStem1 } from "./VerbStem1";
import { VerbStem10 } from "./VerbStem10";
import { VerbStem4 } from "./VerbStem4";
import { VerbStem5 } from "./VerbStem5";
import { VerbStem6 } from "./VerbStem6";
import { VerbStem7 } from "./VerbStem7";
import { VerbStem8 } from "./VerbStem8";
import { VerbStem9 } from "./VerbStem9";

export interface Stem1Context
{
    /**
     * -For hollow, only used when the present tense tashkil is fatha.
     * -Not used for defective.
     */
    middleRadicalTashkil: string;

    /**
     * -For hollow, the tashkil of the middle radical in present tense.
     * -For defective it defines the tashkil of the present tense. The past can be then mapped accordingly.
     */
    middleRadicalTashkilPresent: string;

    /**
     * Some hollow verbs like لَيسَ are actually conjugated as if they were sound, although the root is hollow.
     */
    soundOverride: boolean;
}

export function CreateVerb(root: string, stem: number, stem1Context?: Stem1Context): VerbStem
{
    const vRoot = new VerbRoot(root);
    switch(stem)
    {
        case 1:
            if(stem1Context === undefined)
                throw new Error("Missing context for verb in stem 1");
            return new VerbStem1(vRoot, stem1Context.middleRadicalTashkil, stem1Context.middleRadicalTashkilPresent);
        case 4:
            return new VerbStem4(vRoot);
        case 5:
            return new VerbStem5(vRoot);
        case 6:
            return new VerbStem6(vRoot);
        case 7:
            return new VerbStem7(vRoot);
        case 8:
            return new VerbStem8(vRoot);
        case 9:
            return new VerbStem9(vRoot);
        case 10:
            return new VerbStem10(vRoot);
    }
    throw new Error("not implemented");
}