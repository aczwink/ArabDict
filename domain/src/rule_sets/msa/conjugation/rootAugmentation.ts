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

import { ConjugationParams, Letter, Tashkil } from "../../../Definitions";
import { RootType } from "../../../VerbRoot";
import { AugmentedRootSymbolInput, SymbolName } from "../AugmentedRoot";

export function AugmentRoot(stem: number, rootType: RootType, params: ConjugationParams): AugmentedRootSymbolInput[] | undefined
{
    switch(stem)
    {
        case 1:
        {
            switch(rootType)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
                case RootType.Quadriliteral:
                    return [
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                        { symbolName: SymbolName.R4, shadda: false },
                    ];
            }
        }
        case 2:
        {
            switch(rootType)
            {
                case RootType.Defective:
                case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: true },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
            }
        }
        break;
        case 3:
        {
            switch(rootType)
            {
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.Sound:
                    return [
                        { symbolName: SymbolName.R1, shadda: false },
                        { letter: ((params._legacyTense === "perfect") && (params._legacyVoice === "passive")) ? Letter.Waw : Letter.Alef, shadda: false, symbolName: SymbolName.Infix, tashkil: Tashkil.LongVowelMarker },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
            }
        }
        break;
        case 4:
        {
            switch(rootType)
            {
                case RootType.Defective:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
                    if(params._legacyTense === "perfect")
                        x.unshift({ letter: Letter.Hamza, shadda: false, symbolName: SymbolName.Postfix, tashkil: (params._legacyVoice === "active") ? Tashkil.Fatha : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 5:
        {
            switch(rootType)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.Hollow:
                case RootType.Sound:
                    return [
                        { letter: Letter.Ta, shadda: false, symbolName: SymbolName.Prefix1, tashkil: (params._legacyVoice === "passive" && params._legacyTense === "perfect") ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: true },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
            }
        }
        break;
        case 6:
        {
            switch(rootType)
            {
                case RootType.Sound:
                    return [
                        { letter: Letter.Ta, shadda: false, symbolName: SymbolName.Prefix1, tashkil: (params._legacyVoice === "passive" && params._legacyTense === "perfect") ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1, shadda: false },
                        { letter: ((params._legacyTense === "perfect") && (params._legacyVoice === "passive")) ? Letter.Waw : Letter.Alef, shadda: false, symbolName: SymbolName.Infix, tashkil: Tashkil.LongVowelMarker },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
            }
        }
        break;
        case 7:
        {
            switch(rootType)
            {
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { letter: Letter.Nun, shadda: false, symbolName: SymbolName.Prefix1, tashkil: Tashkil.Sukun },
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
                    if(params._legacyTense === "perfect")
                        x.unshift({ letter: Letter.Alef, shadda: false, symbolName: SymbolName.Postfix, tashkil: (params._legacyVoice === "active") ? Tashkil.Kasra : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 8:
        {
            switch(rootType)
            {
                case RootType.Defective:
                case RootType.Sound:
                    const x: AugmentedRootSymbolInput[] = [
                        { symbolName: SymbolName.R1, shadda: false },
                        { letter: Letter.Ta, shadda: false, symbolName: SymbolName.Infix, tashkil: ((params._legacyTense === "perfect") && (params._legacyVoice === "passive")) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
                    if(params._legacyTense === "perfect")
                        x.unshift({ letter: Letter.Alef, shadda: false, symbolName: SymbolName.Postfix, tashkil: (params._legacyVoice === "active") ? Tashkil.Kasra : Tashkil.Dhamma });
                    return x;
            }
        }
        break;
        case 10:
        {
            switch(rootType)
            {
                case RootType.Assimilated:
                case RootType.Defective:
                case RootType.HamzaOnR1:
                case RootType.Hollow:
                case RootType.SecondConsonantDoubled:
                case RootType.Sound:
                    return [
                        { letter: Letter.Siin, shadda: false, symbolName: SymbolName.Prefix1, tashkil: Tashkil.Sukun },
                        { letter: Letter.Ta, shadda: false, symbolName: SymbolName.Prefix2, tashkil: ((params._legacyTense === "perfect") && (params._legacyVoice === "passive")) ? Tashkil.Dhamma : Tashkil.Fatha },
                        { symbolName: SymbolName.R1, shadda: false },
                        { symbolName: SymbolName.R2, shadda: false },
                        { symbolName: SymbolName.R3, shadda: false },
                    ];
            }
        }
        break;
    }
}