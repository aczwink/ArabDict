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

import { Component, FormField, JSX_CreateElement, LineEdit } from "acfrontend";
import { RootCreationData } from "../../dist/api";
import { AreValidRootCharacters, IsValidRootRadical, RootToString } from "./general";
import { BA, HAMZA, HHA, LAM, LETTER_RA, Letter, MIM, QAF, WAW, YA } from "arabdict-domain/src/Definitions";
import { NUN, SIIN, TA } from "arabdict-domain/src/rule_sets/msa/_legacy/VerbStem";
import { IsFlagSet, RootFlags, ToggleFlag } from "../shared/flags";

export class RootEditorComponent extends Component<{ data: RootCreationData; onDataChanged: () => void }>
{
    protected Render(): RenderValue
    {
        const validClassName = AreValidRootCharacters(this.input.data.radicals) ? "is-valid" : "is-invalid";
        return <fragment>
            <FormField title="Radicals" description="The radicals that make up the root">
                <LineEdit className={validClassName} value={this.input.data.radicals} onChanged={this.OnRootRadicalsChanged.bind(this)} />
            </FormField>

            Root radicals: {RootToString(this.input.data)}

            <FormField title="Defective/Hollow root with و and ي">
                <input type="checkbox" checked={IsFlagSet(this.input.data.flags, RootFlags.DefectiveOrHollowAlsoYa)} onclick={this.OnYaFlagToggled.bind(this)} />
            </FormField>
        </fragment>;
    }

    //Private methods
    private MapChar(char: string)
    {
        if(IsValidRootRadical(char))
            return char;

        switch(char)
        {
            case "a":
                return HAMZA;
            case "b":
                return BA;
            case "g":
                return Letter.Ghain;
            case "H":
                return HHA;
            case "k":
                return Letter.Kaf;
            case "l":
                return LAM;
            case "m":
                return MIM;
            case "n":
                return NUN;
            case "q":
                return QAF;
            case "r":
                return LETTER_RA;
            case "s":
                return SIIN;
            case "t":
                return TA;
            case "T":
                return Letter.Tta;
            case "w":
                return WAW;
            case "y":
                return YA;
        }
        return "";
    }

    //Event handlers
    override OnInputChanged(): void
    {
        this.Update();
    }

    private OnRootRadicalsChanged(newValue: string)
    {
        const chars = newValue.split("").map(this.MapChar.bind(this));
        this.input.data.radicals = chars.join("");
        this.input.onDataChanged();
    }

    private OnYaFlagToggled()
    {
        this.input.data.flags = ToggleFlag(this.input.data.flags, RootFlags.DefectiveOrHollowAlsoYa);
        this.input.onDataChanged();
    }
}