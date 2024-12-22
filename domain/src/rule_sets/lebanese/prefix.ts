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

import { ConjugationItem, Vowel, _TODO_VowelToTashkil } from "../../Conjugation";
import { ConjugationParams, Person, Numerus, Letter, Gender, Tense, Mood } from "../../Definitions";

function DerivePrefixSubjunctive(prefixEndingVowel: Vowel, followingVowel: Vowel, params: ConjugationParams): ConjugationItem[]
{
    if(params.person === Person.First)
    {
        if(params.numerus === Numerus.Plural)
        {
            return [
                {
                    consonant: Letter.Nun,
                    followingVowel: prefixEndingVowel
                },
            ];
        }

        if(followingVowel === Vowel.Sukun)
        {
            return [
                {
                    consonant: Letter.Hamza,
                    followingVowel: prefixEndingVowel
                }
            ];
        }
        return [];
    }

    if((params.person === Person.Third) && (params.gender === Gender.Male))
    {
        return [
            {
                consonant: Letter.Ya,
                followingVowel: prefixEndingVowel
            },
        ];
    }

    return [
        {
            consonant: Letter.Ta,
            followingVowel: prefixEndingVowel
        },
    ];
}

function BiPrefixTashkil(prefixEndingVowel: Vowel)
{
    if(prefixEndingVowel === Vowel.Sukun)
        return Vowel.ShortI;
    return Vowel.Sukun;
}

export function DerivePrefix(prefixEndingVowel: Vowel | undefined, followingVowel: Vowel, params: ConjugationParams): ConjugationItem[]
{
    if(params.tense === Tense.Perfect)
        return [];
    if(params.mood === Mood.Imperative)
        return [];
    if(prefixEndingVowel === undefined)
        throw new Error("Missing ending vowel of prefix");

    if(params.mood === Mood.Indicative)
    {
        if(params.person === Person.First)
        {
            if(params.numerus === Numerus.Singular)
            {
                return [
                    {
                        consonant: Letter.Ba,
                        followingVowel: prefixEndingVowel
                    }
                ];
            }

            return [
                {
                    consonant: Letter.Mim,
                    followingVowel: BiPrefixTashkil(prefixEndingVowel),
                },
                ...DerivePrefixSubjunctive(prefixEndingVowel, followingVowel, params),
            ];
        }

        if((params.person === Person.Third) && (params.gender === Gender.Male) && (BiPrefixTashkil(prefixEndingVowel) === Vowel.ShortI))
        {
            return [
                {
                    consonant: Letter.Ba,
                    followingVowel: Vowel.LongI
                },
            ];
        }
        
        return [
            {
                consonant: Letter.Ba,
                followingVowel: BiPrefixTashkil(prefixEndingVowel)
            },
            ...DerivePrefixSubjunctive(prefixEndingVowel, followingVowel, params)
        ];
    }

    return DerivePrefixSubjunctive(prefixEndingVowel, followingVowel, params);
}