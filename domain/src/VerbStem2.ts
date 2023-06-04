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

import { ALEF_MAKSURA, FATHA, SHADDA } from "./Definitions";
import { RootType, VerbRoot } from "./VerbRoot";
import { Gender, Numerus, Person, Tense, VerbStem, VerbalNoun, Voice } from "./VerbStem";

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
                                    case RootType.Regular:
                                        return this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + this.root.r3 + FATHA;
                                }
                        }
                }
        }
        return "TODO";
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