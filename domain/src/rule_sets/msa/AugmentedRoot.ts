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
import { Letter, Tashkil } from "../../Definitions";
import { VowelLetterToPreTashkil } from "../../Util";
import { VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized } from "../../Vocalization";

export enum SymbolName
{
    Infix,
    Postfix,
    Prefix1,
    Prefix2,
    R1,
    R2,
    R3,
    R4,
}

type ConstantSymbolNames = SymbolName.Infix | SymbolName.Postfix | SymbolName.Prefix1 | SymbolName.Prefix2;
interface ConstantRootSymbolInput extends ConjugationVocalized
{
    readonly symbolName: ConstantSymbolNames;
}

type VariableSymbolNames = SymbolName.R1 | SymbolName.R2 | SymbolName.R3 | SymbolName.R4;
interface VariableRootSymbolInput
{
    readonly symbolName: VariableSymbolNames;
}

export type AugmentedRootSymbolInput = ConstantRootSymbolInput | VariableRootSymbolInput;

interface AugmentedRootSymbol
{
    letter: Letter;
    readonly symbolName: SymbolName;
    tashkil: Tashkil;
    emphasis: boolean;
}

type RadicalNumber = 1 | 2 | 3 | 4;
export class AugmentedRoot
{
    constructor(inputSymbols: AugmentedRootSymbolInput[], private root: VerbRoot)
    {
        this._symbols = inputSymbols.map(x => {
            return {
                letter: ("letter" in x) ? x.letter : (this.root.radicalsAsSeparateLetters[x.symbolName - SymbolName.R1]),
                symbolName: x.symbolName,
                tashkil: ("tashkil" in x) ? x.tashkil : Tashkil.EndOfWordMarker, //create wrong data here. WordEnd is obviously only supported at the end, but after applying all tashkil, this should not happen
                emphasis: false
            };
        })
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

    public get symbols()
    {
        return this._symbols;
    }

    public get type()
    {
        return this.root.type;
    }

    //Public methods
    public ApplyRadicalTashkil(radical: RadicalNumber, tashkil: Tashkil)
    {
        this.ApplyTashkil(SymbolName.R1 + radical - 1, tashkil);
    }

    public ApplyTashkil(symbolName: SymbolName, tashkil: Tashkil)
    {
        const v = this.GetSymbol(symbolName);
        v!.tashkil = tashkil;
    }

    public AssimilateRadical(radical: RadicalNumber)
    {
        const idx = this.GetSymbolIndex(this.RadicalNumberToSymbolName(radical));

        this._symbols[idx - 1].tashkil = this._symbols[idx].tashkil;
        this._symbols.Remove(idx);
    }

    public DropRadial(radical: RadicalNumber)
    {
        const idx = this.GetSymbolIndex(this.RadicalNumberToSymbolName(radical));
        this._symbols.Remove(idx);
    }

    public InsertLongVowel(radical: RadicalNumber, vowel: Letter.Alef | Letter.Ya)
    {
        this.ReplaceRadical(radical, { letter: vowel, tashkil: Tashkil.LongVowelMarker });
        const radicalSymbol = this.RadicalNumberToSymbolName(radical);
        const predecessor = this.PredecessorOf(radicalSymbol);
        this.ApplyTashkil(predecessor, VowelLetterToPreTashkil(vowel));
    }

    public InsertShortVowel(radical: RadicalNumber, shortVowel: (Tashkil.Dhamma | Tashkil.Fatha | Tashkil.Kasra))
    {
        const radicalSymbol = this.RadicalNumberToSymbolName(radical);
        const predecessor = this.PredecessorOf(radicalSymbol);

        this.DropRadial(radical);
        this.ApplyTashkil(predecessor, shortVowel);
    }

    public ReplaceRadical(radical: number, replacement: ConjugationVocalized)
    {
        const v = this.GetRadical(radical as any);
        v!.letter = replacement.letter;
        v!.tashkil = replacement.tashkil;
    }

    //Private state
    private _symbols: AugmentedRootSymbol[];

    //Private methods
    private GetRadical(radicalNumber: RadicalNumber)
    {
        return this.GetSymbol(this.RadicalNumberToSymbolName(radicalNumber));
    }

    private GetSymbol(symbolName: SymbolName)
    {
        return this._symbols.find( x => x.symbolName === symbolName);
    }

    private GetSymbolIndex(symbolName: SymbolName)
    {
        return this._symbols.findIndex( x => x.symbolName === symbolName);
    }

    private PredecessorOf(symbolName: SymbolName)
    {
        const index = this.GetSymbolIndex(symbolName);
        return this._symbols[index - 1].symbolName;
    }

    private RadicalNumberToSymbolName(radicalNumber: RadicalNumber): SymbolName
    {
        switch(radicalNumber)
        {
            case 1:
                return SymbolName.R1;
            case 2:
                return SymbolName.R2;
            case 3:
                return SymbolName.R3;
            case 4:
                return SymbolName.R4;
        }
    }
}