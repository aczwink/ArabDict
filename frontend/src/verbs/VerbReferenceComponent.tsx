/**
 * OpenArabDictViewer
 * Copyright (C) 2024-2025 Amir Czwink (amir130@hotmail.de)
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

import { Injectable, Component, Anchor, ProgressSpinner, JSX_CreateElement } from "acfrontend";
import { RootOverviewData, VerbData } from "../../dist/api";
import { APIService } from "../services/APIService";
import { ConjugationService } from "../services/ConjugationService";
import { Stem1DataToStem1ContextOptional } from "./model";
import { Gender, Numerus, Person, Tense, Voice } from "openarabicconjugation/src/Definitions";
import { DialectsService } from "../services/DialectsService";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { DialectType } from "openarabicconjugation/src/Dialects";

@Injectable
export class VerbReferenceComponent extends Component<{ root: RootOverviewData; verbData: VerbData }>
{
    constructor(private conjugationService: ConjugationService, private dialectsService: DialectsService)
    {
        super();
    }
    
    protected Render(): RenderValue
    {
        const verbData = this.input.verbData;
        const dialectType = this.dialectsService.MapIdToType(verbData.dialectId);
        const root = new VerbRoot(this.input.root.radicals);
        const conjugated = this.conjugationService.ConjugateToString(dialectType, root, {
            gender: Gender.Male,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: verbData.stem as any,
            stem1Context: Stem1DataToStem1ContextOptional(DialectType.ModernStandardArabic, root.type, verbData.stem1Context),
            voice: Voice.Active
        });

        return <Anchor route={"/verbs/" + verbData.id}>{conjugated}</Anchor>;
    }
}

@Injectable
export class VerbIdReferenceComponent extends Component<{ verbId: number; }>
{
    constructor(private apiService: APIService)
    {
        super();

        this.rootData = null;
        this.verbData = null;
    }

    protected Render(): RenderValue
    {
        if( (this.verbData === null) || (this.rootData === null) )
            return <ProgressSpinner />;

        return <VerbReferenceComponent root={this.rootData} verbData={this.verbData} />;
    }

    //Private state
    private rootData: RootOverviewData | null;
    private verbData: VerbData | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.verbs.get({ verbId: this.input.verbId });
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");

        const response2 = await this.apiService.roots._any_.get(response.data.rootId);
        if(response2.statusCode !== 200)
            throw new Error("TODO: implement me");

        this.rootData = response2.data;
        this.verbData = response.data;
    }
}