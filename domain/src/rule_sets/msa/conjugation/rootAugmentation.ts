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

import { WAW, ALEF, ALEF_HAMZA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { RootType } from "../../../VerbRoot";
import { Vocalized } from "../../../Vocalization";
import { TA, NUN, SIIN } from "../_legacy/VerbStem";

export function AugmentRoot(stem: number, rootType: RootType, params: ConjugationParams): Vocalized[] | undefined
{
    switch(stem)
    {
        case 1:
        {
            switch(rootType)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
                case RootType.Quadriliteral:
                    return [
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                        { letter: "r4", shadda: false },
                    ];
            }
        }
        break;
        case 2:
        {
            switch(rootType)
            {
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: true },
                        { letter: "r3", shadda: false },
                    ];
            }
        }
        break;
        case 3:
        {
            switch(rootType)
            {
                case RootType.HamzaOnR1:
                case RootType.Sound:
                    return [
                        { letter: "r1", shadda: false },
                        { letter: ((params.tense === "perfect") && (params.voice === "passive")) ? WAW : ALEF, shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
            }
        }
        break;
        case 4:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    const x = [
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
                    if(params.tense === "perfect")
                        x.unshift({ letter: ALEF_HAMZA, shadda: false });
                    return x;
            }
        }
        break;
        case 5:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    return [
                        { letter: TA, shadda: false },
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: true },
                        { letter: "r3", shadda: false },
                    ];
            }
        }
        break;
        case 6:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    return [
                        { letter: TA, shadda: false },
                        { letter: "r1", shadda: false },
                        { letter: ((params.tense === "perfect") && (params.voice === "passive")) ? WAW : ALEF, shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
            }
        }
        break;
        case 7:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    const x = [
                        { letter: NUN, shadda: false },
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
                    if(params.tense === "perfect")
                        x.unshift({ letter: ALEF, shadda: false });
                    return x;
            }
        }
        break;
        case 8:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    const x = [
                        { letter: "r1", shadda: false },
                        { letter: TA, shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
                    if(params.tense === "perfect")
                        x.unshift({ letter: ALEF, shadda: false });
                    return x;
            }
        }
        break;
        case 10:
        {
            switch(rootType)
            {
                case RootType.Defective:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: SIIN, shadda: false },
                        { letter: TA, shadda: false },
                        { letter: "r1", shadda: false },
                        { letter: "r2", shadda: false },
                        { letter: "r3", shadda: false },
                    ];
            }
        }
        break;
    }
}