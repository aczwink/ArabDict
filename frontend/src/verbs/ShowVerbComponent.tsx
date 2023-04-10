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

import { Anchor, Component, Injectable, JSX_CreateElement, MatIcon, PopupManager, ProgressSpinner, RouterState, Textarea } from "acfrontend";
import { RootCreationData, VerbData, WordData, WordType } from "../../dist/api";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";

@Injectable
export class ShowVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private popupManager: PopupManager)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = null;
        this.root = { radicals: "" };
        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            {this.RenderProperties()}
            {this.RenderDerivedWords()}
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: VerbData | null;
    private root: RootCreationData;
    private derivedWords: WordData[] | null;

    //Private methods
    private async LoadDerivedWords()
    {
        const response3 = await this.apiService.verbs.words.get({ verbId: this.data!.id });
        this.derivedWords = response3.data;
    }

    private RenderDerivedWord(derivedWord: WordData)
    {
        return <div className="row mb-2">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word + " " + this.RenderWordType(derivedWord)}</h6>
                {derivedWord.translation}
                <a href="#" onclick={this.OnEditWordTranslation.bind(this, derivedWord)}><MatIcon>edit</MatIcon></a>
            </div>
        </div>;
    }

    private RenderDerivedWords()
    {
        if(this.derivedWords === null)
            return <ProgressSpinner />;

        return <div className="mt-2">
            <h5>Nouns</h5>
            {this.derivedWords.map(this.RenderDerivedWord.bind(this))}
            <button className="btn btn-primary" type="button" onclick={this.OnCreateWord.bind(this, WordType.Noun)}>Add noun</button>
            <button className="btn btn-primary" type="button" onclick={this.OnCreateWord.bind(this, WordType.Preposition)}>Add preposition</button>
        </div>;
    }

    private RenderProperties()
    {
        const data = this.data!;
        return <table>
            <tbody>
                <tr>
                    <th>Root:</th>
                    <td><Anchor route={"/roots/" + data.rootId}>{this.root.radicals}</Anchor></td>
                </tr>
                <tr>
                    <th>Stem:</th>
                    <td><RomanNumberComponent num={data.stem} /></td>
                </tr>
                <tr>
                    <th>Translation:</th>
                    <td>{data.translation} <Anchor route={"/verbs/edit/" + data.id}><MatIcon>edit</MatIcon></Anchor></td>
                </tr>
            </tbody>
        </table>;
    }

    private RenderWordType(derivedWord: WordData)
    {
        switch(derivedWord.type)
        {
            case WordType.Noun:
                return "";
            case WordType.Preposition:
                return "(prep.)";
        }
    }

    //Event handlers
    private async OnCreateWord(wordType: WordType)
    {
        const result = prompt("Enter noun with full tashkil");
        if(result !== null)
        {
            this.derivedWords = null;

            await this.apiService.verbs.words.post({
                type: wordType,
                word: result,
                verbId: this.data!.id
            });

            this.LoadDerivedWords();
        }
    }

    private OnEditWordTranslation(derivedWord: WordData, event: Event)
    {
        event.preventDefault();

        let newText = derivedWord.translation;

        const ref = this.popupManager.OpenDialog(<Textarea value={newText} onChanged={newValue => newText = newValue} />, {
            title: "Edit translation"
        });
        ref.onAccept.Subscribe( async () => {
            ref.waiting.Set(true);
            await this.apiService.verbs.words.put({
                wordId: derivedWord.id,
                translation: newText
            });
            ref.Close();

            this.derivedWords = null;
            this.LoadDerivedWords();
        });
    }

    override async OnInitiated(): Promise<void>
    {
        const response1 = await this.apiService.verbs.get({ verbId: this.verbId });
        if(response1.statusCode !== 200)
            throw new Error("TODO implement me");

        const response2 = await this.apiService.roots._any_.get(response1.data.rootId);
        if(response2.statusCode !== 200)
            throw new Error("TODO implement me");

        this.root = response2.data;
        this.data = response1.data;

        this.LoadDerivedWords();
    }
}