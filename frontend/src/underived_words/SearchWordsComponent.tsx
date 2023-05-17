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

import { BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, PopupManager, ProgressSpinner, Textarea } from "acfrontend";
import { APIService } from "../APIService";
import { UnderivedWordData } from "../../dist/api";
import { RemoveTashkil } from "arabdict-domain/src/Util";

@Injectable
export class SearchWordsComponent extends Component
{
    constructor(private apiService: APIService, private popupManager: PopupManager)
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
            <button className="btn btn-primary" type="button" onclick={this.OnAddWord.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
        </fragment>
    }

    //Private state
    private data: UnderivedWordData[] | null;

    //Private methods
    private async LoadData()
    {
        const response = await this.apiService.words.underived.get({ offset: 0, limit: 25 });
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
                    <td><a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(x.word)} target="_blank">{x.word}</a></td>
                    <td>{x.translation}</td>
                    <td>
                        <a href="#" onclick={this.OnEditWordTranslation.bind(this, x)}><MatIcon>edit</MatIcon></a>
                    </td>
                </tr>)}
            </tbody>
        </table>;
    }

    //Event handlers
    private async OnAddWord()
    {
        const word = prompt("Add word with full tashkil");
        if(word !== null)
        {
            this.data = null;

            await this.apiService.words.underived.post({ word });
            
            this.LoadData();
        }
    }

    private OnEditWordTranslation(wordData: UnderivedWordData, event: Event)
    {
        event.preventDefault();

        let newText = wordData.translation;

        const ref = this.popupManager.OpenDialog(<Textarea value={newText} onChanged={newValue => newText = newValue} />, {
            title: "Edit translation"
        });
        ref.onAccept.Subscribe( async () => {
            ref.waiting.Set(true);
            await this.apiService.words.underived.put({
                wordId: wordData.id,
                translation: newText
            });
            ref.Close();

            this.data = null;
            this.LoadData();
        });
    }

    override OnInitiated(): void
    {
        this.LoadData();
    }
}