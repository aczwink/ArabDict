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

import { Component, FormField, Injectable, JSX_CreateElement, Select, SingleSelect } from "acfrontend";
import { VerbUpdateData } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { ConjugationService } from "../ConjugationService";
import { Stem1Context } from "arabdict-domain/src/CreateVerb";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";

@Injectable
export class VerbEditorComponent extends Component<{ data: VerbUpdateData; rootRadicals: string; stem1ctx: Stem1Context; onChanged: () => void }>
{
    constructor(private conjugatorService: ConjugationService)
    {
        super();
    }

    protected Render(): RenderValue
    {
        const past = this.conjugatorService.Conjugate(this.input.rootRadicals, this.input.data.stem, "perfect", "active", "male", "third", "singular", this.input.stem1ctx);
        const present = this.conjugatorService.Conjugate(this.input.rootRadicals, this.input.data.stem, "present", "active", "male", "third", "singular", this.input.stem1ctx);

        const stems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={newValue => {this.input.data.stem = parseInt(newValue[0]); this.input.onChanged(); }}>
                    {stems.map(x => <option value={x} selected={this.input.data.stem === x}><RomanNumberComponent num={x} /></option>)}
                </Select>
            </FormField>
            
            {this.RenderStem1TashkilSelect()}
            <div className="row">
                <div className="col-auto">Preview:</div>
                <div className="col-auto">{past}</div>
                <div className="col-auto">/</div>
                <div className="col-auto">{present}</div>
            </div>

            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onChanged} />
        </fragment>;
    }

    //Private methods
    private RenderPresentSelect()
    {
        const data = this.input.data;
        return <div className="col">
            {this.RenderTashkilSelect("present", data.stem1MiddleRadicalTashkilPresent, newValue => {data.stem1MiddleRadicalTashkilPresent = newValue; this.input.onChanged();})}
        </div>;
    }

    private RenderStem1TashkilSelect()
    {
        if(this.input.data.stem != 1)
            return null;

        const data = this.input.data;
        const root = new VerbRoot(this.input.rootRadicals);

        return <div className="row">
            <div className="col">
                {this.RenderTashkilSelect("past", data.stem1MiddleRadicalTashkil, newValue => {data.stem1MiddleRadicalTashkil = newValue; this.input.onChanged();})}
            </div>
            {root.RequiresSecondStem1ContextParameter(data.stem1MiddleRadicalTashkil) ? this.RenderPresentSelect() : null}
        </div>;
    }

    private RenderTashkilSelect(tense: string, value: string, onChanged: (newValue: string) => void)
    {
        const tashkil = ["\u064E", "\u064F", "\u0650"];
        const tashkilDisplayName = ["فتحة", "ضمة", "كسرة"];

        return <FormField title={"Tashkil for middle radical (" + tense + ")"}>
            <SingleSelect onSelectionChanged={newIndex => onChanged(tashkil[newIndex])} selectedIndex={tashkil.indexOf(value)}>
                {tashkilDisplayName.map( (x, i) => x + ": " + tashkil[i])}
            </SingleSelect>
        </FormField>
    }
}