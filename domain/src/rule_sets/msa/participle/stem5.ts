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

import { Letter, Tashkil, _LegacyVoice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";

export function GenerateParticipleStem5(root: VerbRoot, voice: _LegacyVoice): FullyVocalized[]
{
    switch(root.type)
    {
        case RootType.Defective:
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r2, shadda: true, tashkil: (voice === "active" ? Tashkil.Kasratan : Tashkil.Fathatan) },
            ];

        case RootType.SecondConsonantDoubled:
        case RootType.Sound:
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r2, shadda: true, tashkil: (voice === "active" ? Tashkil.Kasra : Tashkil.Fatha) },
                { letter: root.r3, shadda: false, tashkil: Tashkil.Sukun },
            ];
    }
    return [{letter: "TODO" as any, shadda: false, tashkil: Tashkil.Sukun }];
}