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

import { ALEF, BASE_TASHKIL, FATHA, KASRA, LONG_VOWEL, PRIMARY_TASHKIL, YA } from "../../Definitions";
import { VerbRoot } from "../../VerbRoot";
import { Vocalized } from "../../Vocalization";

export class AugmentedRoot
{
    constructor(private _vocalized: Vocalized[], private _root: VerbRoot)
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

    public get root()
    {
        return this._root;
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
                v.letter = this._root.radicalsAsSeparateLetters[n-1];
            }
        }
    }

    public ApplyTashkil(radical: number, taskil: BASE_TASHKIL | undefined)
    {
        const v = this.GetRadical(radical);
        v!.tashkil = taskil;
    }

    public AssimilateRadical(radical: number)
    {
        const idx = this.GetRadicalIndedx(radical);

        this._vocalized[idx - 1].tashkil = this._vocalized[idx].tashkil;
        this._vocalized.Remove(idx);
    }

    public DropRadial(radical: number)
    {
        const idx = this.GetRadicalIndedx(radical);
        this._vocalized.Remove(idx);
    }

    public InsertLongVowel(radical: number, vowel: LONG_VOWEL)
    {
        function LongVowelToShortVowel(vowel: LONG_VOWEL)
        {
            switch(vowel)
            {
                case ALEF:
                    return FATHA;
                case YA:
                    return KASRA;
            }
        }

        this.ReplaceRadical(radical, { letter: vowel, shadda: false });
        this.ApplyTashkil(radical - 1, LongVowelToShortVowel(vowel));
    }

    public InsertShortVowel(radical: number, shortVowel: PRIMARY_TASHKIL)
    {
        this.DropRadial(radical);
        this.ApplyTashkil(radical - 1, shortVowel);
    }

    public ReplaceRadical(radical: number, replacement: Vocalized)
    {
        const v = this.GetRadical(radical);
        v!.letter = replacement.letter;
        v!.shadda = replacement.shadda;
        v!.tashkil = replacement.tashkil;
    }

    //Private methods
    private GetRadical(n: number)
    {
        return this._vocalized.find( x => x.letter === ("r" + n));
    }

    private GetRadicalIndedx(n: number)
    {
        return this._vocalized.findIndex( x => x.letter === ("r" + n));
    }
}