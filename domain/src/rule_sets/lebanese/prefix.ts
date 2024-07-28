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

import { ConjugationParams, Person, Numerus, Letter, Tashkil, Gender, Tense, Mood } from "../../Definitions";
import { ConjugationVocalized } from "../../Vocalization";

function SubjunctiveChar1Tashkil(params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        case 8:
            return Tashkil.Kasra;
        case 2:
            return Tashkil.Sukun;
    }
    throw new Error("TODO: implement me");
}

function DerivePrefixSubjunctive(params: ConjugationParams): ConjugationVocalized[]
{
    switch(params.person)
    {
        case Person.First:
            if(params.numerus === Numerus.Plural)
            {
                return [
                    {
                        letter: Letter.Nun,
                        tashkil: SubjunctiveChar1Tashkil(params)
                    }
                ];
            }

            if(params.stem === 2)
            {
                return [];
            }

            return [
                {
                    letter: Letter.Hamza,
                    tashkil: Tashkil.Kasra
                }
            ];

        case Person.Second:
            return [
                {
                    letter: Letter.Ta,
                    tashkil: SubjunctiveChar1Tashkil(params)
                },
            ];

        case Person.Third:
            if(params.gender === Gender.Male)
            {
                return [
                    {
                        letter: Letter.Ya,
                        tashkil: SubjunctiveChar1Tashkil(params)
                    },
                ];
            }
            return [
                {
                    letter: Letter.Ta,
                    tashkil: SubjunctiveChar1Tashkil(params)
                },
            ];
    }
}

function BiPrefixTashkil(params: ConjugationParams)
{
    switch(params.stem)
    {
        case 1:
        case 8:
            return Tashkil.Sukun;
        case 2:
            return Tashkil.Kasra;
    }
    throw new Error("TODO: implement me");
}

export function DerivePrefix(params: ConjugationParams): ConjugationVocalized[]
{
    if(params.tense === Tense.Perfect)
        return [];
    if(params.mood === Mood.Imperative)
        return [];

    if(params.mood === Mood.Indicative)
    {
        if(params.person === Person.First)
        {
            if(params.numerus === Numerus.Singular)
            {
                return [
                    {
                        letter: Letter.Ba,
                        tashkil: Tashkil.Kasra
                    }
                ];
            }

            return [
                {
                    letter: Letter.Mim,
                    tashkil: BiPrefixTashkil(params),
                },
                ...DerivePrefixSubjunctive(params),
            ];
        }

        const sub = DerivePrefixSubjunctive(params);        
        if((BiPrefixTashkil(params) === Tashkil.Kasra) && (sub[0].letter === Letter.Ya))
            sub[0].tashkil = Tashkil.LongVowelMarker;
        return [
            {
                letter: Letter.Ba,
                tashkil: BiPrefixTashkil(params)
            },
            ...sub,
        ];
    }

    return DerivePrefixSubjunctive(params);
}