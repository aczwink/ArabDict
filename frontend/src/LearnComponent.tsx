/**
 * ArabDict
 * Copyright (C) 2023-2024 Amir Czwink (amir130@hotmail.de)
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

import { CheckBox, Component, FormField, Injectable, JSX_CreateElement, ProgressSpinner } from "acfrontend";
import { APIService } from "./services/APIService";
import { FullWordData, VerbData } from "../dist/api";
import { ConjugationService } from "./services/ConjugationService";
import { RemoveTashkilButKeepShadda } from "arabdict-domain/src/Util";
import { RenderTranslations } from "./shared/translations";
import { Stem1DataToStem1ContextOptional } from "./verbs/model";

@Injectable
export class LearnComponent extends Component
{
    constructor(private apiService: APIService, private conjugationService: ConjugationService)
    {
        super();

        this.data = null;
        this.rootRadicals = "";
        this.showTashkil = false;
        this.resolve = false;
    }
    
    protected Render()
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const title = ("rootId" in this.data) ? this.conjugationService.Conjugate(this.rootRadicals, this.data.stem, "perfect", "active", "male", "third", "singular", "indicative", Stem1DataToStem1ContextOptional(this.data.stem1Data)) : this.data.word;

        if(this.resolve)
        {
            return <div className="row justify-content-center text-center">
                <div className="col-auto">
                    <h1>{title}</h1>
                    <div className="row">
                        <div className="col">
                            { "translations" in this.data ? RenderTranslations(this.data.translations) : alert("TODO: REIMPLEMENT ME!")}
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onclick={this.LoadNextWord.bind(this)}>Next</button>
                </div>
            </div>;
        }

        const tashkilTitle = this.showTashkil ? title : RemoveTashkilButKeepShadda(title);

        return <div className="row justify-content-center text-center">
            <div className="col-auto">
                <h1>{tashkilTitle}</h1>
                <FormField title="Show tashkil">
                    <CheckBox value={this.showTashkil} onChanged={newValue => this.showTashkil = newValue} />
                </FormField>
                <button type="button" className="btn btn-primary" onclick={() => this.resolve = true}>Resolve</button>
            </div>
        </div>;
    }

    //Private state
    private data: VerbData | FullWordData | null;
    private rootRadicals: string;
    private showTashkil: boolean;
    private resolve: boolean;

    //Private methods
    private async LoadNextWord()
    {
        this.data = null;
        this.showTashkil = false;
        this.resolve = false;

        const response = await this.apiService.random.get();
        if(response.data.type === "verb")
        {
            const response2 = await this.apiService.verbs.get({ verbId: response.data.id });
            if(response2.statusCode !== 200)
                throw new Error("TODO: implement me");

            const response3 = await this.apiService.roots._any_.get(response2.data.rootId);
            if(response3.statusCode !== 200)
                throw new Error("TODO: implement me");
            this.rootRadicals = response3.data.radicals;


            this.data = response2.data;
        }
        else
        {
            const response2 = await this.apiService.words._any_.get(response.data.id);
            if(response2.statusCode !== 200)
                throw new Error("TODO: implement me");
            this.data = response2.data;
        }
    }

    //Event handlers
    override OnInitiated(): void
    {
        this.LoadNextWord();
    }
}