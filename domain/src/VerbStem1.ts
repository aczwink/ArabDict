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

import { ALEF, FATHA, SHADDA } from "./Definitions";
import { RootType, VerbRoot } from "./VerbRoot";
import { Person, SUKUN, Tempus, VerbStem } from "./VerbStem";

export class VerbStem1 implements VerbStem
{
    constructor(private root: VerbRoot, private stem1MiddleRadicalTashkil: string)
    {
    }

    //Public methods
    public Conjugate(tempus: Tempus, person: Person): string
    {
        switch(tempus)
        {
            case "perfect":
                {
                    switch(person)
                    {
                        case "3rd-singular-masulin":
                            switch(this.root.type)
                            {
                                case RootType.Quadriliteral:
                                    return this.root.r1 + FATHA + this.root.r2 + SUKUN + this.root.r3 + FATHA + this.root.r4 + FATHA;
                                case RootType.Regular:
                                    return this.root.r1 + FATHA + this.root.r2 + this.stem1MiddleRadicalTashkil + this.root.r3 + FATHA;
                                case RootType.SecondConsonantDoubled:
                                    return this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA;
                                case RootType.SecondConsonantWawOrYa:
                                    return this.root.r1 + FATHA + ALEF + this.root.r3 + FATHA;
                            }
                    }

                    throw new Error("Method not implemented.");
                }
        }
        throw new Error("Method not implemented.");
    }
}