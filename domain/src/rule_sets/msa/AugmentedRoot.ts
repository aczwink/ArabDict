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

import { BASE_TASHKIL } from "../../Definitions";
import { VerbRoot } from "../../VerbRoot";
import { Vocalized } from "../../Vocalization";

export class AugmentedRoot
{
    constructor(private _vocalized: Vocalized[], private root: VerbRoot)
    {
    }

    //Properties
    public get r1()
    {
        return this.GetRadical(1)!;
    }

    public get r2()
    {
        return this.GetRadical(2)!;
    }

    public get r3()
    {
        return this.GetRadical(3)!;
    }

    public get vocalized()
    {
        return this._vocalized;
    }

    //Public methods
    public ApplyRootLetters()
    {
        for (const v of this._vocalized)
        {
            if(v.letter.startsWith("r"))
            {
                const n = parseInt(v.letter.substring(1));
                v.letter = this.root.radicalsAsSeparateLetters[n-1];
            }
        }
    }

    public ApplyTashkil(radical: number, taskil: BASE_TASHKIL)
    {
        const v = this.GetRadical(radical);
        v!.tashkil = taskil;
    }

    //Private methods
    private GetRadical(n: number)
    {
        return this._vocalized.find( x => x.letter === ("r" + n));
    }
}