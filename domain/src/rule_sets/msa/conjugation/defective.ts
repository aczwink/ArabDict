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

import { ConjugationParams, Letter, Numerus, _LegacyPerson, Stem1Context, Tashkil } from "../../../Definitions";
import { FullyVocalized, _LegacyPartiallyVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { DoesPresentSuffixStartWithWawOrYa } from "./suffix";

function AlterDefectiveEndingActivePerfect(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Fatha)
    {
        //past tense is for type 3 quite regular
        if( (params._legacyPerson === "third") && (params._legacyNumerus === "plural") && (params._legacyGender === "male") )
        {
            augmentedRoot.DropRadial(3);
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
        }
        else
        {
            const tashkil = (params._legacyPerson === "third") && (params._legacyNumerus !== "plural") ? Tashkil.Fatha : Tashkil.Kasra;

            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: tashkil });
        }
    }
    else
    {
        let ending: FullyVocalized = { letter: Letter.AlefMaksura, shadda: false, tashkil: Tashkil.Fatha };
        if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            ending = { letter: Letter.Alef, shadda: false, tashkil: Tashkil.Fatha };

        if(params._legacyPerson === "third")
        {
            if(params._legacyNumerus === "singular")
            {
                if(params._legacyGender === "male")
                    augmentedRoot.ReplaceRadical(3, ending);
                else
                    augmentedRoot.AssimilateRadical(3);
            }
            else if(params._legacyNumerus === "dual")
            {
                if(params._legacyGender === "female")
                    augmentedRoot.AssimilateRadical(3);
            }
            else if(params._legacyNumerus === "plural")
            {
                if(params._legacyGender === "male")
                    augmentedRoot.DropRadial(3);
            }
        }
    }
}

function IsShorteningCase(numerus: Numerus, person: _LegacyPerson)
{
    return (numerus === "singular") || ( (numerus === "plural") && (person === "first") );
}

function IsDefectiveType3SpecialCase(numerus: Numerus, person: _LegacyPerson, stem1Context?: Stem1Context)
{
    //Pre-condition to this method: DoesPresentSuffixStartWithWawOrYa is false!

    const isType3 = stem1Context?.middleRadicalTashkilPresent === Tashkil.Fatha;
    return isType3 && IsShorteningCase(numerus, person);
}

function AlterDefectiveEndingActivePresentIndicative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(DoesPresentSuffixStartWithWawOrYa(params._legacyPerson, params._legacyNumerus, params._legacyGender))
    {
        augmentedRoot.DropRadial(3);
        if( (params._legacyStem1Context?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params._legacyNumerus === "singular"))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if(IsDefectiveType3SpecialCase(params._legacyNumerus, params._legacyPerson, params._legacyStem1Context))
    {
        augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, shadda: false, tashkil: Tashkil.Fatha });
    }
    else if( (params._legacyNumerus === "plural") && (params._legacyGender === "female") )
    {
        if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
    else if( (params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra) && IsShorteningCase(params._legacyNumerus, params._legacyPerson))
    {
        augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
}

function AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(DoesPresentSuffixStartWithWawOrYa(params._legacyPerson, params._legacyNumerus, params._legacyGender))
    {
        augmentedRoot.DropRadial(3);
        if( (params._legacyStem1Context?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params._legacyNumerus === "singular"))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Fatha)
        AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
    else if( (params._legacyNumerus === "plural") && (params._legacyGender === "female") )
    {
        if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
}

function AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(
        DoesPresentSuffixStartWithWawOrYa(params._legacyPerson, params._legacyNumerus, params._legacyGender)
        ||
        IsDefectiveType3SpecialCase(params._legacyNumerus, params._legacyPerson, params._legacyStem1Context)
    )
    {
        augmentedRoot.DropRadial(3);
        if( (params._legacyStem1Context?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params._legacyNumerus === "singular"))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if( (params._legacyStem1Context?.middleRadicalTashkilPresent !== Tashkil.Fatha) && IsShorteningCase(params._legacyNumerus, params._legacyPerson))
    {
        augmentedRoot.DropRadial(3);
        if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
        else
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
    }
    else if( (params._legacyNumerus === "plural") && (params._legacyGender === "female") )
    {
        if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
}

export function AlterDefectiveEnding(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        case 2:
        case 10:
        {
            if(params._legacyVoice === "passive")
            {
                if(params._legacyTense === "perfect")
                {
                    if((params._legacyGender === "male") && (params._legacyNumerus === "plural") && (params._legacyPerson === "third"))
                        augmentedRoot.AssimilateRadical(3);
                    else if((params._legacyGender === "female") && (params._legacyNumerus === "plural") && (params._legacyPerson === "third"))
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: Tashkil.Kasra});
                    else
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: (params._legacyPerson === "third") ? Tashkil.Fatha : Tashkil.Kasra});
                }
                else
                {
                    if(params._legacyMood === "jussive")
                    {
                        if((params._legacyNumerus !== "dual") && !( (params._legacyNumerus === "plural") && (params._legacyGender === "female")))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else
                            augmentedRoot.r3.letter = Letter.Ya;
                    }
                    else
                    {
                        if((params._legacyPerson === "second") && (params._legacyNumerus === "singular") && (params._legacyGender === "female"))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else if(params._legacyNumerus === "dual")
                        {
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params._legacyNumerus === "plural") && (params._legacyGender === "female"))
                        {
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params._legacyPerson !== "first") && (params._legacyNumerus === "plural") && (params._legacyGender === "male"))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else
                            augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, shadda: false, tashkil: Tashkil.Fatha });
                    }
                }
                return;
            }

            if(params._legacyTense === "perfect")
                AlterDefectiveEndingActivePerfect(augmentedRoot, params);
            else if(params._legacyMood === "indicative")
                AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
            else if(params._legacyMood === "subjunctive")
                AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot, params);
            else if( (params._legacyMood === "jussive") || (params._legacyMood === "imperative") )
                AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot, params);
        }
        break;
    }
}

export function AlterDefectiveSuffix(params: ConjugationParams, suffix: (FullyVocalized | _LegacyPartiallyVocalized)[])
{
    if(params._legacyVoice === "active")
    {
        if( (params._legacyTense === "perfect") && (params._legacyStem1Context?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params._legacyNumerus === "plural") && (params._legacyPerson === "third") && (params._legacyGender === "male"))
            suffix[0].tashkil = Tashkil.Sukun;
        else if(params._legacyTense === "present")
        {
            if( DoesPresentSuffixStartWithWawOrYa(params._legacyPerson, params._legacyNumerus, params._legacyGender) && (params._legacyStem1Context?.middleRadicalTashkilPresent === Tashkil.Fatha))
                suffix[0].tashkil = Tashkil.Sukun;
        }
    }
}