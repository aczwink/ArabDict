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

import { RootType } from "../../../VerbRoot";
import { StemDefinition } from "../../Definitions";
import { stem2_imperative } from "./imperative";
import { stem2_past_active } from "./past_active";
import { stem2_past_passive } from "./past_passive";
import { stem2_present_active } from "./present_active";
import { stem2_present_passive } from "./present_passive";

export const stem2: StemDefinition = {
    imperative: stem2_imperative,
    perfect: {
        active: stem2_past_active,
        passive: stem2_past_passive,
    },
    present: {
        active: stem2_present_active,
        passive: stem2_present_passive,
    },

    participleRules: {
        [RootType.Defective]: [
            { voice: "active", conjugation: "TODO" },
            { voice: "passive", conjugation: "TODO" },
        ],

        [RootType.Quadriliteral]: [
            { voice: "active", conjugation: "TODO" },
            { voice: "passive", conjugation: "TODO" },
        ],

        [RootType.Sound]: [
            { voice: "active", conjugation: "مُفَعِّل" },
            { voice: "passive", conjugation: "مُفَعَّل" },
        ],
    },

    verbalNounRules: {
        [RootType.Defective]: [
            {
                id: 0,
                text: "TODO"
            }
        ],

        [RootType.Quadriliteral]: [
            {
                id: 0,
                text: "TODO"
            }
        ],

        [RootType.Sound]: [
            {
                id: 0,
                text: "TODO"
            }
        ],
    }
};