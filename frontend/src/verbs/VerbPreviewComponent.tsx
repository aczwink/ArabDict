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

import { Anchor, Component, Injectable, JSX_CreateElement, ProgressSpinner } from "acfrontend";
import { CreateVerb } from "arabdict-domain/src/CreateVerb";
import { KASRA } from "arabdict-domain/src/VerbStem";
import { RootCreationData, VerbData, VerbDerivedWordData } from "../../dist/api";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { RenderTranslations } from "../shared/translations";
import { ConjugationService } from "../ConjugationService";

@Injectable
export class VerbPreviewComponent extends Component<{ root: RootCreationData; verbData: VerbData }>
{
    constructor(private apiService: APIService, private conjugationService: ConjugationService)
    {
        super();

        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        const verbData = this.input.verbData;
        const conjugated = this.conjugationService.Conjugate(this.input.root.radicals, verbData.stem, "perfect", "active", "male", "third", "singular", { middleRadicalTashkil: verbData.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: verbData.stem1MiddleRadicalTashkilPresent });
        const verbPresentation = (verbData.stem === 1) ? conjugated : RenderWithDiffHighlights(conjugated, CreateVerb(this.input.root.radicals, 1, { middleRadicalTashkil: KASRA, middleRadicalTashkilPresent: "" }).Conjugate("perfect", "active", "male", "third", "singular"));

        return <div className="border border-3 rounded-2 p-2 my-2 shadow-sm">
            <h4>
                <Anchor route={"/verbs/" + verbData.id}>
                    <RomanNumberComponent num={verbData.stem} />:
                    {verbPresentation}
                </Anchor>
            </h4>
            {RenderTranslations(verbData.translations)}
            {this.RenderNouns()}
        </div>;
    }

    //Private state
    private derivedWords: VerbDerivedWordData[] | null;

    //Private methods
    private RenderNoun(derivedWord: VerbDerivedWordData)
    {
        return <div className="row">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word}</h6>
                {RenderTranslations(derivedWord.translations)}
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