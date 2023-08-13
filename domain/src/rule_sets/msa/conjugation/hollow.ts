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

import { ALEF, DHAMMA, FATHA, KASRA, WAW, YA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { AugmentedRoot } from "../AugmentedRoot";

function DoesPresentSuffixStartWithVowel(params: ConjugationParams)
{
    if( (params.numerus === "singular") && (params.person === "second") && (params.gender === "female") )
        return true;
    if(params.numerus === "dual")
        return true;
    if( (params.numerus === "plural") && (params.person !== "first") && (params.gender === "male") )
        return true;
    return false;
}

export function ShortenOrAlefizeR2(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        {
            const vowelTashkil = (augmentedRoot.root.r2 === WAW) ? DHAMMA : KASRA;

            if(params.tense === "perfect")
            {
                if((params.person === "third") && !((params.numerus === "plural") && (params.gender === "female")))
                {
                    if(params.voice === "active")
                        augmentedRoot.ReplaceRadical(2, { letter: ALEF, shadda: false });
                    else
                    {
                        augmentedRoot.ReplaceRadical(2, { letter: YA, shadda: false });
                        augmentedRoot.ApplyTashkil(1, KASRA);
                    }
                }
                else
                {
                    //shorten vowel
                    augmentedRoot.ApplyTashkil(2, (params.voice === "active") ? vowelTashkil : KASRA);
                    augmentedRoot.AssimilateRadical(2);
                }
            }
            else
            {
                let shortenVowel = (params.numerus === "plural") && (params.gender === "female");

                if((params.mood === "jussive") || (params.mood === "imperative"))
                {
                    shortenVowel = !DoesPresentSuffixStartWithVowel(params);
                }

                if(shortenVowel)
                    augmentedRoot.AssimilateRadical(2);
                else if(params.voice === "passive")
                    augmentedRoot.ReplaceRadical(2, { letter: ALEF, shadda: false });

                augmentedRoot.ApplyTashkil(1, (params.voice === "active") ? vowelTashkil : FATHA);
            }
        }
        break;
    }
};