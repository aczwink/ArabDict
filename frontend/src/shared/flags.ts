/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

export enum RootFlags
{
    //When for a defective root ending in waw, also an equivalent root with ya exists. Same for hollow
    DefectiveOrHollowAlsoYa = 1,
}

export function IsFlagSet(flags: number, flagToTest: number)
{
    return (flags & flagToTest) !== 0;
}

function SetFlag(flags: number, flagToSet: number)
{
    return flags | flagToSet;
}

export function ToggleFlag(flags: number, flagToToggle: number)
{
    if(IsFlagSet(flags, flagToToggle))
        return UnsetFlag(flags, flagToToggle);
    return SetFlag(flags, flagToToggle);
}

export function ToggleFlagConditionally(flags: number, condition: boolean, flagToToggle: number)
{
    if(condition)
        return SetFlag(flags, flagToToggle);
    return UnsetFlag(flags, flagToToggle);
}

export function UnsetFlag(flags: number, flagToUnset: number)
{
    return flags & (~flagToUnset);
}