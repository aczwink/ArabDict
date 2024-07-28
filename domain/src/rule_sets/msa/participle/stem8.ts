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

import { Tashkil, Letter, Voice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { GenerateParticipleRegular } from "./regular";

export function GenerateParticipleStem8(root: VerbRoot, baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    switch(root.type)
    {
        case RootType.Defective:
            if(voice === Voice.Active)
            {
                return [
                    { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                    { letter: root.r1, tashkil: Tashkil.Sukun },
                    { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                    { letter: root.r2, tashkil: Tashkil.Kasratan },
                ];
    
            }
            return [
                { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, tashkil: Tashkil.Fatha },
                { letter: root.r2, tashkil: Tashkil.Fathatan },
                { letter: Letter.AlefMaksura, tashkil: Tashkil.EndOfWordMarker },
            ];

        case RootType.Hollow:
            baseForm.symbols[0].letter = Letter.Mim;
            baseForm.symbols[0].tashkil = Tashkil.Dhamma;
            baseForm.ApplyRadicalTashkil(1, Tashkil.Sukun);
            baseForm.ApplyRadicalTashkil(3, Tashkil.EndOfWordMarker);
            return baseForm.symbols;

        case RootType.Sound:
            return GenerateParticipleRegular(baseForm, voice, true);
    }
    return [{letter: "TODO" as any, tashkil: Tashkil.Sukun}];
}