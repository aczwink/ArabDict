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

import { Component, FormField, JSX_CreateElement, LineEdit, Select } from "acfrontend";
import { TranslationEntry, WordType } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";

interface WordBaseData
{
    word: string;
    type: WordType;
    translations: TranslationEntry[];
}

export class WordEditorComponent extends Component<{ data: WordBaseData; onDataChanged: () => void }>
{
    protected Render(): RenderValue
    {
        const wordTypes = [
            { key: WordType.Adjective, value: "Adjective" },
            { key: WordType.Conjunction, value: "Conjunction" },
            { key: WordType.ForeignVerb, value: "Foreign Verb" },
            { key: WordType.Noun, value: "Noun" },
            { key: WordType.Preposition, value: "Preposition" },
            { key: WordType.Adverb, value: "Adverb" },
            { key: WordType.Pronoun, value: "Pronoun" },
            { key: WordType.Phrase, value: "Phrase" },
        ];

        return <fragment>
            <FormField title="Type">
                <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                    {wordTypes.map(x => <option selected={x.key === this.input.data.type} value={x.key}>{x.value}</option>)}
                </Select>
            </FormField>

            <FormField title="Word" description="Enter with full tashkil">
                <LineEdit value={this.input.data.word} onChanged={this.OnWordChanged.bind(this)} />
            </FormField>

            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onDataChanged} />
        </fragment>;
    }

    //Event handlers
    private OnWordChanged(newValue: string)
    {
        this.input.data.word = newValue;
        this.input.onDataChanged();
    }

    private OnWordTypeChanged(newValue: string[])
    {
        this.input.data.type = parseInt(newValue[0]);
        this.input.onDataChanged();
    }
}