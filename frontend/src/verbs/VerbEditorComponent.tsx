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

import { CheckBox, Component, FormField, Injectable, JSX_CreateElement, Select, SingleSelect } from "acfrontend";
import { Stem1Context, VerbUpdateData } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { ConjugationService } from "../ConjugationService";
import { RootType, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { DHAMMA, FATHA, KASRA, PRIMARY_TASHKIL } from "arabdict-domain/src/Definitions";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { Tense } from "arabdict-domain/src/rule_sets/msa/_legacy/VerbStem";

@Injectable
export class VerbEditorComponent extends Component<{ data: VerbUpdateData; rootRadicals: string; onChanged: () => void }>
{
    constructor(private conjugatorService: ConjugationService)
    {
        super();
    }

    protected Render(): RenderValue
    {
        const root = new VerbRoot(this.input.rootRadicals);
        const stems = root.type === RootType.Quadriliteral ? [1, 2] : [1, 2, 3, 4, 5, 6, 7, 8, 10];

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={this.OnStemChanged.bind(this)}>
                    {stems.map(x => <option value={x} selected={this.input.data.stem === x}><StemNumberComponent rootType={root.type} stem={x} /></option>)}
                </Select>
            </FormField>
            
            <div className="row">
                <div className="col">{this.RenderTashkilChoice("past")}</div>
                <div className="col">{this.RenderTashkilChoice("present")}</div>
                <div className="col">{this.RenderTashkilHelp()}</div>
                <div className="col">{this.RenderStem1Context()}</div>
            </div>
            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.input.onChanged} />
        </fragment>;
    }

    //Private methods
    private RenderTashkilHelp()
    {
        const root = new VerbRoot(this.input.rootRadicals);

        const cond = ((root.type === RootType.Hollow) && (this.input.data.stem === 1))
            || ((root.type === RootType.SecondConsonantDoubled) && (this.input.data.stem === 1));

        if( cond )
        {
            return <FormField title="Perfect 1st person male singular">
                <div>{this.conjugatorService.Conjugate(this.input.rootRadicals, this.input.data.stem, "perfect", "active", "male", "first", "singular", "indicative", this.input.data.stem1Context)}</div>
            </FormField>;
        }

        return null;
    }

    private RenderStem1Context()
    {
        const root = new VerbRoot(this.input.rootRadicals);

        if(this.input.data.stem === 1)
        {
            const choices = root.GetStem1ContextChoices(this.input.data.stem1Context!);
            if(choices.soundOverride.length > 1)
                return this.RenderSoundOverride();
        }

        return null;
    }

    private RenderChoice(tashkil: PRIMARY_TASHKIL, tense: Tense)
    {
        const tashkilDisplayName = {
            [FATHA]: "فتحة",
            [DHAMMA]: "ضمة",
            [KASRA]: "كسرة",
        };

        const stem1Ctx: Stem1Context = {
            middleRadicalTashkil: (tense === "perfect") ? tashkil : this.input.data.stem1Context!.middleRadicalTashkil,
            middleRadicalTashkilPresent: (tense === "present") ? tashkil : this.input.data.stem1Context!.middleRadicalTashkilPresent,
            soundOverride: this.input.data.stem1Context!.soundOverride
        };

        return tashkilDisplayName[tashkil] + "  " + tashkil + " : " + this.RenderConjugation(tense, stem1Ctx);
    }

    private RenderConjugation(tense: Tense, stem1Ctx?: Stem1Context)
    {
        const conjugation = this.conjugatorService.Conjugate(this.input.rootRadicals, this.input.data.stem, tense, "active", "male", "third", "singular", "indicative", stem1Ctx);
        return conjugation;
    }

    private RenderSoundOverride()
    {
        return <FormField title="Sound override" description="Some hollow verbs are actually conjugated as if they were strong verbs">
            <CheckBox value={this.input.data.stem1Context!.soundOverride} onChanged={newValue => { this.input.data.stem1Context!.soundOverride = newValue; this.input.onChanged(); }} />
        </FormField>;
    }

    private RenderTashkilChoice(tense: "past" | "present")
    {
        if(this.input.data.stem !== 1)
            return this.RenderTashkilField(tense, [], "", () => null);

        const root = new VerbRoot(this.input.rootRadicals);
        const choices = root.GetStem1ContextChoices(this.input.data.stem1Context!);

        const key = tense === "present" ? "middleRadicalTashkilPresent" : "middleRadicalTashkil";
        return this.RenderTashkilField(tense, choices[tense], this.input.data.stem1Context![key], newValue =>
            {
                this.input.data.stem1Context![key] = newValue;
                this.ValidateStem1Context();
                this.input.onChanged();
            }
        );
    }

    private RenderTashkilField(tense: string, choices: PRIMARY_TASHKIL[], value: string, onChanged: (newValue: string) => void)
    {
        const conjTense = (tense === "past") ? "perfect" : "present";
        return <FormField title={"Tashkil for middle radical (" + tense + ")"}>
            {this.RenderTashkilSelect(choices, conjTense, value, onChanged)}
        </FormField>
    }

    private RenderTashkilSelect(choices: PRIMARY_TASHKIL[], tense: Tense, value: string, onChanged: (newValue: string) => void)
    {
        if(choices.length === 0)
            return <div>{this.RenderConjugation(tense, this.input.data.stem1Context!)}</div>;
        if(choices.length === 1)
            return <div>{this.RenderChoice(choices[0], tense)}</div>

        return <SingleSelect onSelectionChanged={newIndex => onChanged(choices[newIndex])} selectedIndex={choices.indexOf(value as any)}>
            {choices.map(x => this.RenderChoice(x, tense))}
        </SingleSelect>;
    }

    private ValidateStem1Context()
    {
        if(this.input.data.stem !== 1)
        {
            this.input.data.stem1Context = undefined;
            return;
        }

        if(this.input.data.stem1Context === undefined)
        {
            this.input.data.stem1Context = {
                middleRadicalTashkil: FATHA,
                middleRadicalTashkilPresent: FATHA,
                soundOverride: false
            };
        }

        const ctx = this.input.data.stem1Context;
        const root = new VerbRoot(this.input.rootRadicals);

        const choices = root.GetStem1ContextChoices(ctx);
        if(choices.past.length === 0)
        {
            ctx.middleRadicalTashkil = "";
            this.input.onChanged();
        }
        else if(!choices.past.includes(ctx.middleRadicalTashkil as any))
        {
            ctx.middleRadicalTashkil = choices.past[0];
            this.input.onChanged();
        }

        if(choices.present.length === 0)
        {
            ctx.middleRadicalTashkilPresent = "";
            this.input.onChanged();
        }
        else if(!choices.present.includes(ctx.middleRadicalTashkilPresent as any))
        {
            ctx.middleRadicalTashkilPresent = choices.present[0];
            this.input.onChanged();
        }
    }

    //Event handlers
    override OnInitiated(): void
    {
        this.ValidateStem1Context();
    }

    private OnStemChanged(newValue: string[])
    {
        this.input.data.stem = parseInt(newValue[0]);
        this.ValidateStem1Context();
        this.input.onChanged();
    }
}