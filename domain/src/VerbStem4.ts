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

import { ALEF, ALEF_HAMZA, FATHA, SUKUN } from "./Definitions";
import { Hamzate } from "./Hamza";
import { RootType, VerbRoot } from "./VerbRoot";
import { Gender, Numerus, Person, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";
import { Vocalize } from "./Vocalization";

export class VerbStem4 implements VerbStem
{
    constructor(private root: VerbRoot)
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
    private ConjugateImperative(gender: Gender, person: Person, numerus: Numerus): string
    {
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
        switch(numerus)
        {
            case "dual":
            case "plural":
                return "TODO";
            case "singular":
                switch(person)
                {
                    case "first":
                    case "second":
                        return "TODO";
                    case "third":
                        {
                            switch(gender)
                            {
                                case "female":
                                    return "TODO";
                                case "male":
                                    switch(this.root.type)
                                    {
                                        case RootType.Hollow:
                                            return ALEF_HAMZA + FATHA + this.root.r1 + FATHA + ALEF + this.root.r3 + FATHA;
                                        case RootType.Regular:
                                            return Hamzate( Vocalize(ALEF_HAMZA, FATHA), Vocalize(this.root.r1, SUKUN), Vocalize(this.root.r2, FATHA), Vocalize(this.root.r3, FATHA) );
                                    }
                                    return "TODO";
                            }
                        }
                }
        }
    }

    private ConjugatePerfectPassive(gender: Gender, person: Person, numerus: Numerus)
    {
        return "TODO";
    }

    private ConjugatePresent(voice: Voice, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "active")
            return this.ConjugatePresentActive(gender, person, numerus);
        return this.ConjugatePresentPassive(gender, person, numerus);
    }

    private ConjugatePresentActive(gender: Gender, person: Person, numerus: Numerus)
    {
        return "TODO";
    }

    private ConjugatePresentPassive(gender: Gender, person: Person, numerus: Numerus)
    {
        return "TODO";
    }
}