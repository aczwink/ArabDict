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

import { LETTER_RA, Letter, QAF, Tashkil } from "./Definitions";
import { DisplayVocalized } from "./Vocalization";

//Source: https://en.wikipedia.org/wiki/Buckwalter_transliteration

export const Buckwalter = {
    CharToString: function ToBuckwalterTransliterationChar(letter: Letter)
    {
        switch(letter)
        {
            case Letter.Alef:
                return "A";
            case Letter.Ba:
                return "b";
            case Letter.Ta:
                return "t";
            case Letter.Tha:
                return "v";
            case Letter.Jiim:
                return "j";
            case Letter.Hha:
                return "H";
            case Letter.Kha:
                return "x";
            case Letter.Dal:
                return "d";
            case Letter.Thal:
                return "*";
            case LETTER_RA as any:
                return "r";
            case Letter.Zay:
                return "z";
            case Letter.Siin:
                return "s";
            case Letter.Shiin:
                return "$";
            case Letter.Saad:
                return "S";
            case Letter.Daad:
                return "D";
            case Letter.Tta:
                return "T";
            case Letter.Ththa:
                return "Z";
            case Letter.A3ein:
                return "E";
            case Letter.Ghain:
                return "g";
            case Letter.Fa:
                return "f";
            case QAF as any:
                return "q";
            case Letter.Kaf:
                return "k";
            case Letter.Lam:
                return "l";
            case Letter.Mim:
                return "m";
            case Letter.Nun:
                return "n";
            case Letter.Ha:
                return "h";
            case Letter.Waw:
                return "w";
            case Letter.Ya:
                return "y";

            case Letter.Hamza:
                return "'";
            case Letter.AlefMadda:
                return "|";
            case Letter.AlefHamza:
                return ">";
            case Letter.AlefHamzaBelow:
                return "<";
            case Letter.AlefMaksura:
                return "Y";
        }

        throw new Error("TODO1: " + letter + " " + letter.codePointAt(0));
    },

    TashkilToString: function(tashkil: Tashkil)
    {
        switch(tashkil)
        {
            case Tashkil.Dhamma:
                return "u";
            case Tashkil.Fatha:
                return "a";
            case Tashkil.Kasra:
                return "i";
            case Tashkil.Kasratan:
                return "K";
            case Tashkil.Sukun:
                return "o";
        }
        throw new Error("TODO2: " + tashkil + (tashkil as any).codePointAt(0));
    },

    ToString: function(vocalized: DisplayVocalized[])
    {
        function conv(v: DisplayVocalized)
        {
            const t = (v.tashkil === undefined) ? "" : Buckwalter.TashkilToString(v.tashkil);
            return Buckwalter.CharToString(v.letter) + t + (v.shadda ? "~" : "");
        }

        return vocalized.map(conv).join("");
    }
};