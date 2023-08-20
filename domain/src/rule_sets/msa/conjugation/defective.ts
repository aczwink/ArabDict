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

import { ALEF, ALEF_MAKSURA, DHAMMA, FATHA, KASRA, WAW, YA } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { AugmentedRoot } from "../AugmentedRoot";

export function AlterDefectiveEnding(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    let ending = ALEF_MAKSURA;
    const vowelTashkil = (augmentedRoot.root.r3 === WAW) ? DHAMMA : KASRA;

    switch(params.stem)
    {
        case 1:
            if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
                ending = ALEF;
        case 10:
        {
            if(params.voice === "passive")
            {
                if(params.tense === "perfect")
                {
                    if((params.gender === "male") && (params.numerus === "plural") && (params.person === "third"))
                        augmentedRoot.AssimilateRadical(3);
                    else if((params.gender === "female") && (params.numerus === "plural") && (params.person === "third"))
                        augmentedRoot.ReplaceRadical(3, { letter: YA, shadda: false, tashkil: KASRA});
                    else
                        augmentedRoot.ReplaceRadical(3, { letter: YA, shadda: false, tashkil: (params.person === "third") ? FATHA : KASRA});
                }
                else
                {
                    if(params.mood === "jussive")
                    {
                        if((params.numerus !== "dual") && !( (params.numerus === "plural") && (params.gender === "female")))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyTashkil(2, FATHA);
                        }
                        else
                            augmentedRoot.r3.letter = YA;
                    }
                    else
                    {
                        if((params.person === "second") && (params.numerus === "singular") && (params.gender === "female"))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyTashkil(2, FATHA);
                        }
                        else if(params.numerus === "dual")
                        {
                            augmentedRoot.r3.letter = YA;
                        }
                        else if((params.numerus === "plural") && (params.gender === "female"))
                        {
                            augmentedRoot.r3.letter = YA;
                        }
                        else if((params.person !== "first") && (params.numerus === "plural") && (params.gender === "male"))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyTashkil(2, FATHA);
                        }
                        else
                            augmentedRoot.ReplaceRadical(3, { letter: ALEF_MAKSURA, shadda: false });
                    }
                }
                return;
            }

            if(params.tense === "perfect")
            {
                if(params.person === "third")
                {
                    if(params.numerus === "singular")
                    {
                        if(params.gender === "male")
                            augmentedRoot.ReplaceRadical(3, { letter: ending, shadda: false });
                        else
                            augmentedRoot.AssimilateRadical(3);
                    }
                    else if(params.numerus === "dual")
                    {
                        if(params.gender === "female")
                            augmentedRoot.AssimilateRadical(3);
                    }
                    else if(params.numerus === "plural")
                    {
                        if(params.gender === "male")
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyTashkil(2, FATHA);
                        }
                    }
                }
            }
            else if(params.mood === "indicative")
            {
                if((params.person === "second") && (params.numerus === "singular") && (params.gender === "female"))
                    augmentedRoot.AssimilateRadical(3);
                else if(params.numerus === "dual")
                {
                }
                else if((params.person !== "first") && (params.numerus === "plural") && (params.gender === "male"))
                {
                    augmentedRoot.AssimilateRadical(3);
                }
                else
                    augmentedRoot.ApplyTashkil(3, undefined);
            }
            else if(params.mood === "subjunctive")
            {
                if((params.person === "second") && (params.numerus === "singular") && (params.gender === "female"))
                    augmentedRoot.AssimilateRadical(3);
                else if((params.person !== "first") && (params.numerus === "plural") && (params.gender === "male"))
                {
                    augmentedRoot.AssimilateRadical(3);
                }
            }
            else if( (params.mood === "jussive") || (params.mood === "imperative") )
            {
                if(params.numerus === "singular")
                {
                    augmentedRoot.AssimilateRadical(3);
                    if((params.person === "second") && (params.gender === "female"))
                        augmentedRoot.ApplyTashkil(2, KASRA);
                    else
                        augmentedRoot.ApplyTashkil(2, vowelTashkil);
                }
                else if(params.numerus === "plural")
                {
                    if(params.person === "first")
                    {
                        augmentedRoot.AssimilateRadical(3);
                        augmentedRoot.ApplyTashkil(2, vowelTashkil);
                    }
                    else if(params.gender === "male")
                        augmentedRoot.AssimilateRadical(3);
                }
            }
        }
        break;
    }
};