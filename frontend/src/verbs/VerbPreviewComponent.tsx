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

import { Anchor, Component, Injectable, JSX_CreateElement, ProgressSpinner } from "acfrontend";
import { FullWordData, RootOverviewData, VerbData } from "../../dist/api";
import { APIService } from "../services/APIService";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { RenderTranslations } from "../shared/translations";
import { ConjugationService } from "../services/ConjugationService";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { Stem1DataToStem1Context, Stem1DataToStem1ContextOptional } from "./model";
import { Gender, Mood, Numerus, Person, Tense, Voice } from "openarabicconjugation/src/Definitions";
import { CachedAPIService, FullVerbData } from "../services/CachedAPIService";
import { _TODO_CheckConjugation } from "./_ConjugationCheck";
import { ModernStandardArabicStem1ContextType } from "openarabicconjugation/src/DialectsMetadata";
import { DialectsService } from "../services/DialectsService";
import { VerbConjugationService } from "../services/VerbConjugationService";

@Injectable
export class VerbPreviewComponent extends Component<{ root: RootOverviewData; verbData: VerbData }>
{
    constructor(private apiService: APIService, private conjugationService: ConjugationService, private dialectsService: DialectsService,
        private verbConjugationService: VerbConjugationService)
    {
        super();

        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        const verbData = this.input.verbData;
        const root = new VerbRoot(this.input.root.radicals);
        const dialectType = this.dialectsService.MapIdToType(verbData.dialectId);
        const stem1ctx = Stem1DataToStem1ContextOptional(dialectType, root.DeriveDeducedVerbConjugationScheme(), verbData.stem1Context);
        const conjugated = this.verbConjugationService.CreateDisplayVersionOfVerb(this.input.root.radicals, this.input.verbData);
        const conjugationReference = this.conjugationService.Conjugate(dialectType, this.input.root.radicals, 1, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, Stem1DataToStem1Context(dialectType, root.DeriveDeducedVerbConjugationScheme(), ModernStandardArabicStem1ContextType.RegularOrHollow_PastI_PresentI));
        const verbPresentation = (verbData.stem === 1) ? this.conjugationService.VocalizedToString(conjugated) : RenderWithDiffHighlights(conjugated, conjugationReference);

        const check = _TODO_CheckConjugation(dialectType, root, {
            gender: Gender.Male,
            voice: Voice.Active,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: verbData.stem as any,
            stem1Context: stem1ctx,
        });

        return <div className="border border-3 rounded-2 p-2 my-2 shadow-sm">
            {check}
            <h4>
                <Anchor route={"/verbs/" + verbData.id}>
                    {this.dialectsService.GetDialect(verbData.dialectId).emojiCodes}
                    <StemNumberComponent rootType={root.type} stem={verbData.stem} />:
                    {verbPresentation}
                </Anchor>
            </h4>
            {RenderTranslations(verbData.translations)}
            {this.RenderNouns()}
        </div>;
    }

    //Private state
    private derivedWords: FullWordData[] | null;

    //Private methods
    private RenderNoun(derivedWord: FullWordData)
    {
        return <div className="row">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word}</h6>
                {RenderTranslations(derivedWord.functions[0].translations)}
            </div>
        </div>;
    }

    private RenderNouns()
    {
        if(this.derivedWords === null)
            return <ProgressSpinner />;
        if(this.derivedWords.length === 0)
            return null;

        return <div className="mt-3">
            {this.derivedWords.map(this.RenderNoun.bind(this))}
        </div>;
    }

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.verbs.words.get({ verbId: this.input.verbData.id });
        this.derivedWords = response.data;
    }
}

@Injectable
export class VerbIdPreviewComponent extends Component<{ verbId: number }>
{
    constructor(private cachedAPIService: CachedAPIService)
    {
        super();

        this.data = null;
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <VerbPreviewComponent root={this.data.rootData} verbData={this.data.verbData} />;
    }

    //State
    private data: FullVerbData | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        this.data = await this.cachedAPIService.QueryFullVerbData(this.input.verbId);
    }
}