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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, RouterButton } from "acfrontend";
import { APIService } from "../APIService";
import { TranslationEntry, UnderivedWordData } from "../../dist/api";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { WordTypeToAbbreviationText } from "../shared/words";
import { DialectToEmoji } from "../shared/dialects";
import { RenderTranslations } from "../shared/translations";

@Injectable
export class SearchWordsComponent extends Component
{
    constructor(private apiService: APIService)
    {
        super();

        this.data = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            {this.RenderTable()}
            <RouterButton route="underived_words/add" className="btn btn-primary"><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </fragment>
    }

    //Private state
    private data: UnderivedWordData[] | null;

    //Private methods
    private async LoadData()
    {
        const response = await this.apiService.words.get({ offset: 0, limit: 25 });
        this.data = response.data;
    }

    private RenderTable()
    {
        return <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Translation</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {this.data!.map(x => <tr>
                    <td>{x.word + " " + WordTypeToAbbreviationText(x.type)}</td>
                    <td>
                        {RenderTranslations(x.translations)}
                    </td>
                    <td>
                        <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(x.word)} target="_blank">See on Wiktionary</a>
                        {" | "}
                        <Anchor route={"words/" + x.id + "/edit"}><MatIcon>edit</MatIcon></Anchor>
                    </td>
                </tr>)}
            </tbody>
        </table>;
    }

    //Event handlers
    override OnInitiated(): void
    {
        this.LoadData();
    }
}