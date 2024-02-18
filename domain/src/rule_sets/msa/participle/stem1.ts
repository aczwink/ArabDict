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

import { FATHA, ALEF, KASRATAN, MIM, SUKUN, DHAMMA, KASRA, WAW, YA, YA_HAMZA } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { PartiallyVocalized } from "../../../Vocalization";
import { Stem1Context } from "../_legacy/CreateVerb";
import { Voice } from "../_legacy/VerbStem";

export function GenerateParticipleStem1(root: VerbRoot, voice: Voice, stem1Context: Stem1Context): PartiallyVocalized[]
{
    switch(root.type)
    {
        case RootType.Defective:
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false },
                    { letter: root.r2, shadda: false, tashkil: KASRATAN as any },
                ];
            }
            return [
                { letter: MIM, shadda: false, tashkil: FATHA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: root.r2, shadda: false, tashkil: (stem1Context.middleRadicalTashkilPresent === DHAMMA) ? DHAMMA : KASRA },
                { letter: (stem1Context.middleRadicalTashkilPresent === DHAMMA) ? WAW : YA, shadda: true },
            ];

        case RootType.Hollow:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false },
                    { letter: YA_HAMZA, shadda: false, tashkil: KASRA },
                    { letter: root.r3, shadda: false },
                ];
            }
            return [
                { letter: MIM, shadda: false, tashkil: FATHA },
                { letter: root.r1, shadda: false, tashkil: (stem1Context.middleRadicalTashkil === KASRA) ? KASRA : DHAMMA },
                { letter: (stem1Context.middleRadicalTashkil === KASRA) ? YA : WAW, shadda: false },
                { letter: root.r3, shadda: false },
            ];

        case RootType.Quadriliteral:
            return [
                { letter: MIM, shadda: false, tashkil: DHAMMA },
                { letter: root.r1, shadda: false, tashkil: FATHA },
                { letter: root.r2, shadda: false, tashkil: SUKUN },
                { letter: root.r3, shadda: false, tashkil: (voice === "active") ? KASRA : FATHA },
                { letter: root.r4, shadda: false },
            ];

        case RootType.SecondConsonantDoubled:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: true, tashkil: SUKUN },
                ];
            }
            return [
                { letter: MIM, shadda: false, tashkil: FATHA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: root.r2, shadda: false, tashkil: DHAMMA },
                { letter: WAW, shadda: false, tashkil: DHAMMA },
                { letter: root.r2, shadda: false, tashkil: SUKUN },
            ];

        case RootType.Sound:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: FATHA },
                    { letter: ALEF, shadda: false },
                    { letter: root.r2, shadda: false, tashkil: KASRA },
                    { letter: root.r3, shadda: false },
                ];
            }
            return [
                { letter: MIM, shadda: false, tashkil: FATHA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: root.r2, shadda: false, tashkil: DHAMMA },
                { letter: WAW, shadda: false },
                { letter: root.r3, shadda: false },
            ];
    }
    return [{letter: "TODO", shadda: false}];
}