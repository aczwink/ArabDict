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
import { StemTenseVoiceDefinition } from "../../Definitions";

export const stem1_past_active: StemTenseVoiceDefinition = {
    [RootType.Sound]: {
        rules: [
            { numerus: "singular", person: "first", gender: "male", conjugation: "فَعَلِتْ" },
            { numerus: "singular", person: "second", gender: "male", conjugation: "فَعَلِتْ" },
            { numerus: "singular", person: "second", gender: "female", conjugation: "فَعَلْتِي" },
            { numerus: "singular", person: "third", gender: "male", conjugation: "فَعَلْ" },
            { numerus: "singular", person: "third", gender: "female", conjugation: "فَعَلِتْ" },

            { numerus: "dual", person: "second", gender: "male", conjugation: "" },
            { numerus: "dual", person: "third", gender: "male", conjugation: "" },
            { numerus: "dual", person: "third", gender: "female", conjugation: "" },

            { numerus: "plural", person: "first", gender: "male", conjugation: "فَعَلْنا" },
            { numerus: "plural", person: "second", gender: "male", conjugation: "فَعَلْتو" },
            { numerus: "plural", person: "second", gender: "female", conjugation: "" },
            { numerus: "plural", person: "third", gender: "male", conjugation: "فَعَلو" },
            { numerus: "plural", person: "third", gender: "female", conjugation: "" },
        ]
    },
};