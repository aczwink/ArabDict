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

import { Case, DeclensionParams, Gender, Letter, Tashkil } from "../../../Definitions";
import { DisplayTashkil, DisplayVocalized } from "../../../Vocalization";

function CaseEnding(params: DeclensionParams): DisplayTashkil
{
    switch(params.case)
    {
        case Case.Nominative:
            if(params.definite)
                return Tashkil.Dhamma;
            else
                return Tashkil.Dhammatan;
    }
}

export function DeclineAdjectiveInSuffix(vocalized: DisplayVocalized[], params: DeclensionParams): DisplayVocalized[]
{
    const last = vocalized[vocalized.length - 1];
    if(params.gender === Gender.Male)
    {
        return vocalized.slice(0, vocalized.length - 1).concat([
            {
                ...last,
                tashkil: Tashkil.Kasra
            },
            {
                letter: Letter.Ya,
                emphasis: false,
                shadda: false
            }
        ]);
    }
    else
    {
        return vocalized.slice(0, vocalized.length - 1).concat([
            {
                ...last,
                tashkil: Tashkil.Kasra
            },
            {
                letter: Letter.Ya,
                emphasis: false,
                shadda: false,
                tashkil: Tashkil.Fatha
            },
            {
                letter: Letter.TaMarbuta,
                emphasis: false,
                shadda: false,
                tashkil: CaseEnding(params)
            }
        ]);
    }

    return [{letter: "TODO DeclineAdjectiveInSuffix" as any, tashkil: Tashkil.Dhamma, emphasis: true, shadda: true}];
}
