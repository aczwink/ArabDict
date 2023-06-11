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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, RouterButton, RouterState } from "acfrontend";
import { RootCreationData, VerbData, VerbDerivedWordData } from "../../dist/api";
import { APIService } from "../APIService";
import { RomanNumberComponent } from "../shared/RomanNumberComponent";
import { CreateVerb, Stem1Context } from "arabdict-domain/src/CreateVerb";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { Gender, Numerus, Person, Tense, VerbStem, Voice } from "arabdict-domain/src/VerbStem";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { ConjugationService } from "../ConjugationService";
import { WordTypeToAbbreviationText } from "../shared/words";
import { RenderTranslations } from "../shared/translations";

@Injectable
export class ShowVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private conjugationService: ConjugationService)
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
        const stem1ctx = { middleRadicalTashkil: verbData.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: verbData.stem1MiddleRadicalTashkilPresent };
        const conjugated = this.conjugationService.Conjugate(this.root.radicals, verbData.stem, "perfect", "active", "male", "third", "singular", stem1ctx);

        const verb = CreateVerb(this.root.radicals, verbData.stem, { middleRadicalTashkil: verbData.stem1MiddleRadicalTashkil, middleRadicalTashkilPresent: verbData.stem1MiddleRadicalTashkilPresent });

        const allVerbalNouns = verb.GenerateAllPossibleVerbalNouns();
        const verbalNouns = (allVerbalNouns.length === 1)
            ? allVerbalNouns.map(x => x.text)
            : verbData.verbalNounIds.Values().Map(x => allVerbalNouns.find(y => y.id === x)).NotUndefined().Map(x => x.text).ToArray();

        return <fragment>
            <h2>{conjugated} <Anchor route={"/verbs/edit/" + verbData.id}><MatIcon>edit</MatIcon></Anchor></h2>
            {this.RenderProperties(verb, verbalNouns)}
            {this.RenderDerivedWords()}
            {this.RenderConjugation(stem1ctx)}

            <br />
            <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(conjugated)} target="_blank">See on Wiktionary</a>
        </fragment>;
    }

    //Private state
    private verbId: number;
    private data: VerbData | null;
    private root: RootCreationData;
    private derivedWords: VerbDerivedWordData[] | null;

    //Private methods
    private async LoadDerivedWords()
    {
        const response3 = await this.apiService.verbs.words.get({ verbId: this.data!.id });
        this.derivedWords = response3.data;
    }

    private RenderConjugation(stem1ctx: Stem1Context)
    {
        const past = this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "perfect", "active", "male", "third", "singular", stem1ctx);
        const present = this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "active", "male", "third", "singular", stem1ctx);

        return <div className="mt-2">
            <h4>Conjugation</h4>
            <h5>Past الْمَاضِي</h5>
            {this.RenderConjugationTable("Active voice الْفِعْل الْمَعْلُوم", stem1ctx, "perfect", "active", past)}
            {this.RenderConjugationTable("Passive voice الْفِعْل الْمَجْهُول", stem1ctx, "perfect", "passive", past)}

            <h5>Present الْمُضَارِع الْمَرْفُوع</h5>
            {this.RenderConjugationTable("Active voice الْفِعْل الْمَعْلُوم", stem1ctx, "present", "active", past)}
            {this.RenderConjugationTable("Passive voice الْفِعْل الْمَجْهُول", stem1ctx, "present", "passive", present)}
            {this.RenderConjugationTable("Imperative الْأَمْر", stem1ctx, "imperative", "active", past)}
        </div>;
    }

    private RenderConjugationTable(tenseTitle: string, stem1ctx: Stem1Context, tempus: Tense, voice: Voice, base: string)
    {
        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, tempus, voice, g, p, n, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base);

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
                    <td rowSpan="2">{renderEntry("male", "first", "singular")}</td>
                    <td>{renderEntry("male", "second", "singular")}</td>
                    <td>{renderEntry("male", "third", "singular")}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{renderEntry("female", "second", "singular")}</td>
                    <td>{renderEntry("female", "third", "singular")}</td>
                </tr>
                <tr>
                    <th rowSpan="2">dual الْمُثَنَّى</th>
                    <th>Male</th>
                    <td rowSpan="2"> </td>
                    <td rowSpan="2">{renderEntry("male", "second", "dual")}</td>
                    <td>{renderEntry("male", "third", "dual")}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{renderEntry("female", "third", "dual")}</td>
                </tr>
                <tr>
                    <th rowSpan="2">plural الْجَمْع</th>
                    <th>Male</th>
                    <td rowSpan="2">{renderEntry("male", "first", "plural")}</td>
                    <td>{renderEntry("male", "second", "plural")}</td>
                    <td>{renderEntry("male", "third", "plural")}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{renderEntry("female", "second", "plural")}</td>
                    <td>{renderEntry("female", "third", "plural")}</td>
                </tr>
            </tbody>
        </table>
        </fragment>;
    }

    private RenderDerivedWord(derivedWord: VerbDerivedWordData)
    {
        return <div className="row mb-2">
            <div className="col">
                <h6 className="d-inline me-2">{derivedWord.word + " " + WordTypeToAbbreviationText(derivedWord.type)}</h6>
                {RenderTranslations(derivedWord.translations)}
                <Anchor route={"words/" + derivedWord.id + "/edit"}><MatIcon>edit</MatIcon></Anchor>
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
                    <td>{RenderTranslations(data.translations)}</td>
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

    //Event handlers
    private async OnDeleteWord(derivedWord: VerbDerivedWordData, event: Event)
    {
        event.preventDefault();

        if(confirm("Are you sure that you want to delete the word: " + derivedWord.word + "?"))
        {
            this.derivedWords = null;
            await this.apiService.words._any_.delete(derivedWord.id);
            this.LoadDerivedWords();
        }
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