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

function DeclineDefault(inputNoun: NounInput, params: NounDeclensionParams)
{
    if((params.case === Case.Accusative) && (params.state === NounState.Indefinite) && (inputNoun.gender === Gender.Male))
        return WithTashkilOnLast(inputNoun.vocalized, Tashkil.Fathatan).concat([ { emphasis: false, letter: Letter.Alef, shadda: false }]);
    return WithTashkilOnLast(inputNoun.vocalized, NounEndingTashkil(inputNoun, params));
}

export function DeclineNounTriptoteSuffix(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
{
    switch(inputNoun.numerus)
    {
        case Numerus.Singular:
            return DeclineDefault(inputNoun, params);

        case Numerus.Dual:
        {
            const fixedEnding = WithTashkilOnLast(inputNoun.vocalized, Tashkil.Kasra);

            if(params.case === Case.Nominative)
            {
                fixedEnding[fixedEnding.length - 2].letter = Letter.Alef;
                fixedEnding[fixedEnding.length - 2].tashkil = undefined;
            }

            if(params.state === NounState.Construct)
                fixedEnding.pop();

            return fixedEnding;
        }

        case Numerus.Plural:
        {
            const last = inputNoun.vocalized[inputNoun.vocalized.length - 1];
            const prev = inputNoun.vocalized[inputNoun.vocalized.length - 2];
            const isSoundMale = (last.letter === Letter.Nun) && (prev.letter === Letter.Ya);

            if(isSoundMale)
            {
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

            return DeclineDefault(inputNoun, params);
        }
    }
}