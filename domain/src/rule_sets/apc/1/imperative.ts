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

export const stem1_imperative: StemTenseVoiceDefinition = {
    [RootType.Sound]: {
        rules: [
            { numerus: "singular", person: "second", gender: "male", conjugation: "فْعُولْ" },
            { numerus: "singular", person: "second", gender: "female", conjugation: "فْعِلِي" },

            { numerus: "dual", person: "second", gender: "male", conjugation: "" },

            { numerus: "plural", person: "second", gender: "male", conjugation: "فْعِلو" },
            { numerus: "plural", person: "second", gender: "female", conjugation: "" },
        ]
    }
};