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

import { MIM, DHAMMA, SUKUN, FATHA, KASRA, KASRATAN, FATHATAN, ALEF_MAKSURA } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { FullyVocalized } from "../../../Vocalization";
import { TA, Voice } from "../_legacy/VerbStem";

export function GenerateParticipleStem8(root: VerbRoot, voice: Voice): FullyVocalized[]
{
    const voicingTashkil = (voice === "active") ? KASRA : FATHA;
    switch(root.type)
    {
        case RootType.Defective:
            if(voice === "active")
            {
                return [
                    { letter: MIM, shadda: false, tashkil: DHAMMA },
                    { letter: root.r1, shadda: false, tashkil: SUKUN },
                    { letter: TA, shadda: false, tashkil: FATHA },
                    { letter: root.r2, shadda: false, tashkil: KASRATAN },
                ];
    
            }
            return [
                { letter: MIM, shadda: false, tashkil: DHAMMA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: FATHA },
                { letter: root.r2, shadda: false, tashkil: FATHATAN },
                { letter: ALEF_MAKSURA, shadda: false, tashkil: SUKUN },
            ];

        case RootType.Sound:
            return [
                { letter: MIM, shadda: false, tashkil: DHAMMA },
                { letter: root.r1, shadda: false, tashkil: SUKUN },
                { letter: TA, shadda: false, tashkil: FATHA },
                { letter: root.r2, shadda: false, tashkil: voicingTashkil },
                { letter: root.r3, shadda: false, tashkil: SUKUN },
            ];
    }
    return [{letter: "TODO", shadda: false, tashkil: SUKUN}];
}