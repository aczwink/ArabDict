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

import { WAW, ALEF, ALEF_HAMZA, BASE_TASHKIL, DHAMMA, FATHA, KASRA, SUKUN } from "../../Definitions";
import { ConjugationParams } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { TA, NUN, SIIN } from "../../VerbStem";
import { Vocalized } from "../../Vocalization";
import { AugmentedRoot } from "./AugmentedRoot";

export class RootAugmentor
{
    //Public methods
    public AugmentAndTashkilizeRoot(root: VerbRoot, params: ConjugationParams)
    {
        const maybeAugmentedRoot = this.AugmentRoot(params.stem, root.type, params);
        if(maybeAugmentedRoot !== undefined)
        {
            const augmentedRoot = new AugmentedRoot(maybeAugmentedRoot, root);

            const tashkil = this.DeriveRootTashkil(params);
            augmentedRoot.ApplyTashkil(1, tashkil.r1);
            augmentedRoot.ApplyTashkil(2, tashkil.r2);

            this.ApplyRootAugmentationTashkil(augmentedRoot.vocalized, params);

            return augmentedRoot;
        }

        return undefined;
    }

    //Private methods
    private ApplyRootAugmentationTashkil(augmentedRoot: Vocalized[], params: ConjugationParams)
    {
        switch(params.stem)
        {
            case 4:
                if(params.tense === "perfect")
                    augmentedRoot[0].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
                break;
            case 5:
            case 6:
                augmentedRoot[0].tashkil = (params.voice === "passive" && params.tense === "perfect") ? DHAMMA : FATHA;
                break;
            case 7:
                if(params.tense === "perfect")
                {
                    augmentedRoot[0].tashkil = (params.voice === "active") ? KASRA : DHAMMA;
                    augmentedRoot[1].tashkil = SUKUN;
                }
                else
                {
                    augmentedRoot[0].tashkil = SUKUN;
                }
                break;
            case 8:
                if(params.tense === "perfect")
                {
                    augmentedRoot[0].tashkil = (params.voice === "active") ? KASRA : DHAMMA;
                    augmentedRoot[2].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
                }
                else
                {
                    augmentedRoot[1].tashkil = FATHA;
                }
                break;
            case 10:
                if(params.tense === "perfect")
                {
                    augmentedRoot[0].tashkil = (params.voice === "active") ? KASRA : DHAMMA;
                    augmentedRoot[1].tashkil = SUKUN;
                    augmentedRoot[2].tashkil = (params.voice === "active") ? FATHA : DHAMMA;
                }
                else
                {
                    augmentedRoot[0].tashkil = SUKUN;
                    augmentedRoot[1].tashkil = FATHA;
                }
            break;
        }
    }

    private AugmentRoot(stem: number, rootType: RootType, params: ConjugationParams): Vocalized[] | undefined
    {
        switch(stem)
        {
            case 1:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        return [
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                }
            }
            break;
            case 2:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        return [
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: true },
                            { letter: "r3", shadda: false },
                        ];
                }
            }
            break;
            case 3:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        return [
                            { letter: "r1", shadda: false },
                            { letter: ((params.tense === "perfect") && (params.voice === "passive")) ? WAW : ALEF, shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                }
            }
            break;
            case 4:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        const x = [
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                        if(params.tense === "perfect")
                            x.unshift({ letter: ALEF_HAMZA, shadda: false });
                        return x;
                }
            }
            break;
            case 5:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        return [
                            { letter: TA, shadda: false },
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: true },
                            { letter: "r3", shadda: false },
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
                            { letter: TA, shadda: false },
                            { letter: "r1", shadda: false },
                            { letter: ((params.tense === "perfect") && (params.voice === "passive")) ? WAW : ALEF, shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                }
            }
            break;
            case 7:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        const x = [
                            { letter: NUN, shadda: false },
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                        if(params.tense === "perfect")
                            x.unshift({ letter: ALEF, shadda: false });
                        return x;
                }
            }
            break;
            case 8:
            {
                switch(rootType)
                {
                    case RootType.Sound:
                        const x = [
                            { letter: "r1", shadda: false },
                            { letter: TA, shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                        if(params.tense === "perfect")
                            x.unshift({ letter: ALEF, shadda: false });
                        return x;
                }
            }
            break;
            case 10:
            {
                switch(rootType)
                {
                    case RootType.HamzaOnR1:
                    case RootType.SecondConsonantDoubled:
                    case RootType.Sound:
                    {
                        const x = [
                            { letter: SIIN, shadda: false },
                            { letter: TA, shadda: false },
                            { letter: "r1", shadda: false },
                            { letter: "r2", shadda: false },
                            { letter: "r3", shadda: false },
                        ];
                        if(params.tense === "perfect")
                            x.unshift({ letter: ALEF, shadda: false });
                        return x;
                    }
                }
            }
            break;
        }
    }

    private DerivePastRootTashkil(params: ConjugationParams): { r1: BASE_TASHKIL; r2: BASE_TASHKIL; }
    {
        const r1stem = ((params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? SUKUN : ((params.voice === "active") ? FATHA : DHAMMA);
        const r2active = (params.stem === 1) ? (params.stem1Context!.middleRadicalTashkil as any) : FATHA;
        return {
            r1: r1stem,
            r2: (params.voice === "active") ? r2active : KASRA
        };
    }

    private DeriveRootTashkil(params: ConjugationParams): { r1: BASE_TASHKIL; r2: BASE_TASHKIL; }
    {
        if(params.tense === "perfect")
            return this.DerivePastRootTashkil(params);

        function R2Active(): BASE_TASHKIL
        {
            switch(params.stem)
            {
                case 1:
                    return params.stem1Context!.middleRadicalTashkilPresent as any;
                case 2:
                case 3:
                case 4:
                case 7:
                case 8:
                case 10:
                    return KASRA;
                case 5:
                case 6:
                    return FATHA;
            }
            throw new Error("Unknown stem");
        }

        return {
            r1: ((params.stem === 1) || (params.stem === 4) || (params.stem === 8) || (params.stem === 10)) ? SUKUN : FATHA,
            r2: (params.voice === "active") ? R2Active() : FATHA
        };
    }
}