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

import { ConjugationParams, Letter, Tashkil, Voice, Tense, Person, Numerus, Gender, Mood } from "../../../Definitions";
import { ConjugationVocalized } from "../../../Vocalization";
import { AugmentedRoot } from "../AugmentedRoot";
import { DoesPresentSuffixStartWithWawOrYa } from "./suffix";

enum DefectiveType
{
    //فَعَى / يَفْعِي
    Type1_Fa3aY,
    //فَعَا / يَفْعُو
    Type2_Fa3aA,
    //فَعِيَ / يَفْعَى
    Type3_Fa3iya
}

function GetDefectiveType(params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
            break;
        case 2:
        case 4:
        case 10:
            return DefectiveType.Type1_Fa3aY;
        default:
            throw new Error("TODO: DON'T KNOW WRITE TEST!");
    }

    switch(params.stem1Context.middleRadicalTashkilPresent)
    {
        case Tashkil.Dhamma:
            return DefectiveType.Type2_Fa3aA;
        case Tashkil.Kasra:
            return DefectiveType.Type1_Fa3aY;
        case Tashkil.Fatha:
            return DefectiveType.Type3_Fa3iya;
    }
    throw new Error("TODO: NOT IMPLEMENTED");
}

function AlterDefectiveEndingActivePerfect(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(GetDefectiveType(params) === DefectiveType.Type3_Fa3iya)
    {
        //past tense is for type 3 quite regular
        if( (params.person === Person.Third) && (params.numerus === Numerus.Plural) && (params.gender === Gender.Male) )
        {
            augmentedRoot.DropRadial(3);
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
        }
        else
        {
            const tashkil = (params.person === Person.Third) && (params.numerus !== Numerus.Plural) ? Tashkil.Fatha : Tashkil.LongVowelMarker;

            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: tashkil });
        }
    }
    else
    {
        //type 1 and 2
        let ending: ConjugationVocalized = { letter: Letter.AlefMaksura, tashkil: Tashkil.AlefMaksuraMarker };
        if(GetDefectiveType(params) === DefectiveType.Type2_Fa3aA)
            ending = { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker };

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

function IsDefectiveType3SpecialCase(params: ConjugationParams)
{
    //Pre-condition to this method: DoesPresentSuffixStartWithWawOrYa is false!

    const isType3 = GetDefectiveType(params) === DefectiveType.Type3_Fa3iya;
    return isType3 && IsShorteningCase(params.numerus, params.person);
}

function AlterDefectiveEndingActivePresentIndicative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const type = GetDefectiveType(params);

    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        //all
        augmentedRoot.DropRadial(3);
        if( (type !== DefectiveType.Type3_Fa3iya) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra); //1 and 2
        else if(type === DefectiveType.Type1_Fa3aY)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma); //1
    }
    else if(IsDefectiveType3SpecialCase(params))
    {
        //3
        augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.AlefMaksuraMarker });
    }
    else if( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female) )
    {
        if(type === DefectiveType.Type2_Fa3aA)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.LongVowelMarker); //2
        else if(type === DefectiveType.Type1_Fa3aY)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.AlefMaksuraMarker); //1
        else if(type === DefectiveType.Type3_Fa3iya)
        {
            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.Sukun });
        }
    }
    else if( (type === DefectiveType.Type1_Fa3aY) && IsShorteningCase(params.numerus, params.person))
    {
        augmentedRoot.ApplyRadicalTashkil(3, Tashkil.AlefMaksuraMarker); //1
    }
    else if( (type === DefectiveType.Type2_Fa3aA) && (params.numerus !== Numerus.Dual) )
    {
        augmentedRoot.ApplyRadicalTashkil(3, Tashkil.LongVowelMarker); //2
    }
    else if( (type === DefectiveType.Type3_Fa3iya) && (params.numerus === Numerus.Dual))
    {
        //3
        //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.Fatha });
    }
}

function AlterDefectiveEndingActivePresentSubjunctive(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    const type = GetDefectiveType(params);

    if(DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
    {
        augmentedRoot.DropRadial(3);
        if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(type === DefectiveType.Type1_Fa3aY)
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Dhamma);
    }
    else if(stem1ctx?.middleRadicalTashkilPresent === Tashkil.Fatha)
        AlterDefectiveEndingActivePresentIndicative(augmentedRoot, params);
    else if( (params.numerus === Numerus.Plural) && (params.gender === Gender.Female) )
    {
        if(type === DefectiveType.Type2_Fa3aA)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.LongVowelMarker);
        else if(type === DefectiveType.Type1_Fa3aY)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.AlefMaksuraMarker);
    }
}

function AlterDefectiveEndingActivePresentJussiveOrImperative(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    const stem1ctx = (params.stem === 1) ? params.stem1Context : undefined;
    const type = GetDefectiveType(params);

    if(
        DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender)
        ||
        IsDefectiveType3SpecialCase(params)
    )
    {
        augmentedRoot.DropRadial(3);
        if( (stem1ctx?.middleRadicalTashkilPresent !== Tashkil.Fatha) && (params.numerus === Numerus.Singular))
            augmentedRoot.ApplyRadicalTashkil(2, Tashkil.Kasra);
        else if(type === DefectiveType.Type1_Fa3aY)
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
        if(type === DefectiveType.Type2_Fa3aA)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.LongVowelMarker);
        else if(type === DefectiveType.Type1_Fa3aY)
            augmentedRoot.ApplyRadicalTashkil(3, Tashkil.AlefMaksuraMarker);
        else if(type === DefectiveType.Type3_Fa3iya)
        {
            //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.Sukun });
        }
    }
    else if( (type === DefectiveType.Type3_Fa3iya) && (params.numerus === Numerus.Dual))
    {
        //3
        //replacing is important because roots with waw as 3rd radical are still conjugated with ya in this case
        augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.Fatha });
    }
}

function AlterDefectiveEndingPassive(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    if(params.tense === Tense.Perfect)
    {
        if((params.gender === Gender.Male) && (params.numerus === Numerus.Plural) && (params.person === Person.Third))
            augmentedRoot.AssimilateRadical(3);
        else if((params.gender === Gender.Female) && (params.numerus === Numerus.Plural) && (params.person === Person.Third))
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: Tashkil.LongVowelMarker});
        else
            augmentedRoot.ReplaceRadical(3, { letter: Letter.Ya, tashkil: (params.person === Person.Third) ? Tashkil.Fatha : Tashkil.LongVowelMarker});
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
                augmentedRoot.DropRadial(3);
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
                augmentedRoot.ReplaceRadical(3, { letter: Letter.AlefMaksura, tashkil: Tashkil.AlefMaksuraMarker });
        }
    }
}

export function AlterDefectiveEnding(augmentedRoot: AugmentedRoot, params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        case 2:
        case 4:
        case 10:
        {
            if(params.voice === Voice.Passive)
                AlterDefectiveEndingPassive(augmentedRoot, params);
            else if(params.tense === Tense.Perfect)
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
    else if(params.voice === Voice.Passive)
    {
        if((params.tense === Tense.Present) && DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
            suffix[0].tashkil = Tashkil.Sukun;
    }
}