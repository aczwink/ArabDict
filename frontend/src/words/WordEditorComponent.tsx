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
import { TranslationEntry, WordRelation, WordType } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { WordMayHaveGender, WordTypeToText } from "../shared/words";
import { WordRelationsEditorComponent } from "./WordRelationsEditorComponent";

interface WordBaseData
{
    word: string;
    isMale: boolean | null;
    outgoingRelations: WordRelation[];
    type: WordType;
    translations: TranslationEntry[];
}

export class WordEditorComponent extends Component<{ data: WordBaseData; onDataChanged: () => void }>
{
    protected Render(): RenderValue
    {
        const wordTypes = [
            WordType.Adjective,
            WordType.Conjunction,
            WordType.ForeignVerb,
            WordType.Noun,
            WordType.Preposition,
            WordType.Adverb,
            WordType.Pronoun,
            WordType.Phrase,
            WordType.Particle,
        ];

        return <fragment>
            <FormField title="Type">
                <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                    {wordTypes.map(x => <option selected={x === this.input.data.type} value={x}>{WordTypeToText(x)}</option>)}
                </Select>
            </FormField>

            <FormField title="Word" description="Enter with full tashkil">
                <LineEdit value={this.input.data.word} onChanged={this.OnWordChanged.bind(this)} />
            </FormField>

            {this.RenderGender()}

            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onDataChanged} />
            <WordRelationsEditorComponent relations={this.input.data.outgoingRelations} onDataChanged={this.input.onDataChanged} />
        </fragment>;
    }

    //Private methods
    private RenderGender()
    {
        if(!WordMayHaveGender(this.input.data.type))
            return null;

        return <FormField title="Gender">
            <div className="row">
                <div className="col-auto"><label><input type="radio" checked={this.input.data.isMale === true} onclick={this.OnGenderChanged.bind(this, true)} /> Male</label></div>
                <div className="col-auto"><label><input type="radio" checked={this.input.data.isMale === false} onclick={this.OnGenderChanged.bind(this, false)} /> Female</label></div>
            </div>
        </FormField>;
    }

    //Event handlers
    private OnGenderChanged(newValue: boolean)
    {
        this.input.data.isMale = newValue;
        this.input.onDataChanged();
    }

    private OnWordChanged(newValue: string)
    {
        this.input.data.word = newValue;
        this.input.onDataChanged();
    }

    private OnWordTypeChanged(newValue: string[])
    {
        this.input.data.type = parseInt(newValue[0]);
        if(this.input.data.type === WordType.Noun)
            this.input.data.isMale = true;
        else
            this.input.data.isMale = null;
        this.input.onDataChanged();
    }
}