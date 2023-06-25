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

export const stem1_present_active: StemTenseVoiceDefinition = {
    [RootType.Sound]: {
        rules: [
            { numerus: "singular", person: "first", gender: "male", conjugation: "بِفْعُلْ" },
            { numerus: "singular", person: "second", gender: "male", conjugation: "بْتِفْعُلْ" },
            { numerus: "singular", person: "second", gender: "female", conjugation: "بْتِفْعُلِي" },
            { numerus: "singular", person: "third", gender: "male", conjugation: "بِيفْعُلْ" },
            { numerus: "singular", person: "third", gender: "female", conjugation: "بْتِفْعُلْ" },

            { numerus: "dual", person: "second", gender: "male", conjugation: "" },
            { numerus: "dual", person: "third", gender: "male", conjugation: "" },
            { numerus: "dual", person: "third", gender: "female", conjugation: "" },

            { numerus: "plural", person: "first", gender: "male", conjugation: "مْنِفْعُلْ" },
            { numerus: "plural", person: "second", gender: "male", conjugation: "بْتِفْعُلو" },
            { numerus: "plural", person: "second", gender: "female", conjugation: "" },
            { numerus: "plural", person: "third", gender: "male", conjugation: "بِيفْعُلو" },
            { numerus: "plural", person: "third", gender: "female", conjugation: "" },
        ]
    },
};