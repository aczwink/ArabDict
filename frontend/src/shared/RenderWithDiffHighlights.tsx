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

import { JSX_CreateElement } from "acfrontend";
import { SHADDA } from "arabdict-domain/src/Definitions";
import { ParseVocalizedText, VocalizedToString } from "arabdict-domain/src/Vocalization";

export function RenderWithDiffHighlights(word: string, reference: string)
{
    const result: any[] = [];
    let red = false;
    let current = "";

    function FinishBlock()
    {
        if(current.length == 0)
            return;

        if(red)
            result.push(<span className="text-danger">{current}</span>);
        else
            result.push(current);

        current = "";
    }

    function Add(c: string, r: boolean)
    {
        if(r !== red)
        {
            FinishBlock();
            red = r;
        }

        current += c;
    }

    const parsedWord = ParseVocalizedText(word);
    const parsedRef = ParseVocalizedText(reference);

    const missingAtBeginning = (parsedWord[0].letter !== parsedRef[0].letter) && (parsedRef.length > parsedWord.length);

    while( parsedWord.length > 0 )
    {
        if(parsedWord[0].letter === parsedRef[0]?.letter)
        {
            Add(parsedWord[0].letter, false);
            if(parsedWord[0].shadda)
                Add(SHADDA, !parsedRef[0].shadda);
            if(parsedWord[0].tashkil !== undefined)
                Add(parsedWord[0].tashkil, parsedWord[0].tashkil !== parsedRef[0].tashkil);

            parsedWord.Remove(0);
            parsedRef.Remove(0);
        }
        else if(parsedWord.length > parsedRef.length)
        {
            Add(VocalizedToString(parsedWord[0]), true);
            parsedWord.Remove(0);
        }
        else
        {
            parsedRef.Remove(0);
        }
    }

    if(parsedRef.length > 0)
    {
        FinishBlock();
        result.unshift(<span className="text-danger">{"\u2610"}</span>);
    }

    FinishBlock();

    if(missingAtBeginning)
        result.push(<span className="text-danger">{"\u2610"}</span>);

    return result;
}