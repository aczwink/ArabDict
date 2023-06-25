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

import { JSX_CreateElement } from "acfrontend";

export function RenderWithDiffHighlights(word: string, reference: string)
{
    const result: any[] = [];
    let red = false;
    let current = "";

    function FinishBlock()
    {
        if(red)
                result.push(<span className="text-danger">{current}</span>);
            else
                result.push(current);
    }

    function Add(c: string, r: boolean)
    {
        if(r !== red)
        {
            FinishBlock();
            current = "";
            red = r;
        }

        current += c;
    }

    while( (word.length > 0) || (reference.length > 0) )
    {
        if(word[0] === reference[0])
        {
            Add(word[0], false);
            word = word.substring(1);
            reference = reference.substring(1);
        }
        else if(word.length > reference.length)
        {
            Add(word[0], true);
            word = word.substring(1);
        }
        else
        {
            reference = reference.substring(1);
        }
    }

    FinishBlock();

    return result;
}