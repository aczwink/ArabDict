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
import { RootCreationData, VerbData, WordData } from "../../dist/api";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";

function RenderWithDiffHighlights(word: string, reference: string)
{
    const result = [];

    while( (word.length > 0) && (reference.length > 0) )
    {
        if(word[0] === reference[0])
        {
            result.push(word[0]);
            word = word.substring(1);
            reference = reference.substring(1);
        }
        else if(word.length > reference.length)
        {
            result.push(<span className="text-danger">{word[0]}</span>);
            word = word.substring(1);
        }
        else
        {
            reference = reference.substring(1);
        }
    }

    return result;
}

@Injectable
export class VerbComponent extends Component<{ root: RootCreationData; verbData: VerbData }>
{
    constructor(private apiService: APIService)
    {
        super();

        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        const verbData = this.input.verbData;
        const verb = CreateVerb(this.input.root.radicals, verbData.stem, verbData.stem1MiddleRadicalTashkil);
        const conjugated = verb.Conjugate("perfect", "3rd-singular-masulin");
        const verbPresentation = (verbData.stem === 1) ? conjugated : RenderWithDiffHighlights(conjugated, CreateVerb(this.input.root.radicals, 1, KASRA).Conjugate("perfect", "3rd-singular-masulin"));

        return <div className="border border-3 rounded-2 p-2 my-2 shadow-sm">
            <h4>
                <Anchor route={"/verbs/" + verbData.id}>
                    <RomanNumberComponent num={verbData.stem} />:
                    {verbPresentation}
                </Anchor>
            </h4>
            {verbData.translation}
            {this.RenderNouns()}
        </div>;
    }

    //Private state
    private derivedWords: WordData[] | null;

    //Private methods
    private RenderNoun(derivedWord: WordData)
    {
        return <div className="row">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word}</h6>
                {derivedWord.translation}
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