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

import { BootstrapIcon, CheckBox, Component, FormField, Injectable, JSX_CreateElement, NumberSpinner, Select, SingleSelect } from "acfrontend";
import { TranslationEntry, VerbRelation, WordRelationshipType } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { ConjugationService } from "../services/ConjugationService";
import { RootType, Stem1ContextChoiceTashkil, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Gender, Mood, Numerus, Person, Stem1Context, Tashkil } from "arabdict-domain/src/Definitions";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { WordRelationshipTypeToString } from "../shared/words";

export interface VerbEditorData
{
	stem: number;
	stem1Context?: Stem1Context;
	translations: TranslationEntry[];
	related: VerbRelation[];
}

@Injectable
export class VerbEditorComponent extends Component<{ data: VerbEditorData; rootRadicals: string; onChanged: () => void }>
{
    constructor(private conjugatorService: ConjugationService)
    {
        super();
    }

    protected Render(): RenderValue
    {
        const root = new VerbRoot(this.input.rootRadicals);
        const stems = root.type === RootType.Quadriliteral ? [1, 2, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 10];

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={this.OnStemChanged.bind(this)}>
                    {stems.map(x => <option value={x} selected={this.input.data.stem === x}><StemNumberComponent rootType={root.type} stem={x} /></option>)}
                </Select>
            </FormField>
            
            <div className="row">
                <div className="col">{this.RenderTashkilChoice()}</div>
                <div className="col">{this.RenderStem1Context()}</div>
            </div>
            <TranslationsEditorComponent translations={this.input.data.translations} onDataChanged={this.DataChanged.bind(this)} />
            {this.RenderRelations()}
        </fragment>;
    }

    //Private methods
    private DataChanged()
    {
        this.input.onChanged();
    }

    private RenderRelation(relation: VerbRelation)
    {
        const relationships = [
            WordRelationshipType.Synonym
        ];

        return <div className="row mb-2">
            <div className="col-auto">
                <FormField title="Derivation type">
                    <Select onChanged={this.OnVerbRelationshipTypeChanged.bind(this, relation)}>
                        {relationships.map(x => <option selected={x === relation.relationType} value={x}>{WordRelationshipTypeToString(x) + " of"}</option>)}
                    </Select>
                </FormField>
            </div>
            <div className="col">
                <FormField title="Related word id">
                    <NumberSpinner value={relation.relatedVerbId} step={1} onChanged={this.OnRelatedVerbIdChanged.bind(this, relation)} />
                </FormField>
            </div>
            <div className="col-auto">
                <a href="#" className="link-danger" onclick={this.OnDeleteRelation.bind(this, relation)}><BootstrapIcon>trash</BootstrapIcon></a>
            </div>
        </div>;
    }

