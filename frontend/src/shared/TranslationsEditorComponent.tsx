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

import { BootstrapIcon, Component, FormField, JSX_CreateElement, SingleSelect, Textarea } from "acfrontend";
import { TranslationEntry } from "../../dist/api";
import { DialectToDisplayName, DialectToEmoji, dialects } from "./dialects";

export class TranslationsEditorComponent extends Component<{ translations: TranslationEntry[]; onDataChanged: () => void; }>
{;
    protected Render(): RenderValue
    {
        return <FormField title="Translations">
            <fragment>
                {this.input.translations.map(this.RenderTranslationEntry.bind(this))}
                <button type="button" className="btn btn-secondary" onclick={this.OnAddTranslationEntry.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
            </fragment>
        </FormField>;
    }

    //Private methods
    private RenderTranslationEntry(translationEntry: TranslationEntry)
    {
        return <div className="row mb-2">
            <div className="col-auto">
                <SingleSelect selectedIndex={dialects.indexOf(translationEntry.dialect)} onSelectionChanged={this.OnTranslationDialectChanged.bind(this, translationEntry)}>
                    {dialects.map(x => DialectToEmoji(x) + DialectToDisplayName(x))}
                </SingleSelect>
            </div>
            <div className="col">
                <Textarea rows={4} value={translationEntry.text} onChanged={newValue => translationEntry.text = newValue} />
            </div>
        </div>;
    }

    //Event handlers
    private OnAddTranslationEntry()
    {
        this.input.translations.push({
            dialect: "msa",
            text: ""
        });
        this.input.onDataChanged();
    }

    private OnTranslationDialectChanged(translationEntry: TranslationEntry, newIdx: number)
    {
        translationEntry.dialect = dialects[newIdx];
        this.input.onDataChanged();
    }
}