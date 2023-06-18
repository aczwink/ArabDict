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

import { ALEF_MAKSURA, FATHA, MIM, SHADDA } from "./Definitions";
import { RootType, VerbRoot } from "./VerbRoot";
import { DHAMMA, Gender, KASRA, Numerus, Person, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";

export class VerbStem2 implements VerbStem
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
                return "TODO";
            case "perfect":
                return this.ConjugatePerfect(voice, gender, person, numerus);
            case "present":
                return "TODO";
        }
    }

    public ConjugateParticiple(voice: Voice): string
    {
        if(voice === "active")
        {
            switch(this.root.type)
            {
                case RootType.Regular:
                    return MIM + DHAMMA + this.root.r1 + FATHA + this.root.r2 + SHADDA + KASRA + this.root.r3;
                default:
                    return "TODO";
            }
        }

        switch(this.root.type)
        {
            case RootType.Regular:
                return MIM + DHAMMA + this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + this.root.r3;
            default:
                return "TODO";
        }
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
        if(voice === "active")
            return this.ConjugatePerfectActive(gender, person, numerus);
        return "TODO";
    }

    private ConjugatePerfectActive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(numerus)
        {
            case "dual":
                return "TODO";

            case "plural":
                return "TODO";

            case "singular":
                switch(person)
                {
                    case "third":
                        switch(gender)
                        {
                            case "male":
                                switch(this.root.type)
                                {
                                    case RootType.Defective:
                                        return this.root.r1 + FATHA + this.root.r2 + FATHA + SHADDA + ALEF_MAKSURA;
                                }
                        }
                }
        }
        return "TODO";
    }
}