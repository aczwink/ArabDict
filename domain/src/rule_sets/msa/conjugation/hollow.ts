/**
 * ArabDict
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
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

import { ConjugationParams, Gender, Letter, Mood, Numerus, Person, Tashkil, Tense, Voice } from "../../../Definitions";
import { AugmentedRoot } from "../AugmentedRoot";

function DoesPresentSuffixStartWithVowel(params: ConjugationParams)
{
    if( (params.numerus === Numerus.Singular) && (params.person === Person.Second) && (params.gender === Gender.Female) )
        return true;
    if(params.numerus === Numerus.Dual)
        return true;
    if( (params.numerus === Numerus.Plural) && (params.person !== Person.First) && (params.gender === Gender.Male) )
        return true;
    return false;
}

export function ShortenOrAlefizeR2(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        {
            const vowelTashkil = (augmentedRoot.r2.letter === Letter.Waw) ? Tashkil.Dhamma : Tashkil.Kasra;

            if(params.tense === Tense.Perfect)
            {
                if((params.person === Person.Third) && !((params.numerus === Numerus.Plural) && (params.gender === Gender.Female)))
                {
                    if(params.voice === Voice.Active)
                        augmentedRoot.InsertLongVowel(2, Letter.Alef);
                    else
                        augmentedRoot.InsertLongVowel(2, Letter.Ya);
                }
                else
                {
                    //shorten vowel
                    augmentedRoot.ApplyRadicalTashkil(2, (params.voice === Voice.Active) ? vowelTashkil : Tashkil.Kasra);
                    augmentedRoot.AssimilateRadical(2);
                }
            }
            else
            {
                let shortenVowel = (params.numerus === Numerus.Plural) && (params.gender === Gender.Female);

                if((params.mood === Mood.Jussive) || (params.mood === Mood.Imperative))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else if(params.voice === Voice.Passive)
                    augmentedRoot.ReplaceRadical(2, { letter: Letter.Alef, tashkil: Tashkil.Fatha });

                augmentedRoot.ApplyRadicalTashkil(1, (params.voice === Voice.Active) ? vowelTashkil : Tashkil.Fatha);
            }
        }
        break;
        case 4:
        case 10:
        {
            if(params.tense === Tense.Perfect)
            {
                if((params.person === Person.Third) && !((params.numerus === Numerus.Plural) && (params.gender === Gender.Female)))
                    augmentedRoot.InsertLongVowel(2, (params.voice === Voice.Active) ? Letter.Alef : Letter.Ya);
                else
                    augmentedRoot.InsertShortVowel(2, (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Kasra);
            }
            else
            {
                let shortenVowel = (params.numerus === Numerus.Plural) && (params.gender === Gender.Female);

                if((params.mood === Mood.Jussive) || (params.mood === Mood.Imperative))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else
                    augmentedRoot.InsertLongVowel(2, (params.voice === Voice.Passive) ? Letter.Alef : Letter.Ya);
            }
        }
        break;
    }
};