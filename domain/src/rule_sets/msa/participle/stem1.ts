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

import { Letter, Tashkil, Stem1Context, _LegacyVoice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized, _LegacyPartiallyVocalized } from "../../../Vocalization";

export function GenerateParticipleStem1(root: VerbRoot, voice: _LegacyVoice, stem1Context: Stem1Context): (_LegacyPartiallyVocalized | FullyVocalized)[]
{
    switch(root.type)
    {
        case RootType.Defective:
        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, shadda: false },
                    { letter: root.r2, shadda: false, tashkil: Tashkil.Kasratan },
                ];
            }
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                { letter: root.r2, shadda: false, tashkil: (stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma) ? Tashkil.Dhamma : Tashkil.Kasra },
                { letter: (stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma) ? Letter.Waw : Letter.Ya, shadda: true },
            ];

        case RootType.Hollow:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                    { letter: Letter.Hamza, shadda: false, tashkil: Tashkil.Kasra },
                    { letter: root.r3, shadda: false, tashkil: Tashkil.EndOfWordMarker },
                ];
            }
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: (stem1Context.middleRadicalTashkil === Tashkil.Kasra) ? Tashkil.Kasra : Tashkil.Dhamma },
                { letter: (stem1Context.middleRadicalTashkil === Tashkil.Kasra) ? Letter.Ya : Letter.Waw, shadda: false, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, shadda: false, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Quadriliteral:
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r2, shadda: false, tashkil: Tashkil.Sukun },
                { letter: root.r3, shadda: false, tashkil: (voice === "active") ? Tashkil.Kasra : Tashkil.Fatha },
                { letter: root.r4, shadda: false },
            ];

        case RootType.SecondConsonantDoubled:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: root.r2, shadda: true, tashkil: Tashkil.Sukun },
                ];
            }
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                { letter: root.r2, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: Letter.Waw, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: root.r2, shadda: false, tashkil: Tashkil.Sukun },
            ];

        case RootType.Sound:
            if(voice === "active")
            {
                return [
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: Letter.Alef, shadda: false, tashkil: Tashkil.LongVowelMarker },
                    { letter: root.r2, shadda: false, tashkil: Tashkil.Kasra },
                    { letter: root.r3, shadda: false, tashkil: Tashkil.EndOfWordMarker },
                ];
            }
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                { letter: root.r2, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: Letter.Waw, shadda: false, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, shadda: false, tashkil: Tashkil.EndOfWordMarker },
            ];
    }
    return [{letter: "TODO", shadda: false}];
}