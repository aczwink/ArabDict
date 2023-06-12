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

import { Component, FormField, Injectable, JSX_CreateElement, LineEdit } from "acfrontend";
import { ConjugationService } from "./ConjugationService";

@Injectable
export class WordAnalysisComponent extends Component
{    
    constructor(private conjugationService: ConjugationService)
    {
        super();

        this.filter = "";
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            <h3>Analyze conjugated verb</h3>
            <FormField title="Verb" description="Any conjugation allowed">
                <LineEdit value={this.filter} onChanged={newValue => this.filter = newValue} />
            </FormField>
            <button type="button" onclick={this.LoadData.bind(this)}>Analyze</button>

            {this.RenderTable()}
        </fragment>;
    }

    //Private state
    private filter: string;

    //Private methods
    private LoadData()
    {
        this.conjugationService.AnalyzeConjugation(this.filter);
    }

    private RenderTable()
    {
        return "TODO";
    }
}