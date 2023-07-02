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

import { DialectDefinition } from "../Definitions";
import { stem1 } from "./1/stem1";
import { stem2 } from "./2/stem2";
import { stem3 } from "./3/stem3";
import { stem4 } from "./4/stem4";
import { stem5 } from "./5/stem5";
import { stem8 } from "./8/stem8";

export const definition: DialectDefinition = {
    stems: {
        1: stem1,
        2: stem2,
        3: stem3,
        4: stem4,
        5: stem5,
        8: stem8,
    }
};