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

import { ConjugationParams, Letter, Tashkil } from "../../../Definitions";
import { AugmentedRoot } from "../AugmentedRoot";

export function DropOutR1(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        {
            if( (params._legacyTense === "present") && (augmentedRoot.r1.letter === Letter.Waw))
            {
                if(params._legacyVoice === "active")
                    augmentedRoot.DropRadial(1);
                else
                    augmentedRoot.ApplyRadicalTashkil(1, Tashkil.Dhamma);
            }
        }
        break;
    }
};