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

import { VerbRoot } from "./VerbRoot";
import { FATHA, Person, SHADDA, Tempus, VerbStem } from "./VerbStem";

export class VerbStem2 implements VerbStem
{
    constructor(private root: VerbRoot)
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
                            return this.root.r1 + FATHA + this.root.r2 + SHADDA + FATHA + this.root.r3 + FATHA;
                    }

                    throw new Error("Method not implemented.");
                }
        }
        throw new Error("Method not implemented.");
    }
}