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

import { BootstrapIcon, Component, FormField, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, Select } from "acfrontend";
import { RootCreationData, VerbData } from "../../dist/api";
import { APIService } from "../APIService";
import { CreateVerb } from "arabdict-domain/src/CreateVerb";
import { VerbalNoun } from "arabdict-domain/src/VerbStem";
import { VerbEditorComponent } from "./VerbEditorComponent";

@Injectable
export class EditVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.root = { radicals: "" };
        this.data = null;
        this.addVerbalNounSelection = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const verbData = this.data;
        const verb = CreateVerb(this.root.radicals, verbData.stem, { middleRadicalTashkil: verbData.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: verbData.stem1MiddleRadicalTashkilPresent });

        return <fragment>
            <VerbEditorComponent data={this.data} verb={verb} onChanged={this.Update.bind(this)} />

            {this.RenderVerbalNouns(verb.GenerateAllPossibleVerbalNouns())}

            <button className="btn btn-primary" type="button" onclick={this.OnSave.bind(this)}>Save</button>
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: VerbData | null;
    private root: RootCreationData;
    private addVerbalNounSelection: number | null;

    //Private methods
    private RenderVerbalNouns(allVerbalNouns: VerbalNoun[])
    {
        if(allVerbalNouns.length === 1)
        {
            this.data!.verbalNounIds = [];
            return null;
        }

        return <FormField title="Verbal nouns">
            <div>
                <ul>
                    {this.data!.verbalNounIds.map(x => <li>
                        {allVerbalNouns.find(y => y.id === x)?.text}
                        <button type="button" className="btn btn-danger" onclick={this.OnDeleteVerbalNoun.bind(this, x)}><BootstrapIcon>trash</BootstrapIcon></button>
                    </li>)}
                </ul>
                <div className="row">
                    <div className="col">
                        <Select onChanged={newValue => this.addVerbalNounSelection = parseInt(newValue[0])}>
                            {allVerbalNouns.map(x => <option selected={x.id === this.addVerbalNounSelection} value={x.id}>{x.text}</option>)}
                        </Select>
                    </div>
                    <div className="col">
                        <button disabled={this.addVerbalNounSelection === null} className="btn btn-primary" type="button" onclick={this.OnAddVerbalNoun.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
                    </div>
                </div>
            </div>
        </FormField>;
    }

    //Event handlers
    private OnAddVerbalNoun()
    {
        this.data?.verbalNounIds.push(this.addVerbalNounSelection!);
        this.addVerbalNounSelection = null;
        this.Update();
    }

    private OnDeleteVerbalNoun(verbalNounId: number)
    {
        const idx = this.data!.verbalNounIds.findIndex(x => x === verbalNounId);
        this.data?.verbalNounIds.Remove(idx);
        this.Update();
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
    }

    private async OnSave()
    {
        const data = this.data!;
        this.data = null;

        await this.apiService.verbs.put({
            verbId: this.verbId,
            data: {
                stem: data.stem,
                translations: data.translations,
                verbalNounIds: data.verbalNounIds,
                stem1MiddleRadicalTashkil: data.stem1MiddleRadicalTashkil,
                stem1MiddleRadicalTashkilPresent: data.stem1MiddleRadicalTashkilPresent
            }
        });
        
        this.router.RouteTo("/verbs/" + this.verbId);
    }
}