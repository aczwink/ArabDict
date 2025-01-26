/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { BootstrapIcon, Component, FormField, Injectable, JSX_CreateElement, JSX_Fragment, NumberSpinner, Select, SingleSelect } from "acfrontend";
import { TranslationEntry, VerbRelation, WordRelationshipType } from "../../dist/api";
import { TranslationsEditorComponent } from "../shared/TranslationsEditorComponent";
import { ConjugationService } from "../services/ConjugationService";
import { RootType, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Gender, Mood, Numerus, Person, Stem1Context, StemlessConjugationParams } from "arabdict-domain/src/Definitions";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { WordRelationshipTypeToString } from "../shared/words";
import { DialectSelectionComponent } from "../shared/DialectSelectionComponent";
import { DialectsService } from "../services/DialectsService";
import { DialectMetadata } from "arabdict-domain/src/DialectsMetadata";
import { GenderToString, NumerusToString, PersonToString, TenseToString } from "arabdict-domain/src/Util";

export interface VerbEditorData
{
    dialectId: number;
	stem: number;
	stem1Context?: Stem1Context;
	translations: TranslationEntry[];
	related: VerbRelation[];
}

@Injectable
export class VerbEditorComponent extends Component<{ data: VerbEditorData; rootRadicals: string; onChanged: () => void }>
{
    constructor(private conjugatorService: ConjugationService, private dialectsService: DialectsService)
    {
        super();
    }

    protected Render(): RenderValue
    {
        const root = new VerbRoot(this.input.rootRadicals);
        const stems = root.type === RootType.Quadriliteral ? [1, 2, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return <fragment>
            <FormField title="Stem">
                <Select onChanged={this.OnStemChanged.bind(this)}>
                    {stems.map(x => <option value={x} selected={this.input.data.stem === x}><StemNumberComponent rootType={root.type} stem={x} /></option>)}
                </Select>
            </FormField>
            
            {this.RenderVerbConfig()}
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

    private RenderTashkilHelp(stem1Ctx: Stem1Context | undefined, requiredContext?: StemlessConjugationParams)
    {
        if( requiredContext !== undefined )
        {
            const dialectType = this.dialectsService.MapIdToType(this.input.data.dialectId);
            const root = new VerbRoot(this.input.rootRadicals);
            const conj = this.conjugatorService.ConjugateToString(dialectType, root, {
                ...requiredContext,
                stem: this.input.data.stem as any,
                stem1Context: stem1Ctx
            });

            const parts = [TenseToString(requiredContext.tense), PersonToString(requiredContext.person) + " person", GenderToString(requiredContext.gender), NumerusToString(requiredContext.numerus)];
            return parts.join(" ") + " " + conj;
        }

        return null;
    }

    private RenderChoice(rootType: RootType, stem1Ctx: string, requiredContext: StemlessConjugationParams | undefined, meta: DialectMetadata<string>)
    {
        const ctx = meta.CreateStem1Context(rootType, stem1Ctx);
        return this.RenderConjugation(ctx, requiredContext, meta);
    }

    private RenderConjugation(stem1Ctx: Stem1Context | undefined, requiredContext: StemlessConjugationParams | undefined, meta: DialectMetadata<string>)
    {
        const dialectType = this.dialectsService.MapIdToType(this.input.data.dialectId);
        const past = this.conjugatorService.ConjugateToStringArgs(dialectType, this.input.rootRadicals, this.input.data.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1Ctx);
        const present = this.conjugatorService.ConjugateToStringArgs(dialectType, this.input.rootRadicals, this.input.data.stem, "present", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1Ctx);

        return <span style="white-space: pre;">
            Past: {past}
            {"\t"}
            Present: {present}
            {"\t"}
            {this.RenderTashkilHelp(stem1Ctx, requiredContext)}
        </span>;
    }

    private RenderTashkilChoice()
    {
        if(this.input.data.dialectId === 0)
            return null;

        const root = new VerbRoot(this.input.rootRadicals);
        const meta = this.dialectsService.GetDialectMetaData(this.input.data.dialectId);
        if(this.input.data.stem !== 1)
            return this.RenderTashkilField(root.type, meta, [], undefined, 0, () => null);

        const choices = meta.GetStem1ContextChoices(root);
        const selectedIndex = choices.types.indexOf(this.input.data.stem1Context?.type ?? "");
        const validatedIndex = (selectedIndex === -1) ? 0 : selectedIndex;

        return this.RenderTashkilField(root.type, meta, choices.types, choices.requiredContext, validatedIndex, newValue =>
            {
                this.input.data.stem1Context = meta.CreateStem1Context(root.type, newValue);
                this.ValidateStem1Context();
                this.DataChanged();
            }
        );
    }

    private RenderTashkilField(rootType: RootType, meta: DialectMetadata<string>, choices: string[], requiredContext: StemlessConjugationParams | undefined, selectedIndex: number, onChanged: (newValue: string) => void)
    {
        return <div className="col">
            <FormField title={"Tashkil"}>
                {this.RenderTashkilSelect(rootType, meta, choices, requiredContext, selectedIndex, onChanged)}
            </FormField>
        </div>;
    }

    private RenderTashkilSelect(rootType: RootType, meta: DialectMetadata<string>, choices: string[], requiredContext: StemlessConjugationParams | undefined, selectedIndex: number, onChanged: (newValue: string) => void)
    {
        if(choices.length === 0)
            return <div>{this.RenderConjugation(this.input.data.stem1Context, requiredContext, meta)}</div>;
        if(choices.length === 1)
            return <div>{this.RenderChoice(rootType, choices[0], requiredContext, meta)}</div>

        return <SingleSelect onSelectionChanged={newIndex => onChanged(choices[newIndex])} selectedIndex={selectedIndex}>
            {choices.map(x => this.RenderChoice(rootType, x, requiredContext, meta))}
        </SingleSelect>;
    }

    private RenderVerbConfig()
    {
        return <div className="row">
            <div className="col">
                <FormField title="Dialect">
                    <DialectSelectionComponent dialectId={this.input.data.dialectId} onValueChanged={this.OnDialectChanged.bind(this)} />
                </FormField>
            </div>
            {this.RenderTashkilChoice()}
        </div>;
    }

    private ValidateStem1Context()
    {
        if(this.input.data.stem !== 1)
        {
            this.input.data.stem1Context = undefined;
            return;
        }

        const root = new VerbRoot(this.input.rootRadicals);
        const meta = this.dialectsService.GetDialectMetaData(this.input.data.dialectId);
        const choices = meta.GetStem1ContextChoices(root);

        if(this.input.data.stem1Context === undefined)
        {
            this.input.data.stem1Context = meta.CreateStem1Context(root.type, choices.types[0]);
            this.DataChanged();
        }

        const ctx = this.input.data.stem1Context;

        const r2choice = choices.types.indexOf(ctx.type);
        if(r2choice === undefined)
        {
            this.input.data.stem1Context = meta.CreateStem1Context(root.type, choices.types[0]);
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

    private OnDialectChanged(dialectId: number)
    {
        this.input.data.dialectId = dialectId;
        this.ValidateStem1Context();
        this.DataChanged();
    }

    override OnInitiated(): void
    {
        if(this.input.data.dialectId !== 0)
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