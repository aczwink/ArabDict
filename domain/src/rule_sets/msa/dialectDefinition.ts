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

import { DialectDefinition } from "../Definitions";
import { stem2 } from "./_legacy/2/stem2";
import { stem3 } from "./_legacy/3/stem3";
import { stem8 } from "./_legacy/8/stem8";

//TODO: REMOVE
export const _Legacydefinition: DialectDefinition = {
    stems: {
        2: stem2,
        3: stem3,
        8: stem8,
    }
};