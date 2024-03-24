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

import { ConjugationParams, Letter, Stem1Context, Tashkil, Voice, Tense, Person, Numerus, Gender, Mood } from "../../../Definitions";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { DoesPresentSuffixStartWithWawOrYa } from "./suffix";

function AlterDefectiveEndingActivePerfect(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Fatha)
    {
        //past tense is for type 3 quite regular
        if( (params.person === Person.Third) && (params.numerus === Numerus.Plural) && (params.gender === Gender.Male) )
        {
            augmentedRoot.DropRadial(3);
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
        }
        else
        {
            const tashkil = (params.person === Person.Third) && (params.numerus !== Numerus.Plural) ? Tashkil.Fatha : Tashkil.Kasra;

            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: tashkil });
        }
    }
    else
    {
        let ending: ConjugationVocalized = { letter: Letter.AlefMaksura, tashkil: Tashkil.Fatha };
        if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            ending = { letter: Letter.Alef, tashkil: Tashkil.Fatha };

        if(params.person === Person.Third)
        {
            if(params.numerus === Numerus.Singular)
            {
                if(params.gender === Gender.Male)
                    augmentedRoot.ReplaceRadical(3, ending);
                else
                    augmentedRoot.AssimilateRadical(3);
            }
            else if(params.numerus === Numerus.Dual)
            {
                if(params.gender === Gender.Female)
                    augmentedRoot.AssimilateRadical(3);
            }
            else if(params.numerus === Numerus.Plural)
            {
                if(params.gender === Gender.Male)
                    augmentedRoot.DropRadial(3);
            }
        }
    }
}

function IsShorteningCase(numerus: Numerus, person: Person)
{
    return (numerus === Numerus.Singular) || ( (numerus === Numerus.Plural) && (person === Person.First) );
}

function IsDefectiveType3SpecialCase(numerus: Numerus, person: Person, stem1Context?: Stem1Context)
{
    //Pre-condition to this method: DoesPresentSuffixStartWithWawOrYa is false!

    const isType3 = stem1Context?.middleRadicalTashkilPresent === Tashkil.Fatha;
    return isType3 && IsShorteningCase(numerus, person);
}

function AlterDefectiveEndingActivePresentIndicative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        augmentedRoot.DropRadial(3);
        if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if(IsDefectiveType3SpecialCase(params.numerus, params.person, stem1ctx))
    {
        augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.Fatha });
    }
    else if( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female) )
    {
        if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
    else if( (stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra) && IsShorteningCase(params.numerus, params.person))
    {
        augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
}

function AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        augmentedRoot.DropRadial(3);
        if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Fatha)
        AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
    else if( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female) )
    {
        if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Kasra);
    }
}

function AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    if(
        DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender)
        ||
        IsDefectiveType3SpecialCase(params.numerus, params.person, stem1ctx)
    )
    {
        augmentedRoot.DropRadial(3);
        if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && IsShorteningCase(params.numerus, params.person))
    {
        augmentedRoot.DropRadial(3);
        if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
        else
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
    }
    else if( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female) )
    {
        if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Dhamma)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.Dhamma);
        else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Kasra)
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
            if(params.voice === Voice.Passive)
            {
                if(params.tense === Tense.Perfect)
                {
                    if((params.gender === Gender.Male) && (params.numerus === Numerus.Plural) && (params.person === Person.Third))
                        augmentedRoot.AssimilateRadical(3);
                    else if((params.gender === Gender.Female) && (params.numerus === Numerus.Plural) && (params.person === Person.Third))
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.Kasra});
                    else
                        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: (params.person === Person.Third) ? Tashkil.Fatha : Tashkil.Kasra});
                }
                else
                {
                    if(params.mood === Mood.Jussive)
                    {
                        if((params.numerus !== Numerus.Dual) && !( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female)))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else
                            augmentedRoot.r3.letter = Letter.Ya;
                    }
                    else
                    {
                        if((params.person === Person.Second) && (params.numerus === Numerus.Singular) && (params.gender === Gender.Female))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else if(params.numerus === Numerus.Dual)
                        {
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params.numerus === Numerus.Plural) && (params.gender === Gender.Female))
                        {
                            augmentedRoot.r3.letter = Letter.Ya;
                        }
                        else if((params.person !== Person.First) && (params.numerus === Numerus.Plural) && (params.gender === Gender.Male))
                        {
                            augmentedRoot.AssimilateRadical(3);
                            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Fatha);
                        }
                        else
                            augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.Fatha });
                    }
                }
                return;
            }

            if(params.tense === Tense.Perfect)
                AlterDefectiveEndingActivePerfect(augmentedRoot, params);
            else if(params.mood === Mood.Indicative)
                AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
            else if(params.mood === Mood.Subjunctive)
                AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot, params);
            else if( (params.mood === Mood.Jussive) || (params.mood === Mood.Imperative) )
                AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot, params);
        }
        break;
    }
}

export function AlterDefectiveSuffix(params: ConjugationParams, suffix: ConjugationVocalized[])
{
    if(params.voice === Voice.Active)
    {
        const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
        if( (params.tense === Tense.Perfect) && (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Plural) && (params.person === Person.Third) && (params.gender === Gender.Male))
            suffix[0].tashkil = Tashkil.Sukun;
        else if(params.tense === Tense.Present)
        {
            if( DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender) && (stem1ctx?.middleRadicalTashkilPresent === Tashkil.Fatha))
                suffix[0].tashkil = Tashkil.Sukun;
        }
    }
}