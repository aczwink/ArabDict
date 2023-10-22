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

import { WordType } from "../../dist/api";

export function WordMayHavePlural(wordType: WordType)
{
    switch(wordType)
    {
        case WordType.Adjective:
        case WordType.Noun:
            return true;
    }

    return false;
}

export function WordGenderToAbbreviation(wordType: WordType, isMale: boolean | null)
{
    if(!WordMayHavePlural(wordType))
        return "";

    if(isMale === true)
        return "m";
    else if(isMale === false)
        return "f";
    return "?";
}

export function WordTypeToAbbreviationText(wordType: WordType)
{
    switch(wordType)
    {
        case WordType.Noun:
            return "";
        case WordType.Preposition:
            return "(prep.)";
        case WordType.Adjective:
            return "(adj.)";
        case WordType.Conjunction:
            return "(conj.)";
        case WordType.ForeignVerb:
            return "(foreign verb)";
        case WordType.Adverb:
            return "(adv.)";
        case WordType.Pronoun:
            return "(pronoun)";
        case WordType.Phrase:
            return "(phrase)";
        case WordType.Particle:
            return "(particle)";
    }
}

export function WordTypeToText(wordType: WordType)
{
    switch(wordType)
    {
        case WordType.Noun:
            return "Noun";
        case WordType.Preposition:
            return "Preposition";
        case WordType.Adjective:
            return "Adjective";
        case WordType.Conjunction:
            return "Conjunction";
        case WordType.ForeignVerb:
            return "Foreign Verb";
        case WordType.Adverb:
            return "Adverb";
        case WordType.Pronoun:
            return "Pronoun";
        case WordType.Phrase:
            return "Phrase";
        case WordType.Particle:
            return "Particle";
    }
}