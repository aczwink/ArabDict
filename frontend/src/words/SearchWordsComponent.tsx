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

import { BootstrapIcon, CheckBox, Component, FormField, Injectable, JSX_CreateElement, LineEdit, PaginationComponent, ProgressSpinner, RouterButton, Select } from "acfrontend";
import { APIService } from "../APIService";
import { WordOverviewComponent } from "./WordOverviewComponent";
import { AnyWordData, WordType } from "../../dist/api";
import { WordTypeToText, allWordTypes } from "../shared/words";

@Injectable
export class SearchWordsComponent extends Component
{
    constructor(private apiService: APIService)
    {
        super();

        this.wordFilter = "";
        this.translationFilter = "";
        this.verbDerivedOrNot = null;
        this.includeRelated = true;
        this.wordType = null;

        this.data = [];

        this.offset = 0;
        this.size = 25;
        this.totalCount = 0;
    }
    
    protected Render(): RenderValue
    {
        return <fragment>
            {this.RenderFilterForm()}
            {this.RenderTable()}
            <br />
            <RouterButton route="words/add" className="btn btn-primary"><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>
    }

    //Private state
    private wordFilter: string;
    private translationFilter: string;
    private verbDerivedOrNot: boolean | null;
    private includeRelated: boolean;
    private wordType: WordType | null;

    private data: AnyWordData[] | null;

    private offset: number;
    private size: number;
    private totalCount: number;

    //Private methods
    private async ExecuteSearch()
    {
        this.data = null;
        const response = await this.apiService.words.get({
            wordFilter: this.wordFilter,
            verbDerivedOrNot: this.verbDerivedOrNot,
            includeRelated: this.includeRelated,
            translation: this.translationFilter,
            type: this.wordType,
            offset: this.offset,
            limit: this.size
        });
        this.data = response.data.words;
        this.totalCount = response.data.totalCount;
    }

    private RenderFilterForm()
    {
        return <div className="box">
            <form onsubmit={this.OnSubmit.bind(this)}>
                <div className="row">
                    <div className="col">
                        <FormField title="Word" description="Filter based on parts of the word">
                            <LineEdit value={this.wordFilter} onChanged={newValue => this.wordFilter = newValue} />
                        </FormField>
                    </div>
                    <div className="col">
                        <FormField title="Translation" description="Filter based on parts of the translation">
                            <LineEdit value={this.translationFilter} onChanged={newValue => this.translationFilter = newValue} />
                        </FormField>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FormField title="Word type">
                            <Select onChanged={this.OnWordTypeChanged.bind(this)}>
                                <option selected={this.wordType === null} value={"null"}>Any</option>
                                {allWordTypes.map(x => <option selected={x === this.wordType} value={x}>{WordTypeToText(x)}</option>)}
                            </Select>
                        </FormField>
                    </div>
                    <div className="col">
                        <FormField title="Derived from verb?">
                            <fragment>
                                <br />
                                <label>
                                    <input type="radio" checked={this.verbDerivedOrNot === null} onclick={() => this.verbDerivedOrNot = null} />
                                    Include both
                                </label>
                                <label>
                                    <input type="radio" checked={this.verbDerivedOrNot === true} onclick={() => this.verbDerivedOrNot = true} />
                                    Only
                                </label>
                                <label>
                                    <input type="radio" checked={this.verbDerivedOrNot === false} onclick={() => this.verbDerivedOrNot = false} />
                                    Omit
                                </label>
                            </fragment>
                        </FormField>
                    </div>
                    <div className="col">
                        <FormField title="Include related words">
                            <CheckBox value={this.includeRelated} onChanged={newValue => this.includeRelated = newValue} />
                        </FormField>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
        </div>;
    }

    private RenderTable()
    {
        if(this.data === null)
            return <ProgressSpinner />;
        if(this.data.length === 0)
            return "nothing found";

        return <fragment>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Translation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.data!.map(x => <WordOverviewComponent word={x} />)}
                </tbody>
            </table>
            <PaginationComponent count={this.totalCount} offset={this.offset} size={this.size} onOffsetChanged={this.OnOffsetChanged.bind(this)} onSizeChanged={this.OnSizeChanged.bind(this)} />
        </fragment>;
    }

    //Event handlers
    private OnOffsetChanged(newValue: number)
    {
        this.offset = newValue;
        this.ExecuteSearch();
    }

    private OnSizeChanged(newValue: number)
    {
        this.size = newValue;
        this.ExecuteSearch();
    }

    private OnSubmit(event: Event)
    {
        event.preventDefault();
        this.ExecuteSearch();
    }

    private OnWordTypeChanged(newValue: string[])
    {
        const x = newValue[0];
        if(x === "null")
            this.wordType = null;
        else
            this.wordType = parseInt(newValue[0]);
    }
}