/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { OpenArabDictNonVerbDerivationType, OpenArabDictWordRelationshipType, OpenArabDictWordType, WordFunctionData } from "../../dist/api";

export const allWordTypes = [
    OpenArabDictWordType.Adjective,
    OpenArabDictWordType.Conjunction,
    OpenArabDictWordType.ForeignVerb,
    OpenArabDictWordType.Interjection,
    OpenArabDictWordType.Noun,
    OpenArabDictWordType.Preposition,
    OpenArabDictWordType.Adverb,
    OpenArabDictWordType.Pronoun,
    OpenArabDictWordType.Phrase,
    OpenArabDictWordType.Particle,
];

export function WordDerivationTypeFromWordToString(type: OpenArabDictNonVerbDerivationType)
{
    switch(type)
    {
        case OpenArabDictNonVerbDerivationType.Feminine:
            return "feminine version";
        case OpenArabDictNonVerbDerivationType.Plural:
            return "plural";
        case OpenArabDictNonVerbDerivationType.Nisba:
            return "relative adjective (nisbah اَلنِّسْبَة)";
        case OpenArabDictNonVerbDerivationType.Colloquial:
            return "colloquial version";
        case OpenArabDictNonVerbDerivationType.Extension:
            return "extension";
        case OpenArabDictNonVerbDerivationType.ElativeDegree:
            return "elative degree";
        case OpenArabDictNonVerbDerivationType.Singulative:
            return "singulative";
    }
}

export function WordGenderToAbbreviation(isMale: boolean | null)
{
    if(isMale === true)
        return "m";
    else if(isMale === false)
        return "f";
    return "?";
}

function WordTypeMayHaveGender(wordType: OpenArabDictWordType)
{
    switch(wordType)
    {
        case OpenArabDictWordType.Adjective:
        case OpenArabDictWordType.Noun:
        case OpenArabDictWordType.Pronoun:
            return true;
    }

    return false;
}

export function WordMayHaveGender(word: { functions: WordFunctionData[] })
{
    return word.functions.Values().Map(x => WordTypeMayHaveGender(x.type)).AnyTrue();
}

export function WordRelationshipTypeToString(type: OpenArabDictWordRelationshipType)
{
    switch(type)
    {
        case OpenArabDictWordRelationshipType.Synonym:
            return "synonym";
    }
}

export function WordTypeToAbbreviationText(wordType: OpenArabDictWordType)
{
    switch(wordType)
    {
        case OpenArabDictWordType.Noun:
            return "";
        case OpenArabDictWordType.Preposition:
            return "(prep.)";
        case OpenArabDictWordType.Adjective:
            return "(adj.)";
        case OpenArabDictWordType.Conjunction:
            return "(conj.)";
        case OpenArabDictWordType.ForeignVerb:
            return "(foreign verb)";
        case OpenArabDictWordType.Adverb:
            return "(adv.)";
        case OpenArabDictWordType.Pronoun:
            return "(pronoun)";
        case OpenArabDictWordType.Phrase:
            return "(phrase)";
        case OpenArabDictWordType.Particle:
            return "(particle)";
        case OpenArabDictWordType.Interjection:
            return "(interj.)";
    }
}

export function WordTypeToText(wordType: OpenArabDictWordType)
{
    switch(wordType)
    {
        case OpenArabDictWordType.Noun:
            return "Noun";
        case OpenArabDictWordType.Preposition:
            return "Preposition";
        case OpenArabDictWordType.Adjective:
            return "Adjective";
        case OpenArabDictWordType.Conjunction:
            return "Conjunction";
        case OpenArabDictWordType.ForeignVerb:
            return "Foreign Verb";
        case OpenArabDictWordType.Adverb:
            return "Adverb";
        case OpenArabDictWordType.Pronoun:
            return "Pronoun";
        case OpenArabDictWordType.Phrase:
            return "Phrase";
        case OpenArabDictWordType.Particle:
            return "Particle";
        case OpenArabDictWordType.Interjection:
            return "Interjection";
        case OpenArabDictWordType.Verb:
            return "Verb";
    }
}