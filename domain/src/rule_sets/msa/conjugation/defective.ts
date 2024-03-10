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

import { ALEF, ALEF_MAKSURA, DHAMMA, FATHA, KASRA, Letter, SUKUN, Tashkil } from "../../../Definitions";
import { ConjugationParams } from "../../../DialectConjugator";
import { FullyVocalized, _LegacyPartiallyVocalized, _LegacyVerbVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { Stem1Context } from "../_legacy/CreateVerb";
import { Numerus, Person } from "../_legacy/VerbStem";
import { DoesPresentSuffixStartWithWawOrYa } from "./suffix";

function AlterDefectiveEndingActivePerfect(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.stem1Context?.middleRadicalTashkilPresent === FATHA)
    {
        //past tense is for type 3 quite regular
        if( (params.person === "third") && (params.numerus === "plural") && (params.gender === "male") )
        {
            augmentedRoot.DropRadial(3);
            augmentedRoot.ApplyTashkil(2, DHAMMA);
        }
        else
        {
            const tashkil = (params.person === "third") && (params.numerus !== "plural") ? FATHA : KASRA;

            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: tashkil });
        }
    }
    else
    {
        let ending: _LegacyVerbVocalized = { letter: ALEF_MAKSURA, shadda: false, tashkil: FATHA };
        if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
            ending = { letter: ALEF, shadda: false, tashkil: FATHA };

        if(params.person === "third")
        {
            if(params.numerus === "singular")
            {
                if(params.gender === "male")
                    augmentedRoot.ReplaceRadical(3, ending);
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
                    augmentedRoot.DropRadial(3);
            }
        }
    }
}

function IsShorteningCase(numerus: Numerus, person: Person)
{
    return (numerus === "singular") || ( (numerus === "plural") && (person === "first") );
}

function IsDefectiveType3SpecialCase(numerus: Numerus, person: Person, stem1Context?: Stem1Context)
{
    //Pre-condition to this method: DoesPresentSuffixStartWithWawOrYa is false!

    const isType3 = stem1Context?.middleRadicalTashkilPresent === FATHA;
    return isType3 && IsShorteningCase(numerus, person);
}

function AlterDefectiveEndingActivePresentIndicative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        augmentedRoot.DropRadial(3);
        if( (params.stem1Context?.middleRadicalTashkilPresent !== FATHA) && (params.numerus === "singular"))
            augmentedRoot.ApplyTashkil(2, KASRA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(2, DHAMMA);
    }
    else if(IsDefectiveType3SpecialCase(params.numerus, params.person, params.stem1Context))
    {
        augmentedRoot.ReplaceRadical(3, { letter: ALEF_MAKSURA, shadda: false, tashkil: FATHA });
    }
    else if( (params.numerus === "plural") && (params.gender === "female") )
    {
        if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
            augmentedRoot.ApplyTashkil(3, DHAMMA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(3, KASRA);
    }
    else if( (params.stem1Context?.middleRadicalTashkilPresent === KASRA) && IsShorteningCase(params.numerus, params.person))
    {
        augmentedRoot.ApplyTashkil(3, KASRA);
    }
}

function AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        augmentedRoot.DropRadial(3);
        if( (params.stem1Context?.middleRadicalTashkilPresent !== FATHA) && (params.numerus === "singular"))
            augmentedRoot.ApplyTashkil(2, KASRA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(2, DHAMMA);
    }
    else if(params.stem1Context?.middleRadicalTashkilPresent === FATHA)
        AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
    else if( (params.numerus === "plural") && (params.gender === "female") )
    {
        if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
            augmentedRoot.ApplyTashkil(3, DHAMMA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(3, KASRA);
    }
}

function AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(
        DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender)
        ||
        IsDefectiveType3SpecialCase(params.numerus, params.person, params.stem1Context)
    )
    {
        augmentedRoot.DropRadial(3);
        if( (params.stem1Context?.middleRadicalTashkilPresent !== FATHA) && (params.numerus === "singular"))
            augmentedRoot.ApplyTashkil(2, KASRA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(2, DHAMMA);
    }
    else if( (params.stem1Context?.middleRadicalTashkilPresent !== FATHA) && IsShorteningCase(params.numerus, params.person))
    {
        augmentedRoot.DropRadial(3);
        if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
            augmentedRoot.ApplyTashkil(2, DHAMMA);
        else
            augmentedRoot.ApplyTashkil(2, KASRA);
    }
    else if( (params.numerus === "plural") && (params.gender === "female") )
    {
        if(params.stem1Context?.middleRadicalTashkilPresent === DHAMMA)
            augmentedRoot.ApplyTashkil(3, DHAMMA);
        else if(params.stem1Context?.middleRadicalTashkilPresent === KASRA)
            augmentedRoot.ApplyTashkil(3, KASRA);
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
            if(params.voice === "passive")
            {
                if(params.tense === "perfect")
                {
                    if((params.gender === "male") && (params.numerus === "plural") && (params.person === "third"))
                        augmentedRoot.AssimilateRadical(3);
                    else if((params.gender === "female") && (params.numerus === "plural") && (params.person === "third"))
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: KASRA});
                    else
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, shadda: false, tashkil: (params.person === "third") ? FATHA : KASRA});
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
                            augmentedRoot.r3.letter = Letter.Ya;
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
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params.numerus === "plural") && (params.gender === "female"))
                        {
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params.person !== "first") && (params.numerus === "plural") && (params.gender === "male"))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyTashkil(2, FATHA);
                        }
                        else
                            augmentedRoot.ReplaceRadical(3, { letter: ALEF_MAKSURA, shadda: false, tashkil: FATHA });
                    }
                }
                return;
            }

            if(params.tense === "perfect")
                AlterDefectiveEndingActivePerfect(augmentedRoot, params);
            else if(params.mood === "indicative")
                AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
            else if(params.mood === "subjunctive")
                AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot, params);
            else if( (params.mood === "jussive") || (params.mood === "imperative") )
                AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot, params);
        }
        break;
    }
}

export function AlterDefectiveSuffix(params: ConjugationParams, suffix: (FullyVocalized | _LegacyPartiallyVocalized)[])
{
    if(params.voice === "active")
    {
        if( (params.tense === "perfect") && (params.stem1Context?.middleRadicalTashkilPresent !== FATHA) && (params.numerus === "plural") && (params.person === "third") && (params.gender === "male"))
            suffix[0].tashkil = Tashkil.Sukun;
        else if(params.tense === "present")
        {
            if( DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender) && (params.stem1Context?.middleRadicalTashkilPresent === FATHA))
                suffix[0].tashkil = Tashkil.Sukun;
        }
    }
}