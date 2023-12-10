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

import { Component, FormField, JSX_CreateElement, LineEdit, NumberSpinner, Select } from "acfrontend";
import { TranslationEntry, WordRootDerivationData, WordType, WordVerbDerivationData, WordVerbDerivationType, WordWordDerivationLink, WordWordDerivationType } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { WordMayHaveGender, WordTypeToText, allWordTypes } from "../shared/words";
import { WordWordDerivationEditorComponent } from "./WordWordDerivationEditorComponent";
import { WordVerbDerivationEditorComponent } from "./WordVerbDerivationEditorComponent";

interface WordBaseData
{
    word: string;
    isMale: boolean | null;
    derivation?: WordRootDerivationData | WordVerbDerivationData | WordWordDerivationLink;
    type: WordType;
    translations: TranslationEntry[];
}

export class WordEditorComponent extends Component<{ data: WordBaseData; onDataChanged: () => void }>
{
    protected Render(): RenderValue
    {
        return <fragment>
            <FormField title="Type">
                <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                    {allWordTypes.map(x => <option selected={x === this.input.data.type} value={x}>{WordTypeToText(x)}</option>)}
                </Select>
            </FormField>

            <FormField title="Word" description="Enter with full tashkil">
                <LineEdit value={this.input.data.word} onChanged={this.OnWordChanged.bind(this)} />
            </FormField>

            {this.RenderGender()}

            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onDataChanged} />

            {this.RenderDerivation()}
        </fragment>;
    }

    //Private methods
    private RenderDerivation()
    {
        return <div className="row">
            <div className="col">
                <FormField title="Derived from">
                    <Select onChanged={this.OnDerivationTypeChanged.bind(this)}>
                        <option selected={this.input.data.derivation === undefined}>None</option>
                        <option selected={(this.input.data.derivation !== undefined) && ("rootId" in this.input.data.derivation)}>Root</option>
                        <option selected={(this.input.data.derivation !== undefined) && ("verbId" in this.input.data.derivation)}>Verb</option>
                        <option selected={(this.input.data.derivation !== undefined) && ("refWordId" in this.input.data.derivation)}>Word</option>
                    </Select>
                </FormField>
            </div>
            <div className="col">{this.RenderDerivationSpecific()}</div>
        </div>;
    }

    private RenderDerivationSpecific()
    {
        if(this.input.data.derivation === undefined)
            return null;

        if("rootId" in this.input.data.derivation)
            return this.RenderRootDerivation(this.input.data.derivation);
        if("verbId" in this.input.data.derivation)
            return <WordVerbDerivationEditorComponent derivation={this.input.data.derivation} onDataChanged={this.input.onDataChanged} onUpdateWord={this.OnWordChanged.bind(this)} word={this.input.data.word} />;
        return <WordWordDerivationEditorComponent derivationLink={this.input.data.derivation} onDataChanged={this.input.onDataChanged} />;
    }

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

    private RenderRootDerivation(rootData: WordRootDerivationData)
    {
        return <FormField title="Root">
            <NumberSpinner value={rootData.rootId} step={1} onChanged={this.OnRootDerivationDataChanged.bind(this)} />
        </FormField>;
    }

    //Event handlers
    private OnDerivationTypeChanged(newValue: string[])
    {
        switch(newValue[0])
        {
            case "None":
                this.input.data.derivation = undefined;
                break;
            case "Root":
                this.input.data.derivation = { rootId: 0 };
                break;
            case "Verb":
                this.input.data.derivation = { type: WordVerbDerivationType.VerbalNoun, verbId: 0 };
                break;
            case "Word":
                this.input.data.derivation = { refWordId: 0, relationType: WordWordDerivationType.Feminine };
                break;
        }
        this.input.onDataChanged();
    }

    private OnGenderChanged(newValue: boolean)
    {
        this.input.data.isMale = newValue;
        this.input.onDataChanged();
    }

    private OnRootDerivationDataChanged(newValue: number)
    {
        this.input.data.derivation = {
            rootId: newValue
        };
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