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
import { APIService } from "../services/APIService";
import { FullWordData, OpenArabDictVerbDerivationType } from "../../dist/api";
import { WordGenderToAbbreviation, WordMayHaveGender, WordTypeToAbbreviationText } from "../shared/words";

export class WordReferenceComponent extends Component<{ word: FullWordData; }>
{
    protected Render(): RenderValue
    {
        const x = this.input.word;

        return <fragment>
            <Anchor route={"/words/" + x.id}>{x.word}</Anchor>
            {" "}
            {this.TypeToString()}
            {this.RenderGender()}
        </fragment>;
    }

    //Private methods
    private RenderGender()
    {
        if(!WordMayHaveGender(this.input.word))
            return "";
        
        return <i>{WordGenderToAbbreviation(this.input.word.isMale)}</i>;
    }

    private TypeToString()
    {
        const word = this.input.word;
        if( (word.derivation !== undefined) && ("verbId" in word.derivation) )
        {
            switch(word.derivation.type)
            {
                case OpenArabDictVerbDerivationType.ActiveParticiple:
                    return "(active participle)";
                case OpenArabDictVerbDerivationType.PassiveParticiple:
                    return "(passive participle)";
                case OpenArabDictVerbDerivationType.VerbalNoun:
                    return "(verbal noun)";
            }
        }
        if(this.input.word.functions.length === 1)
            return WordTypeToAbbreviationText(word.functions[0].type);
        return null;
    }
}

@Injectable
export class WordIdReferenceComponent extends Component<{ wordId: number }>
{
    constructor(private apiService: APIService)
    {
        super();

        this.word = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.word === null)
            return <ProgressSpinner />;

        return <WordReferenceComponent word={this.word} />;
    }

    //Private state
    private word: FullWordData | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.words._any_.get(this.input.wordId);
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");
        this.word = response.data;
    }
}