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
import { Letter, Tashkil, Tense, Person, VoiceString, Numerus, Gender } from "../../../Definitions";
import { VerbRoot, RootType } from "../../../VerbRoot";
import { _LegacyVerbStem } from "./VerbStem";

//TODO: REMOVE
export class _LegacyVerbStem8 implements _LegacyVerbStem
{
    constructor(private root: VerbRoot)
    {
    }

    //Public methods
    public Conjugate(tense: Tense, voice: VoiceString, gender: Gender, person: Person, numerus: Numerus): string
    {
        switch(tense)
        {
            case Tense.Perfect:
                return this.ConjugatePerfect(voice, gender, person, numerus);
            case Tense.Present:
                return "T" + Tashkil.Fatha + "O" + Tashkil.Fatha + "D" + Tashkil.Fatha + "O" + Tashkil.Fatha;
        }
    }

    //Private methods
    private ConjugatePerfect(voice: VoiceString, gender: Gender, person: Person, numerus: Numerus)
    {
        if(voice === "active")
            return this.ConjugatePerfectActive(gender, person, numerus);
        return "T" + Tashkil.Fatha + "O" + Tashkil.Fatha + "D" + Tashkil.Fatha + "O" + Tashkil.Fatha;
    }

    private ConjugatePerfectActive(gender: Gender, person: Person, numerus: Numerus)
    {
        switch(numerus)
        {
            case Numerus.Singular:
                switch(person)
                {
                    case Person.Third:
                        {
                            switch(gender)
                            {
                                case Gender.Male:
                                    switch(this.root.type)
                                    {
                                        case RootType.Hollow:
                                            return Letter.Alef + Tashkil.Kasra + this.root.r1 + Tashkil.Sukun + Letter.Ta + Tashkil.Fatha + Letter.Alef + this.root.r3 + Tashkil.Fatha;
                                    }
                            }
                        }
                }
        }
        return "T" + Tashkil.Fatha + "O" + Tashkil.Fatha + "D" + Tashkil.Fatha + "O" + Tashkil.Fatha;
    }
}