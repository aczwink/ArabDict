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

import { ConjugationParams, Letter, Tashkil } from "../../../Definitions";
import { AugmentedRoot } from "../AugmentedRoot";

function DoesPresentSuffixStartWithVowel(params: ConjugationParams)
{
    if( (params._legacyNumerus === "singular") && (params._legacyPerson === "second") && (params._legacyGender === "female") )
        return true;
    if(params._legacyNumerus === "dual")
        return true;
    if( (params._legacyNumerus === "plural") && (params._legacyPerson !== "first") && (params._legacyGender === "male") )
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

            if(params._legacyTense === "perfect")
            {
                if((params._legacyPerson === "third") && !((params._legacyNumerus === "plural") && (params._legacyGender === "female")))
                {
                    if(params._legacyVoice === "active")
                        augmentedRoot.ReplaceRadical(2, { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Fatha });
                    else
                        augmentedRoot.InsertLongVowel(2, Letter.Ya);
                }
                else
                {
                    //shorten vowel
                    augmentedRoot.ApplyRadicalTashkil(2, (params._legacyVoice === "active") ? vowelTashkil : Tashkil.Kasra);
                    augmentedRoot.AssimilateRadical(2);
                }
            }
            else
            {
                let shortenVowel = (params._legacyNumerus === "plural") && (params._legacyGender === "female");

                if((params._legacyMood === "jussive") || (params._legacyMood === "imperative"))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else if(params._legacyVoice === "passive")
                    augmentedRoot.ReplaceRadical(2, { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Fatha });

                augmentedRoot.ApplyRadicalTashkil(1, (params._legacyVoice === "active") ? vowelTashkil : Tashkil.Fatha);
            }
        }
        break;
        case 10:
        {
            if(params._legacyTense === "perfect")
            {
                if((params._legacyPerson === "third") && !((params._legacyNumerus === "plural") && (params._legacyGender === "female")))
                    augmentedRoot.InsertLongVowel(2, (params._legacyVoice === "active") ? Letter.Alef : Letter.Ya);
                else
                    augmentedRoot.InsertShortVowel(2, (params._legacyVoice === "active") ? Tashkil.Fatha : Tashkil.Kasra);
            }
            else
            {
                let shortenVowel = (params._legacyNumerus === "plural") && (params._legacyGender === "female");

                if((params._legacyMood === "jussive") || (params._legacyMood === "imperative"))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else if(params._legacyVoice === "passive")
                    augmentedRoot.InsertLongVowel(2, (params._legacyVoice === "passive") ? Letter.Alef : Letter.Ya);
            }
        }
        break;
    }
};