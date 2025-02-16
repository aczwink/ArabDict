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

import { Gender, Tense, Numerus, Person, Voice, Mood, StemNumber, VerbConjugationScheme } from "openarabicconjugation/src/Definitions";
import { GetDialectMetadata } from "openarabicconjugation/src/DialectsMetadata";
import { Stem1DataToStem1Context } from "./model";
import { DialectType } from "openarabicconjugation/src/Dialects";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { Use } from "acfrontend";
import { ConjugationService } from "../services/ConjugationService";

export function VerbFormComponent(input: { dialectType: DialectType; root: VerbRoot; index?: number; stem: StemNumber; stem1Context?: string; soundOverride?: boolean })
{
    const conjugationService = Use(ConjugationService);

    let stem1Context;
    let requiredContext;
    if(input.stem === 1)
    {
        const choices = GetDialectMetadata(input.dialectType).GetStem1ContextChoices(input.root);
        requiredContext = choices.requiredContext;

        const scheme = (input.soundOverride === true) ? VerbConjugationScheme.Sound : input.root.DeriveDeducedVerbConjugationScheme();
        if(input.index !== undefined)
        {
            const choice = choices.types[input.index];
    
            stem1Context = Stem1DataToStem1Context(input.dialectType, scheme, choice);
        }
        else if(input.stem1Context !== undefined)
            stem1Context = Stem1DataToStem1Context(input.dialectType, scheme, input.stem1Context);
    }

    const past = conjugationService.ConjugateToString(input.dialectType, input.root, {
        gender: Gender.Male,
        tense: Tense.Perfect,
        numerus: Numerus.Singular,
        person: Person.Third,
        stem: input.stem as any,
        stem1Context,
        voice: Voice.Active
    });
    const present = conjugationService.ConjugateToString(input.dialectType, input.root, {
        gender: Gender.Male,
        tense: Tense.Present,
        mood: Mood.Indicative,
        numerus: Numerus.Singular,
        person: Person.Third,
        stem: input.stem as any,
        stem1Context,
        voice: Voice.Active
    });

    if(requiredContext !== undefined)
    {
        const extra = conjugationService.ConjugateToString(input.dialectType, input.root, {
            ...requiredContext,
            stem: input.stem as any,
            stem1Context,
        });

        return past + " - " + present + " (" + extra + ")";
    }

    return past + " - " + present;
}