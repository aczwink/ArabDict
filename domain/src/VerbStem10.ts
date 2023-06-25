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

import { ALEF, FATHA, KASRA, SUKUN } from "./Definitions";
import { VerbRoot } from "./VerbRoot";
import { Gender, Numerus, Person, SIIN, TA, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";

export class VerbStem10 implements VerbStem
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
                                                    return ALEF + KASRA + SIIN + SUKUN + TA + FATHA + this.root.r1 + SUKUN + this.root.r2 + FATHA + this.root.r3 + FATHA;
                                            }
                                        }
                                }
                            }
                    }
                }
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
}