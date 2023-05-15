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

import { HAMZA, SHADDA, WAW, YA } from "./Definitions";

export enum RootType
{
    Quadriliteral,
    Regular,
    SecondConsonantDoubled,
    /**
     * Second radical is waw or ya
     */
    Hollow,
    /**
     * Third radical is waw or ya
     */
    Defective,
    /**
     * The first radical is a hamza
     */
    HamzaOnR1
}

export class VerbRoot
{
    constructor(private radicals: string)
    {
    }

    //Properties
    public get r1()
    {
        return this.radicals.charAt(0);
    }

    public get r2()
    {
        return this.radicals.charAt(1);
    }

    public get r3()
    {
        return this.radicals.charAt(2);
    }

    public get r4()
    {
        return this.radicals.charAt(3);
    }

    public get radicalsAsSeparateLetters()
    {
        switch(this.type)
        {
            case RootType.Quadriliteral:
                return [this.r1, this.r2, this.r3, this.r4];
            case RootType.Regular:
            case RootType.Hollow:
            case RootType.Defective:
            case RootType.HamzaOnR1:
                return [this.r1, this.r2, this.r3];
            case RootType.SecondConsonantDoubled:
                return [this.r1, this.r2, this.r2];
        }
    }

    public get type()
    {
        if(this.radicals.length === 4)
            return RootType.Quadriliteral;
        if(this.r3 === SHADDA)
            return RootType.SecondConsonantDoubled;
        if((this.r2 === WAW) || (this.r2 === YA))
            return RootType.Hollow;
        if((this.r3 === WAW) || (this.r3 === YA))
            return RootType.Defective;
        if(this.r1 === HAMZA)
            return RootType.HamzaOnR1;
        return RootType.Regular;
    }
}