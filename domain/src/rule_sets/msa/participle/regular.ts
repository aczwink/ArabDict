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
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";

export function GenerateParticipleDefective(baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    if(voice === Voice.Active)
    {
        baseForm.symbols.pop();
        baseForm.r2.tashkil = Tashkil.Kasratan;
    }
    else
        baseForm.r2.tashkil = Tashkil.Fathatan;
    
    return [
        { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
        ...baseForm.symbols
    ];
}

export function GenerateParticipleRegular(baseForm: AugmentedRoot, voice: Voice): ConjugationVocalized[]
{
    if(voice === Voice.Active)
        baseForm.r2.tashkil = Tashkil.Kasra;
    baseForm.r3.tashkil = Tashkil.EndOfWordMarker;
    
    return [
        { letter: Letter.Mim, tashkil: Tashkil.Dhamma },
        ...baseForm.symbols
    ];
}