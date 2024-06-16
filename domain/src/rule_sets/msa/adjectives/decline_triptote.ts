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

import { AdjectiveDeclensionParams, Gender } from "../../../Definitions";
import { DisplayVocalized } from "../../../Vocalization";
import { WithTashkilOnLast, RegularFemaleWithFathaThenTaMarbuta, AdjEndingTashkil } from "./shared";

export function DeclineAdjectiveTriptoteSuffix(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[]
{
    if(params.gender === Gender.Male)
        return WithTashkilOnLast(vocalized, AdjEndingTashkil(params));
    return WithTashkilOnLast(RegularFemaleWithFathaThenTaMarbuta(vocalized), AdjEndingTashkil(params));
}