    private RenderRelations()
    {
        return <fragment>
            <hr />
            <h6>Relations</h6>
            {this.input.data.related.map(this.RenderRelation.bind(this))}
            <button className="btn btn-secondary" type="button" onclick={this.OnAddRelation.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
            <hr />
        </fragment>;
    }

    private RenderTashkilHelp()
    {
        const root = new VerbRoot(this.input.rootRadicals);

        const cond = ((root.type === RootType.Hollow) && (this.input.data.stem === 1))
            || ((root.type === RootType.SecondConsonantDoubled) && (this.input.data.stem === 1));

        if( cond )
        {
            const conj = this.conjugatorService.ConjugateToStringArgs(this.input.rootRadicals, this.input.data.stem, "perfect", "active", Gender.Male, Person.First, Numerus.Singular, Mood.Indicative, this.input.data.stem1Context);
            return "Perfect 1st person male singular: " + conj;
        }

        return null;
    }

    private RenderStem1Context()
    {
        const root = new VerbRoot(this.input.rootRadicals);

        if(this.input.data.stem === 1)
        {
            const choices = root.GetStem1ContextChoices();
            if(choices.soundOverride.length > 1)
                return this.RenderSoundOverride();
        }

        return null;
    }

    private RenderChoice(tashkil: Stem1ContextChoiceTashkil)
    {
        const stem1Ctx: Stem1Context = {
            middleRadicalTashkil: tashkil.past,
            middleRadicalTashkilPresent: tashkil.present,
            soundOverride: this.input.data.stem1Context!.soundOverride
        };
        return this.RenderConjugation(stem1Ctx);
    }

    private RenderConjugation(stem1Ctx?: Stem1Context)
    {
        const past = this.conjugatorService.ConjugateToStringArgs(this.input.rootRadicals, this.input.data.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1Ctx);
        const present = this.conjugatorService.ConjugateToStringArgs(this.input.rootRadicals, this.input.data.stem, "present", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1Ctx);

        return <span style="white-space: pre;">
            Past: {past}
            {"\t"}
            Present: {present}
            {"\t"}
            {this.RenderTashkilHelp()}
        </span>;
    }

    private RenderSoundOverride()
    {
        return <FormField title="Sound override" description="Some hollow verbs are actually conjugated as if they were strong verbs">
            <CheckBox value={this.input.data.stem1Context!.soundOverride} onChanged={newValue => { this.input.data.stem1Context!.soundOverride = newValue; this.DataChanged(); }} />
        </FormField>;
    }

    private RenderTashkilChoice()
    {
        if(this.input.data.stem !== 1)
            return this.RenderTashkilField([], 0, () => null);

        const root = new VerbRoot(this.input.rootRadicals);
        const choices = root.GetStem1ContextChoices();
        const selectedIndex = choices.r2options.findIndex(x => (x.past === this.input.data.stem1Context?.middleRadicalTashkil) && (x.present === this.input.data.stem1Context.middleRadicalTashkilPresent));
        const validatedIndex = (selectedIndex === -1) ? 0 : selectedIndex;

        return this.RenderTashkilField(choices.r2options, validatedIndex, newValue =>
            {
                this.input.data.stem1Context!.middleRadicalTashkil = newValue.past;
                this.input.data.stem1Context!.middleRadicalTashkilPresent = newValue.present;
                this.ValidateStem1Context();
                this.DataChanged();
            }
        );
    }

    private RenderTashkilField(choices: Stem1ContextChoiceTashkil[], selectedIndex: number, onChanged: (newValue: Stem1ContextChoiceTashkil) => void)
    {
        return <FormField title={"Tashkil"}>
            {this.RenderTashkilSelect(choices, selectedIndex, onChanged)}
        </FormField>
    }

    private RenderTashkilSelect(choices: Stem1ContextChoiceTashkil[], selectedIndex: number, onChanged: (newValue: Stem1ContextChoiceTashkil) => void)
    {
        if(choices.length === 0)
            return <div>{this.RenderConjugation(this.input.data.stem1Context)}</div>;
        if(choices.length === 1)
            return <div>{this.RenderChoice(choices[0])}</div>

        return <SingleSelect onSelectionChanged={newIndex => onChanged(choices[newIndex])} selectedIndex={selectedIndex}>
            {choices.map(x => this.RenderChoice(x))}
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
                middleRadicalTashkil: Tashkil.Fatha,
                middleRadicalTashkilPresent: Tashkil.Fatha,
                soundOverride: false
            };
        }

        const ctx = this.input.data.stem1Context;
        const root = new VerbRoot(this.input.rootRadicals);

        const choices = root.GetStem1ContextChoices();
        const r2choice = choices.r2options.find(x => (x.past === ctx.middleRadicalTashkil) && (x.present === ctx.middleRadicalTashkilPresent));
        if(r2choice === undefined)
        {
            ctx.middleRadicalTashkil = choices.r2options[0].past;
            ctx.middleRadicalTashkilPresent = choices.r2options[0].present;
            this.DataChanged();
        }
    }

    //Event handlers
    private OnAddRelation()
    {
        this.input.data.related.push({
            relatedVerbId: 0,
            relationType: WordRelationshipType.Synonym
        });
        this.DataChanged();
    }

    private OnDeleteRelation(relation: VerbRelation, event: Event)
    {
        event.preventDefault();
        
        this.input.data.related.Remove(this.input.data.related.indexOf(relation));
        this.DataChanged();
    }

    override OnInitiated(): void
    {
        this.ValidateStem1Context();
    }

    private OnRelatedVerbIdChanged(relation: VerbRelation, newValue: number)
    {
        relation.relatedVerbId = newValue;
        this.DataChanged();
    }

    private OnStemChanged(newValue: string[])
    {
        this.input.data.stem = parseInt(newValue[0]);
        this.ValidateStem1Context();
        this.DataChanged();
    }

    private OnVerbRelationshipTypeChanged(relation: VerbRelation, newValue: string[])
    {
        relation.relationType = parseInt(newValue[0]);
        this.DataChanged();
    }
}