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

import { ConjugationParams, Letter, Tashkil, Tense, Voice } from "../../../Definitions";
import { RootType, VerbRoot } from "../../../VerbRoot";
import { AugmentedRootSymbolInput, SymbolName } from "../AugmentedRoot";

export function AugmentRoot(stem: number, root: VerbRoot, params: ConjugationParams): AugmentedRootSymbolInput[] | undefined
{
    switch(stem)
    {
        case 1:
        {
            switch(root.type)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
                case RootType.Quadriliteral:
                    return [
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                        { symbolName: SymbolName.R4 },
                    ];
            }
        }
        case 2:
        {
            switch(root.type)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.Infix, letter: root.r2, tashkil: Tashkil.Sukun },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
            }
        }
        break;
        case 3:
        {
            switch(root.type)
            {
                case RootType.Assimilated:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1 },
                        { letter: ((params.tense === Tense.Perfect) && (params.voice === Voice.Passive)) ? Letter.Waw : Letter.Alef, symbolName: SymbolName.Infix, tashkil: Tashkil.LongVowelMarker },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
            }
        }
        break;
        case 4:
        {
            switch(root.type)
            {
                case RootType.Defective:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
                    if(params.tense === Tense.Perfect)
                        x.unshift({ letter: Letter.Hamza, symbolName: SymbolName.Postfix, tashkil: (params.voice === Voice.Active) ? Tashkil.Fatha : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 5:
        {
            switch(root.type)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: Letter.Ta, symbolName: SymbolName.Prefix1, tashkil: (params.voice === Voice.Passive && params.tense === Tense.Perfect) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.Infix, letter: root.r2, tashkil: Tashkil.Sukun },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
            }
        }
        break;
        case 6:
        {
            switch(root.type)
            {
                case RootType.Hollow:
                case RootType.Sound:
                    return [
                        { letter: Letter.Ta, symbolName: SymbolName.Prefix1, tashkil: (params.voice === Voice.Passive && params.tense === Tense.Perfect) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1 },
                        { letter: ((params.tense === Tense.Perfect) && (params.voice === Voice.Passive)) ? Letter.Waw : Letter.Alef, symbolName: SymbolName.Infix, tashkil: Tashkil.LongVowelMarker },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
            }
        }
        break;
        case 7:
        {
            switch(root.type)
            {
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { letter: Letter.Nun, symbolName: SymbolName.Prefix1, tashkil: Tashkil.Sukun },
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
                    if(params.tense === Tense.Perfect)
                        x.unshift({ letter: Letter.Alef, symbolName: SymbolName.Postfix, tashkil: (params.voice === Voice.Active) ? Tashkil.Kasra : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 8:
        {
            switch(root.type)
            {
                case RootType.Defective:
                case RootType.Hollow:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { symbolName: SymbolName.R1 },
                        { letter: Letter.Ta, symbolName: SymbolName.Infix, tashkil: ((params.tense === Tense.Perfect) && (params.voice === Voice.Passive)) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
                    if(params.tense === Tense.Perfect)
                        x.unshift({ letter: Letter.Alef, symbolName: SymbolName.Postfix, tashkil: (params.voice === Voice.Active) ? Tashkil.Kasra : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 10:
        {
            switch(root.type)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: Letter.Siin, symbolName: SymbolName.Prefix1, tashkil: Tashkil.Sukun },
                        { letter: Letter.Ta, symbolName: SymbolName.Prefix2, tashkil: ((params.tense === Tense.Perfect) && (params.voice === Voice.Passive)) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1 },
                        { symbolName: SymbolName.R2 },
                        { symbolName: SymbolName.R3 },
                    ];
            }
        }
        break;
    }
}