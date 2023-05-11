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

import { ALEF_MAQSURA, FATHA, SHADDA, YA } from "./Definitions";
import { RootType, VerbRoot } from "./VerbRoot";
import { Gender, Numerus, Person, TA, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";

export class VerbStem5 implements VerbStem
{
    constructor(private root: VerbRoot)
    {
    }

    //Public methods
    public Conjugate(tense: Tense, voice: Voice, gender: Gender, person: Person, numerus: Numerus): string
    {
        if(voice === "passive")
            return "TODO";
        switch(tense)
        {
            case "perfect":
                return this.ConjugatePerfect(voice, gender, person, numerus);
            case "present":
                return this.ConjugatePresent(voice, gender, person, numerus);
        }
        return "TODO";
    }

    public ConjugateParticiple(voice: Voice): string
    {
        return "TODO";
    }

    public GenerateAllPossibleVerbalNouns(): VerbalNoun[]
    {
        return [
            {
                id: 0,
                text: "TODO"
            }
        ];
    }

    //Private methods
    private ConjugatePerfect(voice: Voice, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "passive")
            return "TODO";

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
                                            case RootType.Defective:
                                                return TA + FATHA + this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + ALEF_MAQSURA;
                                            case RootType.Regular:
                                                return TA + FATHA + this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + this.root.r3 + FATHA;
                                        }
                                }
                            }
                    }
                }
        }
        return "TODO";
    }

    private ConjugatePresent(voice: Voice, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "passive")
            return "TODO";

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
                                            case RootType.Defective:
                                                return YA + FATHA + TA + FATHA + this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + ALEF_MAQSURA;
                                        }
                                }
                            }
                    }
                }
        }
        return "TODO";
    }
}