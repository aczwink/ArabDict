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

import { Component, FormField, JSX_CreateElement, SingleSelect } from "acfrontend";
import { VerbStem } from "arabdict-domain/src/VerbStem";

export interface Stem1ContextData
{
    stem1MiddleRadicalTashkil: string;
    stem1MiddleRadicalTashkilPresent: string;
}

export class VerbEditorComponent extends Component<{ verb: VerbStem; stem: number; stem1Context: Stem1ContextData; onChanged: () => void }>
{    
    protected Render(): RenderValue
    {
        const verb = this.input.verb;
        const past = verb.Conjugate("perfect", "active", "male", "third", "singular");
        const present = verb.Conjugate("present", "active", "male", "third", "singular");

        return <fragment>
            {this.RenderStem1TashkilSelect()}
            
            Preview: {past} / {present}
        </fragment>;
    }

    //Private methods
    private RenderStem1TashkilSelect()
    {
        if(this.input.stem != 1)
            return null;

        return <fragment>
            {this.RenderTashkilSelect("past", this.input.stem1Context.stem1MiddleRadicalTashkil, newValue => {this.input.stem1Context.stem1MiddleRadicalTashkil = newValue; this.input.onChanged();})}
            {this.RenderTashkilSelect("present", this.input.stem1Context.stem1MiddleRadicalTashkilPresent, newValue => {this.input.stem1Context.stem1MiddleRadicalTashkilPresent = newValue; this.input.onChanged();})}
        </fragment>;
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