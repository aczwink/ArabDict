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
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { Stem1Context } from "arabdict-domain/src/CreateVerb";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { Gender, Mood, Numerus, Person, Tense, Voice } from "arabdict-domain/src/VerbStem";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { ConjugationService } from "../ConjugationService";
import { WordTypeToAbbreviationText } from "../shared/words";
import { RenderTranslations } from "../shared/translations";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";

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
        const stem1ctx = verbData.stem1Context;
        const conjugated = this.conjugationService.Conjugate(this.root.radicals, verbData.stem, "perfect", "active", "male", "third", "singular", "indicative", stem1ctx);

        const allVerbalNouns = this.conjugationService.GenerateAllPossibleVerbalNouns(this.root.radicals, verbData.stem);
        const verbalNouns = (allVerbalNouns.length === 1)
            ? allVerbalNouns.map(x => x.text)
            : verbData.verbalNounIds.Values().Map(x => allVerbalNouns.find(y => y.id === x)).NotUndefined().Map(x => x.text).ToArray();

        return <fragment>
            <h2>{conjugated} <Anchor route={"/verbs/edit/" + verbData.id}><MatIcon>edit</MatIcon></Anchor></h2>
            {this.RenderProperties(verbalNouns, stem1ctx)}
            <br />
            <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(conjugated)} target="_blank">See on Wiktionary</a>
            <br />
            {this.RenderDerivedWords()}
            {this.RenderConjugation(stem1ctx)}
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

    private RenderConjugation(stem1ctx?: Stem1Context)
    {
        const past = this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "perfect", "active", "male", "third", "singular", "indicative", stem1ctx);

        return <div className="mt-2">
            <h4>Conjugation</h4>
            <h5>Active voice الْفِعْل الْمَعْلُوم</h5>
            {this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "active", "indicative", () => past)}
            {this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "active", "indicative", () => past)}
            {this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "active", "subjunctive", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "active", g, p, n, "indicative", stem1ctx))}
            {this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "active", "jussive", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "active", g, p, n, "subjunctive", stem1ctx))}
            {this.RenderConjugationTable("Imperative الْأَمْر", stem1ctx, "present", "active", "imperative", () => past)}

            <h5>Passive voice الْفِعْل الْمَجْهُول</h5>
            {this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "passive", "indicative", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "perfect", "active", g, p, n, "indicative", stem1ctx))}
            {this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "passive", "indicative", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "active", g, p, n, "indicative", stem1ctx))}
            {this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "passive", "subjunctive", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "passive", g, p, n, "indicative", stem1ctx))}
            {this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "passive", "jussive", (g, p, n) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "passive", g, p, n, "subjunctive", stem1ctx))}
        </div>;
    }

    private RenderConjugationTable(tenseTitle: string, stem1ctx: Stem1Context | undefined, tempus: Tense, voice: Voice, mood: Mood, base: (g: Gender, p: Person, n: Numerus) => string)
    {
        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, tempus, voice, g, p, n, mood, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base(g, p, n));

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

    private RenderProperties(verbalNouns: string[], stem1ctx?: Stem1Context)
    {
        const data = this.data!;
        const root = new VerbRoot(this.root.radicals);
        const past = this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "perfect", "active", "male", "third", "singular", "indicative", stem1ctx);
        const present = this.conjugationService.Conjugate(this.root.radicals, this.data!.stem, "present", "active", "male", "third", "singular", "indicative", stem1ctx);
        return <table>
            <tbody>
                <tr>
                    <th>Root:</th>
                    <td><Anchor route={"/roots/" + data.rootId}>{this.root.radicals.split("").join("-")}</Anchor></td>
                </tr>
                <tr>
                    <th>Stem:</th>
                    <td><StemNumberComponent rootType={root.type} stem={data.stem} /></td>
                </tr>
                <tr>
                    <th>Present:</th>
                    <td>{RenderWithDiffHighlights(present, past)}</td>
                </tr>
                <tr>
                    <th>Active participle اِسْم الْفَاعِل:</th>
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(this.root.radicals, data.stem, "active", stem1ctx), past)}</td>
                </tr>
                <tr>
                    <th>Passive participle اِسْم الْمَفْعُول:</th>
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(this.root.radicals, data.stem, "passive", stem1ctx), past)}</td>
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