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

import { BootstrapIcon, Component, FormField, JSX_CreateElement, NumberSpinner, Select, Textarea } from "acfrontend";
import { WordRelation, WordRelationType } from "../../dist/api";

export class WordRelationsEditorComponent extends Component<{ relations: WordRelation[]; onDataChanged: () => void; }>
{;
    protected Render(): RenderValue
    {
        return <FormField title="Outgoing relations">
            <fragment>
                {this.input.relations.map(this.RenderRelation.bind(this))}
                <button type="button" className="btn btn-secondary" onclick={this.OnAddEntry.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
            </fragment>
        </FormField>;
    }

    //Private methods
    private RenderRelation(wordRelation: WordRelation)
    {
        const relationships = [
            WordRelationType.Feminine,
            WordRelationType.Plural
        ];

        return <div className="row mb-2">
            <div className="col-auto">
                <Select onChanged={this.OnRelationshipTypeChanged.bind(this, wordRelation)}>
                    {relationships.map(x => <option selected={x === wordRelation.relationType} value={x}>{this.RenderRelationshipType(x) + " of"}</option>)}
                </Select>
            </div>
            <div className="col">
                <NumberSpinner value={wordRelation.refWordId} step={1} onChanged={this.OnReferencedWordIdChanged.bind(this, wordRelation)} />
            </div>
        </div>;
    }
    
    private RenderRelationshipType(relationshipType: WordRelationType)
    {
        switch(relationshipType)
        {
            case WordRelationType.Feminine:
                return "feminine version";
            case WordRelationType.Plural:
                return "plural";
        }
    }

    //Event handlers
    private OnAddEntry()
    {
        this.input.relations.push({
            refWordId: 0,
            relationType: WordRelationType.Feminine
        });
        this.input.onDataChanged();
    }

    private OnRelationshipTypeChanged(wordRelation: WordRelation, newValue: string[])
    {
        wordRelation.relationType = parseInt(newValue[0]);
        this.input.onDataChanged();
    }

    private OnReferencedWordIdChanged(wordRelation: WordRelation, newValue: number)
    {
        wordRelation.refWordId = newValue;
        this.input.onDataChanged();
    }
}