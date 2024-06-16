/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { Tashkil, Letter, AdjectiveDeclensionParams, Case } from "../../../Definitions";
import { DisplayVocalized, DisplayTashkil } from "../../../Vocalization";

export function AdjEndingTashkil(params: AdjectiveDeclensionParams): DisplayTashkil
{
    switch(params.case)
    {
        case Case.Accusative:
            if(params.definite)
                return Tashkil.Fatha;
            return Tashkil.Fathatan;

        case Case.Genitive:
            if(params.definite)
                return Tashkil.Kasra;
            return Tashkil.Kasratan;

        case Case.Nominative:
            if(params.definite)
                return Tashkil.Dhamma;
            return Tashkil.Dhammatan;
    }
}

export function RegularFemaleWithFathaThenTaMarbuta(vocalized: DisplayVocalized[])
{
    const last = vocalized[vocalized.length - 1];

    return vocalized.slice(0, vocalized.length - 1).concat([
        { ...last, tashkil: Tashkil.Fatha },
        { emphasis: false, letter: Letter.TaMarbuta, shadda: false }
    ]);
}

export function WithTashkilOnLast(vocalized: DisplayVocalized[], tashkil: DisplayTashkil)
{
    const last = vocalized[vocalized.length - 1];
    return vocalized.slice(0, vocalized.length - 1).concat([{
        ...last,
        tashkil
    }]);
}