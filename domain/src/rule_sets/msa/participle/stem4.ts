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

import { Letter, Tashkil, VoiceString } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";

export function GenerateParticipleStem4(root: VerbRoot, voice: VoiceString): ConjugationVocalized[]
{
    const voicingTashkil = (voice === "active") ? Tashkil.Kasra : Tashkil.Fatha;
    switch(root.type)
    {
        case RootType.Hollow:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: root.r1, tashkil: voicingTashkil },
                { letter: (voice === "active") ? Letter.Ya : Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.HamzaOnR1:
        case RootType.Sound:
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: root.r2, tashkil: voicingTashkil },
                { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
            ];
    }
    return [
        {
            letter: ("TODO: implement me: " + root.type) as any,
            tashkil: Tashkil.EndOfWordMarker
        }
    ];
}