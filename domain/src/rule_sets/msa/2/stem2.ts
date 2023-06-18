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

import { StemDefinition } from "../../Definitions";
import { stem2_imperative } from "./imperative";
import { stem2_past_active } from "./past_active";
import { stem2_present_active } from "./present_active";

export const stem2: StemDefinition = {
    imperative: stem2_imperative,
    perfect: {
        active: stem2_past_active
    },
    present: {
        active: stem2_present_active
    },

    participleRules: {},
    verbalNounRules: {}
};