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

import { Case, Gender, Letter, NounDeclensionParams, NounState, Numerus, Tashkil } from "../../../Definitions";
import { NounInput } from "../../../DialectConjugator";
import { DisplayTashkil, DisplayVocalized } from "../../../Vocalization";
import { AdjEndingTashkil, WithTashkilOnLast } from "../adjectives/shared";

function NounEndingTashkil(inputNoun: NounInput, params: NounDeclensionParams): DisplayTashkil
{
    if(params.state === NounState.Construct)
        return AdjEndingTashkil({ case: params.case, definite: true, gender: inputNoun.gender });

    if(inputNoun.gender === Gender.Female)
    {
        if((inputNoun.numerus === Numerus.Plural) && (params.case === Case.Accusative))
            return NounEndingTashkil(inputNoun, { ...params, case: Case.Genitive });
    }

    return AdjEndingTashkil({ case: params.case, definite: params.state === NounState.Definite, gender: inputNoun.gender });
}

export function DeclineNounTriptoteSuffix(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
{
    switch(inputNoun.numerus)
    {
        case Numerus.Singular:
        {
            if((params.case === Case.Accusative) && (params.state === NounState.Indefinite) && (inputNoun.gender === Gender.Male))
                return WithTashkilOnLast(inputNoun.vocalized, Tashkil.Fathatan).concat([ { emphasis: false, letter: Letter.Alef, shadda: false }]);
            return WithTashkilOnLast(inputNoun.vocalized, NounEndingTashkil(inputNoun, params))
        }

        case Numerus.Plural:
        {
            if(inputNoun.gender === Gender.Female)
                return WithTashkilOnLast(inputNoun.vocalized, NounEndingTashkil(inputNoun, params));
            
            const fixedEnding = WithTashkilOnLast(inputNoun.vocalized, Tashkil.Fatha);
            if(params.case === Case.Nominative)
            {
                fixedEnding[fixedEnding.length - 2].letter = Letter.Waw;
                fixedEnding[fixedEnding.length - 3].tashkil = Tashkil.Dhamma;
            }

            if(params.state === NounState.Construct)
                fixedEnding.pop();

            return fixedEnding;
        }
    }

    return [
        { emphasis: true, letter: "TODO DeclineNounTriptoteSuffix" as any, shadda: true }
    ];
}