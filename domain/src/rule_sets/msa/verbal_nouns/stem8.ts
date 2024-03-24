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
import { Letter, Tashkil } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { ConjugationVocalized } from "../../../Vocalization";
import { Stem8AssimilateTa } from "../conjugation/stem8";

export function GenerateAllPossibleVerbalNounsStem8(root: VerbRoot): ConjugationVocalized[]
{
    switch(root.type)
    {
        case RootType.Hollow:
            return [
                { letter: Letter.Alef, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, tashkil: Tashkil.Kasra },
                { letter: Letter.Ya, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.Fatha },
                { letter: root.r3, tashkil: Tashkil.Sukun },
            ];
        case RootType.Sound:
        {
            const v: ConjugationVocalized[] = [
                { letter: Letter.Alef, tashkil: Tashkil.Kasra },
                { letter: root.r1, tashkil: Tashkil.Sukun },
                { letter: Letter.Ta, tashkil: Tashkil.Kasra },
                { letter: root.r2, tashkil: Tashkil.Fatha },
                { letter: Letter.Alef, tashkil: Tashkil.Fatha },
                { letter: root.r3, tashkil: Tashkil.Sukun },
            ];
        
            Stem8AssimilateTa(v, 1);
        
            return v;
        }
    }

    return [{letter: "TODO" as any, tashkil: Tashkil.Fatha}];
}