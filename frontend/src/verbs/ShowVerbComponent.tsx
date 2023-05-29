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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, PopupManager, ProgressSpinner, RouterButton, RouterState, Textarea } from "acfrontend";
import { RootCreationData, VerbData, WordData, WordType } from "../../dist/api";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";
import { CreateVerb } from "arabdict-domain/src/CreateVerb";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { Tense, VerbStem, Voice } from "arabdict-domain/src/VerbStem";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";

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

        const verbData = this.data;
        const verb = CreateVerb(this.root.radicals, verbData.stem, { middleRadicalTashkil: verbData.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: verbData.stem1MiddleRadicalTashkilPresent });
        const conjugated = verb.Conjugate("perfect", "active", "male", "third", "singular");

        const allVerbalNouns = verb.GenerateAllPossibleVerbalNouns();
        const verbalNouns = (allVerbalNouns.length === 1)
            ? allVerbalNouns.map(x => x.text)
            : verbData.verbalNounIds.Values().Map(x => allVerbalNouns.find(y => y.id === x)).NotUndefined().Map(x => x.text).ToArray();

        return <fragment>
            <h2>{conjugated} <Anchor route={"/verbs/edit/" + verbData.id}><MatIcon>edit</MatIcon></Anchor></h2>
            {this.RenderProperties(verb, verbalNouns)}
            {this.RenderDerivedWords()}
            {this.RenderConjugation(verb)}

            <br />
            <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(conjugated)} target="_blank">See on Wiktionary</a>
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

    private RenderConjugation(verb: VerbStem)
    {
        const past = verb.Conjugate("perfect", "active", "male", "third", "singular");
        const present = verb.Conjugate("present", "active", "male", "third", "singular");

        return <div className="mt-2">
            <h4>Conjugation</h4>
            <h5>Past الْمَاضِي</h5>
            {this.RenderConjugationTable("Active voice الْفِعْل الْمَعْلُوم", verb, "perfect", "active", past)}
            {this.RenderConjugationTable("Passive voice الْفِعْل الْمَجْهُول", verb, "perfect", "passive", past)}

            <h5>Present الْمُضَارِع الْمَرْفُوع</h5>
            {this.RenderConjugationTable("Active voice الْفِعْل الْمَعْلُوم", verb, "present", "active", past)}
            {this.RenderConjugationTable("Passive voice الْفِعْل الْمَجْهُول", verb, "present", "passive", present)}
            {this.RenderConjugationTable("Imperative الْأَمْر", verb, "imperative", "active", past)}
        </div>;
    }

    private RenderConjugationTable(tenseTitle: string, verb: VerbStem, tempus: Tense, voice: Voice, base: string)
    {
        return <fragment>
            <h6>{tenseTitle}</h6>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th colSpan="2"> </th>
                    <th>1st person الْمُتَكَلِّم</th>
                    <th>2nd person الْمُخَاطَب</th>
                    <th>3rd person الْغَائِب</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowSpan="2">singular الْمُفْرَد</th>
                    <th>Male</th>
                    <td rowSpan="2">{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "first", "singular"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "second", "singular"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "third", "singular"), base)}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "female", "second", "singular"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "female", "third", "singular"), base)}</td>
                </tr>
                <tr>
                    <th rowSpan="2">dual الْمُثَنَّى</th>
                    <th>Male</th>
                    <td rowSpan="2"> </td>
                    <td rowSpan="2">{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "second", "dual"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "third", "dual"), base)}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "female", "third", "dual"), base)}</td>
                </tr>
                <tr>
                    <th rowSpan="2">plural الْجَمْع</th>
                    <th>Male</th>
                    <td rowSpan="2">{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "first", "plural"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "second", "plural"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "male", "third", "plural"), base)}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "female", "second", "plural"), base)}</td>
                    <td>{RenderWithDiffHighlights(verb.Conjugate(tempus, voice, "female", "third", "plural"), base)}</td>
                </tr>
            </tbody>
        </table>
        </fragment>;
    }

    private RenderDerivedWord(derivedWord: WordData)
    {
        return <div className="row mb-2">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word + " " + this.RenderWordType(derivedWord)}</h6>
                {derivedWord.translation}
                <a href="#" onclick={this.OnEditWordTranslation.bind(this, derivedWord)}><MatIcon>edit</MatIcon></a>
                <a href="#" className="link-danger" onclick={this.OnDeleteWord.bind(this, derivedWord)}><BootstrapIcon>trash</BootstrapIcon></a>
            </div>
        </div>;
    }

    private RenderDerivedWords()
    {
        if(this.derivedWords === null)
            return <ProgressSpinner />;

        return <div className="mt-2">
            <h5>Derived words</h5>
            {this.derivedWords.map(this.RenderDerivedWord.bind(this))}
            <RouterButton className="btn btn-primary" route={"/verbs/addword/" + this.verbId}><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </div>;
    }

    private RenderProperties(verb: VerbStem, verbalNouns: string[])
    {
        const data = this.data!;
        const past = verb.Conjugate("perfect", "active", "male", "third", "singular");
        return <table>
            <tbody>
                <tr>
                    <th>Root:</th>
                    <td><Anchor route={"/roots/" + data.rootId}>{this.root.radicals.split("").join("-")}</Anchor></td>
                </tr>
                <tr>
                    <th>Stem:</th>
                    <td><RomanNumberComponent num={data.stem} /></td>
                </tr>
                <tr>
                    <th>Active participle اِسْم الْفَاعِل:</th>
                    <td>{RenderWithDiffHighlights(verb.ConjugateParticiple("active"), past)}</td>
                </tr>
                <tr>
                    <th>Passive participle اِسْم الْمَفْعُول:</th>
                    <td>{RenderWithDiffHighlights(verb.ConjugateParticiple("passive"), past)}</td>
                </tr>
                <tr>
                    <th>Verbal noun(s) الْمَصَادِر:</th>
                    <td>{this.RenderVerbalNouns(verbalNouns, past)}</td>
                </tr>
                <tr>
                    <th>Translation:</th>
                    <td>{data.translation}</td>
                </tr>
            </tbody>
        </table>;
    }

    private RenderVerbalNouns(verbalNouns: string[], past: string)
    {
        if(verbalNouns.length === 1)
            return RenderWithDiffHighlights(verbalNouns[0], past);

        return <ul>
            {verbalNouns.map(x => <li>{RenderWithDiffHighlights(x, past)}</li>)}
        </ul>;
    }

    private RenderWordType(derivedWord: WordData)
    {
        switch(derivedWord.type)
        {
            case WordType.Noun:
                return "";
            case WordType.Preposition:
                return "(prep.)";
            case WordType.Adjective:
                return "(adj.)";
            case WordType.Conjunction:
                return "(conj.)";
        }
    }

    //Event handlers
    private async OnDeleteWord(derivedWord: WordData, event: Event)
    {
        event.preventDefault();

        if(confirm("Are you sure that you want to delete the word: " + derivedWord.word + "?"))
        {
            this.derivedWords = null;
            await this.apiService.verbs.words.delete({ wordId: derivedWord.id });
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