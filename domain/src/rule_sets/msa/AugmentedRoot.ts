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

import { ALEF, BASE_TASHKIL, FATHA, KASRA, LONG_VOWEL, PRIMARY_TASHKIL, YA } from "../../Definitions";
import { VerbRoot } from "../../VerbRoot";
import { PartiallyVocalized, VerbVocalized } from "../../Vocalization";

interface ConstantRootSymbolInput extends PartiallyVocalized
{
    readonly symbolName: "ai1" | "apre1" | "apre2" | "apost1"; //augmented-(infix | postfix | prefix)
}

interface VariableRootSymbolInput
{
    shadda: boolean;
    readonly symbolName: "r1" | "r2" | "r3" | "r4";
}

export type AugmentedRootSymbolInput = ConstantRootSymbolInput | VariableRootSymbolInput;

interface AugmentedRootSymbol
{
    letter: string;
    shadda: boolean;
    readonly symbolName: string;
    tashkil?: BASE_TASHKIL;
}

export class AugmentedRoot
{
    constructor(inputSymbols: AugmentedRootSymbolInput[], private root: VerbRoot)
    {
        this.symbols = inputSymbols.map(x => {
            return {
                letter: ("letter" in x) ? x.letter : (this.root.radicalsAsSeparateLetters[parseInt(x.symbolName.substring(1)) - 1]),
                shadda: x.shadda,
                symbolName: x.symbolName,
                tashkil: ("tashkil" in x) ? x.tashkil : undefined
            };
        })
    }

    //Properties
    public get partiallyVocalized()
    {
        return this.symbols as PartiallyVocalized[];
    }

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

    public get type()
    {
        return this.root.type;
    }

    //Public methods
    public ApplyTashkil(radical: number, taskil: BASE_TASHKIL)
    {
        const v = this.GetRadical(radical);
        v!.tashkil = taskil;
    }

    public AssimilateRadical(radical: number)
    {
        const idx = this.GetRadicalIndedx(radical);

        this.symbols[idx - 1].tashkil = this.symbols[idx].tashkil;
        this.symbols.Remove(idx);
    }

    public DropRadial(radical: number)
    {
        const idx = this.GetRadicalIndedx(radical);
        this.symbols.Remove(idx);
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

        this.ReplaceRadical(radical, { letter: vowel, shadda: false, tashkil: LongVowelToShortVowel(vowel) });
        this.ApplyTashkil(radical - 1, LongVowelToShortVowel(vowel));
    }

    public InsertShortVowel(radical: number, shortVowel: PRIMARY_TASHKIL)
    {
        this.DropRadial(radical);
        this.ApplyTashkil(radical - 1, shortVowel);
    }

    public ReplaceRadical(radical: number, replacement: VerbVocalized)
    {
        const v = this.GetRadical(radical);
        v!.letter = replacement.letter;
        v!.shadda = replacement.shadda;
        v!.tashkil = replacement.tashkil;
    }

    //Private state
    private symbols: AugmentedRootSymbol[];

    //Private methods
    private GetRadical(n: number)
    {
        return this.symbols.find( x => x.symbolName === ("r" + n));
    }

    private GetRadicalIndedx(n: number)
    {
        return this.symbols.findIndex( x => x.symbolName === ("r" + n));
    }
}