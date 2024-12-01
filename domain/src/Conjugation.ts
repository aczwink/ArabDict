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

import { Gender, Letter, Mood, Numerus, Person, Tashkil, Tense } from "./Definitions";
import { ConjugationVocalized } from "./Vocalization";

export enum Vowel
{
    LongA,
    LongI,
    LongU,
    ShortA,
    ShortI,
    ShortU,
    Sukun
}

export interface ConjugationItem
{
    consonant: Letter;
    emphasis?: boolean;
    followingVowel: Vowel;
}

export interface ConjugationRule
{
    conditions: {
        gender?: Gender;
        hasPresentSuffix?: boolean;
        mood?: Mood;
        numerus?: Numerus;
        person?: Person;
        tense?: Tense;
    };
    emphasize?: number;
    symbols: Letter[];
    vowels: Vowel[];
}

export interface ConjugatedWord
{
    items: ConjugationItem[];
    final?: Letter;
}

//TODO: these are there for integration into current conjugtion pipeline. They should be removed as soon as code is migrated
export function _TODO_ToConjugationVocalized(word: ConjugatedWord)
{
    const result: ConjugationVocalized[] = [];
    for (const item of word.items)
    {
        switch(item.followingVowel)
        {
            case Vowel.LongA:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Fatha
                });
                result.push({
                    letter: Letter.Alef,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            case Vowel.LongI:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Kasra
                });
                result.push({
                    letter: Letter.Ya,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            case Vowel.LongU:
                result.push({
                    letter: item.consonant,
                    tashkil: Tashkil.Dhamma
                });
                result.push({
                    letter: Letter.Waw,
                    tashkil: Tashkil.LongVowelMarker,
                });
                break;

            default:
                result.push({
                    emphasis: item.emphasis,
                    letter: item.consonant,
                    tashkil: _TODO_VowelToTashkil(item.followingVowel),
                });
                break;
        }
    }

    if(word.final !== undefined)
    {
        result.push({
            letter: word.final,
            tashkil: Tashkil.EndOfWordMarker,
        });
    }

    return result;
}

export function _TODO_VowelToTashkil(vowel: Vowel)
{
    switch(vowel)
    {
        case Vowel.ShortA:
            return Tashkil.Fatha;
        case Vowel.ShortI:
            return Tashkil.Kasra;
        case Vowel.ShortU:
            return Tashkil.Dhamma;
        case Vowel.Sukun:
            return Tashkil.Sukun;
    }
    throw new Error("_TODO_VowelToTashkil: " + vowel);
}