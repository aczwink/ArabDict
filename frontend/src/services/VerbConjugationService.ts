/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { Injectable } from "acfrontend";
import { Gender, Person, Numerus, Mood, VerbConjugationScheme } from "openarabicconjugation/src/Definitions";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { VerbData } from "../../dist/api";
import { Stem1DataToStem1ContextOptional } from "../verbs/model";
import { ConjugationService } from "./ConjugationService";
import { DialectsService } from "./DialectsService";
import { VocalizedWordTostring } from "openarabicconjugation/src/Vocalization";

@Injectable
export class VerbConjugationService
{
    constructor(private dialectsService: DialectsService, private conjugationService: ConjugationService)
    {
    }

    public BuildStem1Context(rootRadicals: string, verbData: VerbData)
    {
        const dialectType = this.dialectsService.MapIdToType(verbData.dialectId);

        const root = new VerbRoot(rootRadicals);
        const scheme = (verbData.soundOverride === true) ? VerbConjugationScheme.Sound : root.DeriveDeducedVerbConjugationScheme();
        const stem1ctx = Stem1DataToStem1ContextOptional(dialectType, scheme, verbData.stem1Context);
        return stem1ctx;
    }

    public CreateDisplayVersionOfVerb(rootRadicals: string, verbData: VerbData)
    {
        const dialectType = this.dialectsService.MapIdToType(verbData.dialectId);
        const stem1ctx = this.BuildStem1Context(rootRadicals, verbData);
        const conjugated = this.conjugationService.Conjugate(dialectType, rootRadicals, verbData.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        return conjugated;
    }

    public CreateDisplayVersionOfVerbAsString(rootRadicals: string, verbData: VerbData)
    {
        return VocalizedWordTostring(this.CreateDisplayVersionOfVerb(rootRadicals, verbData));
    }
}