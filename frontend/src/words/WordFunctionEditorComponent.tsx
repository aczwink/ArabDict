/**
 * OpenArabDictViewer
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

import { BootstrapIcon, Component, FormField, JSX_CreateElement, Select } from "acfrontend";
import { WordFunctionData } from "../../dist/api";
import { allWordTypes, WordTypeToText } from "../shared/words";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";

export class WordFunctionEditorComponent extends Component<{ data: WordFunctionData; onDataChanged: () => void; onDeleteFunction: () => void }>
{
    protected Render(): RenderValue
    {
        return <fragment>
            This word functions as: <a href="#" className="link-danger" onclick={this.OnDelete.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
            <FormField title="Type">
                <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                    {allWordTypes.map(x => <option selected={x === this.input.data.type} value={x}>{WordTypeToText(x)}</option>)}
                </Select>
            </FormField>
            
            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onDataChanged} />
        </fragment>;
    }

    //Event handlers
    private OnDelete(event: Event)
    {
        event.preventDefault();

        this.input.onDeleteFunction();
    }

    private OnWordTypeChanged(newValue: string[])
    {
        this.input.data.type = parseInt(newValue[0]);
        this.input.onDataChanged();
    }
}