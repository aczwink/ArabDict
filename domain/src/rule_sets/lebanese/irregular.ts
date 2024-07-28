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

import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tashkil, Tense } from "../../Definitions";
import { VerbRoot } from "../../VerbRoot";
import { AugmentedRoot, SymbolName } from "../msa/AugmentedRoot";

function IrregularIja(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if((params.tense === Tense.Perfect) && (params.person === Person.Third))
    {
        augmentedRoot.symbols.unshift({ letter: Letter.Hamza, tashkil: Tashkil.Kasra, emphasis: false, symbolName: SymbolName.Prefix1 });

        if((params.numerus === Numerus.Singular) && (params.gender === Gender.Male))
            augmentedRoot.r2.letter = Letter.Alef;
        else
            augmentedRoot.DropRadial(2);
    }
    else if(params.tense === Tense.Present)
    {
        if(params.mood === Mood.Imperative)
        {
            augmentedRoot.ReplaceRadical(1, { letter: Letter.Ta, tashkil: Tashkil.Fatha });
            augmentedRoot.r2.letter = Letter.A3ein;
            if(params.numerus === Numerus.Singular)
            {
                if(params.gender === Gender.Male)
                {
                    augmentedRoot.r2.tashkil = Tashkil.Fatha;
                    augmentedRoot.ReplaceRadical(3, { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker });
                }
                else
                {
                    augmentedRoot.r2.tashkil = Tashkil.Kasra;
                    augmentedRoot.DropRadial(3);
                }
            }
            else
            {
                augmentedRoot.r2.tashkil = Tashkil.Dhamma;
                augmentedRoot.DropRadial(3);
            }
            return;
        }

        if(
            ( (params.numerus === Numerus.Singular) && (params.person === Person.Second) && (params.gender === Gender.Female) )
            ||
            ( (params.numerus === Numerus.Plural) && (params.person !== Person.First) )
        )
        {
            augmentedRoot.DropRadial(2);
        }
    }

    augmentedRoot.DropRadial(3);
}

export function DoIrregularModifications(root: VerbRoot, augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
    {
        IrregularIja(augmentedRoot, params);
        return true;
    }
    
    return false;
}