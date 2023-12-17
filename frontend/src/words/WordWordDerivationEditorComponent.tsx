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

import { Component, FormField, JSX_CreateElement, NumberSpinner, Select } from "acfrontend";
import { WordWordDerivationLink, WordWordDerivationType } from "../../dist/api";
import { WordDerivationTypeFromWordToString } from "../shared/words";

export class WordWordDerivationEditorComponent extends Component<{ derivationLink: WordWordDerivationLink; onDataChanged: () => void; }>
{;
    protected Render(): RenderValue
    {
        const relationships = [
            WordWordDerivationType.Colloquial,
            WordWordDerivationType.Extension,
            WordWordDerivationType.Feminine,
            WordWordDerivationType.Nisba,
            WordWordDerivationType.Plural,
        ];

        const wordRelation = this.input.derivationLink;
        return <div className="row mb-2">
            <div className="col-auto">
                <FormField title="Derivation type">
                    <Select onChanged={this.OnRelationshipTypeChanged.bind(this, wordRelation)}>
                        {relationships.map(x => <option selected={x === wordRelation.relationType} value={x}>{WordDerivationTypeFromWordToString(x) + " of"}</option>)}
                    </Select>
                </FormField>
            </div>
            <div className="col">
                <FormField title="Source word id">
                    <NumberSpinner value={wordRelation.refWordId} step={1} onChanged={this.OnReferencedWordIdChanged.bind(this, wordRelation)} />
                </FormField>
            </div>
        </div>;
    }

    //Event handlers
    private OnRelationshipTypeChanged(wordRelation: WordWordDerivationLink, newValue: string[])
    {
        wordRelation.relationType = parseInt(newValue[0]);
        this.input.onDataChanged();
    }

    private OnReferencedWordIdChanged(wordRelation: WordWordDerivationLink, newValue: number)
    {
        wordRelation.refWordId = newValue;
        this.input.onDataChanged();
    }
}