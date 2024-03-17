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

import { Tashkil, Letter, _LegacyVoice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";

export function GenerateParticipleStem8(root: VerbRoot, voice: _LegacyVoice): FullyVocalized[]
{
    const voicingTashkil = (voice === "active") ? Tashkil.Kasra : Tashkil.Fatha;
    switch(root.type)
    {
        case RootType.Defective:
            if(voice === "active")
            {
                return [
                    { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                    { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                    { letter: root.r2, shadda: false, tashkil: Tashkil.Kasratan },
                ];
    
            }
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r2, shadda: false, tashkil: Tashkil.Fathatan },
                { letter: Letter.AlefMaksura, shadda: false, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Sound:
            return [
                { letter: Letter.Mim, shadda: false, tashkil: Tashkil.Dhamma },
                { letter: root.r1, shadda: false, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, shadda: false, tashkil: Tashkil.Fatha },
                { letter: root.r2, shadda: false, tashkil: voicingTashkil },
                { letter: root.r3, shadda: false, tashkil: Tashkil.Sukun },
            ];
    }
    return [{letter: "TODO" as any, shadda: false, tashkil: Tashkil.Sukun}];
}