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

import { Component, FormField, Injectable, JSX_CreateElement, NumberSpinner, ProgressSpinner, Select } from "acfrontend";
import { WordVerbDerivationData, WordVerbDerivationType } from "../../dist/api";
import { ConjugationService } from "../services/ConjugationService";
import { APIService } from "../services/APIService";
import { Stem1DataToStem1ContextOptional } from "../verbs/model";
import { Stem1Context } from "arabdict-domain/src/Definitions";

interface WordVerbDerivationEditorInput
{
    derivation: WordVerbDerivationData;
    onUpdateWord: (newWord: string) => void;
    onDataChanged: () => void;
    word: string;
}

interface CurrentVerbData
{
    rootRadicals: string;
    stem: number;
    stem1Context?: Stem1Context;
}

@Injectable
export class WordVerbDerivationEditorComponent extends Component<WordVerbDerivationEditorInput>
{
    constructor(private conjugationService: ConjugationService, private apiService: APIService)
    {
        super();
        this.verbalNounChoices = [];
        this.currentVerb = null;
    }
    
    protected Render(): RenderValue
    {
        const verbClass = (this.currentVerb === null) ? "is-invalid" : "is-valid";
        return <fragment>
            <FormField title="Verb id">
                <NumberSpinner className={verbClass} value={this.input.derivation.verbId} step={1} onChanged={this.OnVerbIdChanged.bind(this)} />
            </FormField>
            <FormField title="Type">
                <Select onChanged={this.OnDerivationTypeChanged.bind(this)}>
                    <option selected={this.input.derivation.type === WordVerbDerivationType.VerbalNoun} value={0}>Verbal noun الْمَصَادِر</option>
                    <option selected={this.input.derivation.type === WordVerbDerivationType.ActiveParticiple} value={1}>Active Participle</option>
                    <option selected={this.input.derivation.type === WordVerbDerivationType.PassiveParticiple} value={2}>Passive Participle</option>
                    <option selected={this.input.derivation.type === WordVerbDerivationType.Unknown} value={3}>Other / Unknown</option>
                </Select>
            </FormField>
            {this.RenderVerbalNounSelector()}
        </fragment>;
    }

    //Private state
    private verbalNounChoices: string[];
    private currentVerb: CurrentVerbData | null;

    //Private methods
    private RenderVerbalNounSelector()
    {
        if(this.input.derivation.type !== WordVerbDerivationType.VerbalNoun)
            return null;
        if(this.currentVerb === null)
            return <ProgressSpinner />;

        return <FormField title="Word">
            <Select onChanged={newValue => this.input.onUpdateWord(newValue[0])}>
                {this.verbalNounChoices.map(x => <option selected={this.input.word === x}>{x}</option>)}
            </Select>
        </FormField>;
    }

    private async RequestVerbData()
    {
        const response = await this.apiService.verbs.get({ verbId: this.input.derivation.verbId });
        if(response.statusCode !== 200)
        {
            alert("Verb does not exist");
            return;
        }

        const response2 = await this.apiService.roots._any_.get(response.data.rootId);
        if(response2.statusCode !== 200)
            throw new Error("TODO: implement me");

        this.SetCurrentVerb({
            rootRadicals: response2.data.radicals,
            stem: response.data.stem,
            stem1Context: Stem1DataToStem1ContextOptional(response.data.stem1Data)
        });
    }

    private SetCurrentVerb(newValue: CurrentVerbData)
    {
        this.currentVerb = newValue;
        this.verbalNounChoices = this.conjugationService.GenerateAllPossibleVerbalNouns(newValue.rootRadicals, newValue.stem);

        switch(this.input.derivation.type)
        {
            case WordVerbDerivationType.ActiveParticiple:
            {
                const word = this.conjugationService.ConjugateParticiple(this.currentVerb.rootRadicals, this.currentVerb.stem, "active", this.currentVerb.stem1Context);
                this.input.onUpdateWord(this.conjugationService.VocalizedToString(word));
            }
            break;
            case WordVerbDerivationType.PassiveParticiple:
            {
                const word = this.conjugationService.ConjugateParticiple(this.currentVerb.rootRadicals, this.currentVerb.stem, "passive", this.currentVerb.stem1Context);
                this.input.onUpdateWord(this.conjugationService.VocalizedToString(word));
            }
            break;
        }
    }

    //Event handlers
    private OnDerivationTypeChanged(newValue: string[])
    {
        switch(newValue[0])
        {
            case "0":
                this.input.derivation.type = WordVerbDerivationType.VerbalNoun;
                if(this.verbalNounChoices.length === 1)
                    this.input.onUpdateWord(this.verbalNounChoices[0]);
                else
                    this.input.onDataChanged();
                break;
            case "1":
                this.input.derivation.type = WordVerbDerivationType.ActiveParticiple;
                if(this.currentVerb === null)
                    this.input.onDataChanged();
                else
                {
                    const word = this.conjugationService.ConjugateParticiple(this.currentVerb.rootRadicals, this.currentVerb.stem, "active", this.currentVerb.stem1Context);
                    this.input.onUpdateWord(this.conjugationService.VocalizedToString(word));
                }
                break;
            case "2":
                this.input.derivation.type = WordVerbDerivationType.PassiveParticiple;
                if(this.currentVerb === null)
                    this.input.onDataChanged();
                else
                {
                    const word = this.conjugationService.ConjugateParticiple(this.currentVerb.rootRadicals, this.currentVerb.stem, "passive", this.currentVerb.stem1Context);
                    this.input.onUpdateWord(this.conjugationService.VocalizedToString(word));
                }
                break;
            case "3":
                this.input.derivation.type = WordVerbDerivationType.Unknown;
                this.input.onDataChanged();
                break;
        }
    }

    OnInitiated(): void
    {
        this.RequestVerbData();
    }

    private OnVerbIdChanged(newValue: number)
    {
        this.input.derivation.verbId = newValue;
        this.currentVerb = null;
        this.verbalNounChoices = [];
        this.input.onDataChanged();

        this.RequestVerbData();
    }
}