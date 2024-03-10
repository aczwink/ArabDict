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

import { Component, FormField, JSX_CreateElement } from "acfrontend";
import { RootCreationData } from "../../dist/api";
import { IsFlagSet, RootFlags, ToggleFlag } from "../shared/flags";
import { RadicalsEditorComponent } from "./RadicalsEditorComponent";

export class RootEditorComponent extends Component<{ data: RootCreationData; onDataChanged: () => void }>
{
    protected Render(): RenderValue
    {
        return <fragment>
            <FormField title="Radicals" description="The radicals that make up the root">
                <RadicalsEditorComponent radicals={this.input.data.radicals} onDataChanged={this.OnRootRadicalsChanged.bind(this)} />
            </FormField>

            <FormField title="Defective/Hollow root with و and ي">
                <input type="checkbox" checked={IsFlagSet(this.input.data.flags, RootFlags.DefectiveOrHollowAlsoYa)} onclick={this.OnYaFlagToggled.bind(this)} />
            </FormField>
        </fragment>;
    }

    //Event handlers
    override OnInputChanged(): void
    {
        this.Update();
    }

    private OnRootRadicalsChanged(newValue: string)
    {
        this.input.data.radicals = newValue;
        this.input.onDataChanged();
    }

    private OnYaFlagToggled()
    {
        this.input.data.flags = ToggleFlag(this.input.data.flags, RootFlags.DefectiveOrHollowAlsoYa);
        this.input.onDataChanged();
    }
}