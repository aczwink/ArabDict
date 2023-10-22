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
import { APIService } from "../APIService";
import { AnyWordData, UnderivedWordData } from "../../dist/api";
import { WordGenderToAbbreviation, WordTypeToAbbreviationText } from "../shared/words";

export class WordReferenceComponent extends Component<{ word: UnderivedWordData; }>
{
    protected Render(): RenderValue
    {
        const x = this.input.word;

        return <fragment>
            <Anchor route={"/words/" + x.id}>{x.word}</Anchor>
            {" " + this.TypeToString()}
            <i>{WordGenderToAbbreviation(x.type, x.isMale)}</i>
        </fragment>;
    }

    //Private methods
    private TypeToString()
    {
        const word = this.input.word;
        if( ("isVerbalNoun" in word) && (word.isVerbalNoun))
            return "(verbal noun)";
        return WordTypeToAbbreviationText(word.type);
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
    private word: AnyWordData | null;

    //Event handlers
    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.words._any_.get(this.input.wordId);
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");
        this.word = response.data;
    }
}