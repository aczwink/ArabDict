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

import { ALEF, ALEF_HAMZA, ALEF_MAKSURA, FATHA, MIM, SHADDA, WAW, YA } from "./Definitions";
import { RootType, VerbRoot } from "./VerbRoot";
import { DHAMMA, Gender, KASRA, Numerus, Person, SUKUN, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";

export class VerbStem1 implements VerbStem
{
    constructor(private root: VerbRoot, private stem1MiddleRadicalTashkil: string, private stem1MiddleRadicalTashkilPresent: string)
    {
    }

    //Public methods
    public Conjugate(tense: Tense, voice: Voice, gender: Gender, person: Person, numerus: Numerus): string
    {
        switch(tense)
        {
            case "imperative":
                if(voice === "passive")
                    throw new Error("imperative and passive does not exist");
                return this.ConjugateImperative(gender, person, numerus);
            case "perfect":
                return this.ConjugatePerfect(voice, gender, person, numerus);
            case "present":
                return this.ConjugatePresent(voice, gender, person, numerus);
        }
    }

    public ConjugateParticiple(voice: Voice): string
    {
        if(voice === "active")
        {
            switch(this.root.type)
            {
                case RootType.Regular:
                    return this.root.r1 + FATHA + ALEF + this.root.r2 + KASRA + this.root.r3;
                default:
                    return "TODO";
            }
        }

        switch(this.root.type)
        {
            case RootType.Regular:
                return MIM + FATHA + this.root.r1 + SUKUN + this.root.r2 + DHAMMA + WAW + this.root.r3;
            default:
                return "TODO";
        }
    }

    public GenerateAllPossibleVerbalNouns(): VerbalNoun[]
    {
        switch(this.root.type)
        {
            case RootType.Hollow:
                return [
                    {
                        id: 1,
                        text: MIM + FATHA + this.root.r1 + FATHA + ALEF + this.root.r3
                    },
                    {
                        id: 0,
                        text: "TODO"
                    }
                ];
            case RootType.SecondConsonantDoubled:
                return [
                    {
                        id: 2,
                        text: this.root.r1 + KASRA + this.root.r2 + SHADDA,
                    },
                    {
                        id: 1,
                        text: this.root.r1 + FATHA + this.root.r2 + KASRA + YA + this.root.r3
                    },
                    {
                        id: 0,
                        text: "TODO"
                    }
                ];
        }

        return [
            {
                id: 0,
                text: "TODO"
            }
        ];
    }

    //Private methods
    private ConjugateImperative(gender: Gender, person: Person, numerus: Numerus): string
    {
        switch(person)
        {
            case "first":
            case "third":
                return "";
            case "second":
                {
                    switch(numerus)
                    {
                        case "singular":
                            {
                                switch(gender)
                                {
                                    case "male":
                                        {
                                            switch(this.root.type)
                                            {
                                                case RootType.Regular:
                                                    return ALEF + ((this.stem1MiddleRadicalTashkil === DHAMMA) ? DHAMMA : KASRA) + this.root.r1 + SUKUN + this.root.r2 + this.stem1MiddleRadicalTashkil + this.root.r3 + SUKUN;
                                            }
                                        }
                                }
                            }
                    }
                }
        }
        return "TODO";
    }

    private ConjugatePerfect(voice: Voice, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "active")
            return this.ConjugatePerfectActive(gender, person, numerus);
        return this.ConjugatePerfectPassive(gender, person, numerus);
    }

    private ConjugatePerfectActive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(gender)
        {
            case "female":
                return "TODO";
            case "male":
                {
                    switch(person)
                    {
                        case "first":
                        case "second":
                            return "TODO";
                        case "third":
                            {
                                switch(numerus)
                                {
                                    case "dual":
                                    case "plural":
                                        return "TODO";
                                    case "singular":
                                        switch(this.root.type)
                                        {
                                            case RootType.Quadriliteral:
                                                return this.root.r1 + FATHA + this.root.r2 + SUKUN + this.root.r3 + FATHA + this.root.r4 + FATHA;
                                            case RootType.Regular:
                                                return this.root.r1 + FATHA + this.root.r2 + this.stem1MiddleRadicalTashkil + this.root.r3 + FATHA;
                                            case RootType.SecondConsonantDoubled:
                                                return this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA;
                                            case RootType.Hollow:
                                                return this.root.r1 + FATHA + ALEF + this.root.r3 + FATHA;
                                            case RootType.Defective:
                                                if(this.stem1MiddleRadicalTashkil === KASRA)
                                                    return this.root.r1 + FATHA + this.root.r2 + FATHA + ALEF_MAKSURA;
                                            case RootType.HamzaOnR1:
                                                return ALEF_HAMZA + FATHA + this.root.r2 + this.stem1MiddleRadicalTashkil + this.root.r3 + FATHA;
                                        }
                                }
                            }
                    }
                }
        }
        return "TODO";
    }

    private ConjugatePerfectPassive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(gender)
        {
            case "female":
                return "TODO";
            case "male":
                {
                    switch(person)
                    {
                        case "first":
                        case "second":
                            return "TODO";
                        case "third":
                            {
                                switch(numerus)
                                {
                                    case "dual":
                                    case "plural":
                                        return "TODO";
                                    case "singular":
                                        switch(this.root.type)
                                        {
                                            case RootType.Regular:
                                                return this.root.r1 + DHAMMA + this.root.r2 + KASRA + this.root.r3 + FATHA;
                                            default:
                                                return "TODO";
                                        }
                                }
                            }
                    }
                }
        }
    }

    private ConjugatePresent(voice: Voice, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "active")
            return this.ConjugatePresentActive(gender, person, numerus);
        return this.ConjugatePresentPassive(gender, person, numerus);
    }

    private ConjugatePresentActive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(gender)
        {
            case "female":
                return "TODO";
            case "male":
                {
                    switch(person)
                    {
                        case "first":
                        case "second":
                            return "TODO";
                        case "third":
                            {
                                switch(numerus)
                                {
                                    case "dual":
                                    case "plural":
                                        return "TODO";
                                    case "singular":
                                        switch(this.root.type)
                                        {
                                            case RootType.Regular:
                                                return YA + FATHA + this.root.r1 + SUKUN + this.root.r2 + this.stem1MiddleRadicalTashkilPresent + this.root.r3 + DHAMMA;
                                            case RootType.Defective:
                                                if(this.stem1MiddleRadicalTashkilPresent === KASRA)
                                                    return YA + FATHA + this.root.r1 + SUKUN + this.root.r2 + KASRA + YA;
                                                return "TODO";
                                            case RootType.HamzaOnR1:
                                                return YA + FATHA + ALEF_HAMZA + SUKUN + this.root.r2 + this.stem1MiddleRadicalTashkilPresent + this.root.r3 + DHAMMA;
                                        }
                                        return "TODO";
                                }
                            }
                    }
                }
        }
    }

    private ConjugatePresentPassive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(gender)
        {
            case "female":
                return "TODO";
            case "male":
                {
                    switch(person)
                    {
                        case "first":
                        case "second":
                            return "TODO";
                        case "third":
                            {
                                switch(numerus)
                                {
                                    case "dual":
                                    case "plural":
                                        return "TODO";
                                    case "singular":
                                        switch(this.root.type)
                                        {
                                            case RootType.Regular:
                                                return YA + DHAMMA + this.root.r1 + SUKUN + this.root.r2 + FATHA + this.root.r3 + DHAMMA;
                                        }
                                        return "TODO";
                                }
                            }
                    }
                }
        }
    }
}