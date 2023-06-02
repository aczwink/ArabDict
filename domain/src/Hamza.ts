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

import { ALEF_HAMZA, FATHA, HAMZA } from "./Definitions";
import { Vocalized } from "./Vocalization";

function FinalHamza(vocalized: Vocalized, prev: Vocalized): Vocalized
{
    if(vocalized.letter === HAMZA)
    {
        switch(prev.tashkil)
        {
            case FATHA:
                return { letter: ALEF_HAMZA, tashkil: vocalized.tashkil };
        }
    }
    return vocalized;
}

export function Hamzate(...vocalized: Vocalized[])
{
    //initial hamza should already be handled
    const result = [vocalized[0]];

    for(let i = 1; i < vocalized.length - 1; i++)
    {
        //medial hamza

        result.push(vocalized[i]);
    }

    //final hamza
    result.push(FinalHamza(vocalized[vocalized.length - 1], vocalized[vocalized.length - 2]));

    return result.Values().Map(x => x.letter + x.tashkil).Join("");
}
