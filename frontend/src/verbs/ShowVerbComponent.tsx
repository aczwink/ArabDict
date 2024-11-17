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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterButton, RouterState } from "acfrontend";
import { FullWordData, RootCreationData, VerbData, VerbRelation } from "../../dist/api";
import { APIService } from "../services/APIService";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { ConjugationService } from "../services/ConjugationService";
import { RenderTranslations } from "../shared/translations";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { WordOverviewComponent } from "../words/WordOverviewComponent";
import { Subscription } from "../../../../ACTS-Util/core/dist/main";
import { WordRelationshipTypeToString } from "../shared/words";
import { VerbIdReferenceComponent } from "./VerbReferenceComponent";
import { RootToString } from "../roots/general";
import { Stem1DataToStem1ContextOptional } from "./model";
import { Stem1Context, Person, TenseString, VoiceString, Numerus, Gender, Mood, Voice, AdvancedStemNumber } from "arabdict-domain/src/Definitions";
import { DisplayVocalized } from "arabdict-domain/src/Vocalization";
import { _TODO_CheckConjugation } from "./_ConjugationCheck";
import { Tense } from "arabdict-domain/dist/Definitions";

@Injectable
export class ShowVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private conjugationService: ConjugationService, private router: Router)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = null;
        this.root = { description: "", flags: 0, radicals: "" };
        this.derivedWords = null;

        this.dialectSubscription = this.conjugationService.globalDialect.Subscribe(this.Update.bind(this));
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const verbData = this.data;
        const stem1ctx = Stem1DataToStem1ContextOptional(verbData.stem1Data);
        const conjugated = this.conjugationService.ConjugateToStringArgs(this.rootRadicals, verbData.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        _TODO_CheckConjugation(new VerbRoot(this.rootRadicals), {
            gender: Gender.Male,
            voice: Voice.Active,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: verbData.stem as any,
            stem1Context: stem1ctx
        });

        return <fragment>
            <div className="row">
                <div className="col"><h2>{conjugated}</h2></div>
                <div className="col-auto">
                    <Anchor route={"verbs/edit/" + verbData.id}><BootstrapIcon>pencil</BootstrapIcon></Anchor>
                    <a href="#" className="link-danger" onclick={this.OnDeleteVerb.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
                </div>
            </div>

            {this.RenderProperties(stem1ctx)}
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
    private derivedWords: FullWordData[] | null;
    private dialectSubscription: Subscription;

    //Private properties
    private get rootRadicals()
    {
        return this.root.radicals;
    }

    //Private methods
    private async LoadDerivedWords()
    {
        const response3 = await this.apiService.verbs.words.get({ verbId: this.data!.id });
        this.derivedWords = response3.data;
    }

    private RenderConjugation(stem1ctx?: Stem1Context)
    {
        const past = this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        const passive = this.conjugationService.globalDialectMetaData.hasPassive ? [
            <h5>Passive voice الْفِعْل الْمَجْهُول</h5>,
            this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "passive", Mood.Indicative, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "perfect", "active", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "passive", Mood.Indicative, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "passive", Mood.Subjunctive, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "passive", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "passive", Mood.Jussive, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "passive", g, p, n, Mood.Subjunctive, stem1ctx)),
        ] : null;

        const jussive = this.conjugationService.globalDialectMetaData.hasJussive ?
            this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "active", Mood.Jussive, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Subjunctive, stem1ctx))
            : null;

        return <div className="mt-2">
            <h4>Conjugation</h4>
            <h5>Active voice الْفِعْل الْمَعْلُوم</h5>
            {this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "active", Mood.Indicative, () => past)}
            {this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "active", Mood.Indicative, () => past)}
            {this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "active", Mood.Subjunctive, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Indicative, stem1ctx))}
            {jussive}
            {this.RenderConjugationTableImperative("Imperative الْأَمْر", stem1ctx, "present", "active", Mood.Imperative, (g, p, n) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Jussive, stem1ctx))}

            {passive}
        </div>;
    }

    private RenderConjugationTable(tenseTitle: string, stem1ctx: Stem1Context | undefined, tempus: TenseString, voice: VoiceString, mood: Mood, base: (g: Gender, p: Person, n: Numerus) => DisplayVocalized[])
    {
        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, tempus, voice, g, p, n, mood, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base(g, p, n));

        const dual = this.conjugationService.globalDialectMetaData.hasDual ? [
            <tr>
                <th rowSpan="2">dual الْمُثَنَّى</th>
                <th>Male</th>
                <td rowSpan="2"> </td>
                <td rowSpan="2">{renderEntry(Gender.Male, Person.Second, Numerus.Dual)}</td>
                <td>{renderEntry(Gender.Male, Person.Third, Numerus.Dual)}</td>
            </tr>
        ,
            <tr>
                <th>Female</th>
                <td>{renderEntry(Gender.Female, Person.Third, Numerus.Dual)}</td>
            </tr>
        ] : null;

        const plural = this.conjugationService.globalDialectMetaData.hasFemalePlural ? [
            <tr>
                <th rowSpan="2">plural الْجَمْع</th>
                <th>Male</th>
                <td rowSpan="2">{renderEntry(Gender.Male, Person.First, Numerus.Plural)}</td>
                <td>{renderEntry(Gender.Male, Person.Second, Numerus.Plural)}</td>
                <td>{renderEntry(Gender.Male, Person.Third, Numerus.Plural)}</td>
            </tr>
        ,
            <tr>
                <th>Female</th>
                <td>{renderEntry(Gender.Female, Person.Second, Numerus.Plural)}</td>
                <td>{renderEntry(Gender.Female, Person.Third, Numerus.Plural)}</td>
            </tr>
        ] : [
            <tr>
                <th colSpan="2" rowSpan="1">plural الْجَمْع</th>
                <td>{renderEntry(Gender.Male, Person.First, Numerus.Plural)}</td>
                <td rowSpan="1">{renderEntry(Gender.Male, Person.Second, Numerus.Plural)}</td>
                <td rowSpan="1">{renderEntry(Gender.Male, Person.Third, Numerus.Plural)}</td>
            </tr>
        ];

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
                    <td rowSpan="2">{renderEntry(Gender.Male, Person.First, Numerus.Singular)}</td>
                    <td>{renderEntry(Gender.Male, Person.Second, Numerus.Singular)}</td>
                    <td>{renderEntry(Gender.Male, Person.Third, Numerus.Singular)}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{renderEntry(Gender.Female, Person.Second, Numerus.Singular)}</td>
                    <td>{renderEntry(Gender.Female, Person.Third, Numerus.Singular)}</td>
                </tr>
                {dual}
                {plural}
            </tbody>
        </table>
        </fragment>;
    }

    private RenderConjugationTableImperative(tenseTitle: string, stem1ctx: Stem1Context | undefined, tempus: TenseString, voice: VoiceString, mood: Mood, base: (g: Gender, p: Person, n: Numerus) => DisplayVocalized[])
    {
        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, tempus, voice, g, p, n, mood, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base(g, p, n));

        const dual = this.conjugationService.globalDialectMetaData.hasDual ? [
            <tr>
                <th colSpan="2">dual الْمُثَنَّى</th>
                <td>{renderEntry(Gender.Male, Person.Second, Numerus.Dual)}</td>
            </tr>
        ] : null;

        const plural = this.conjugationService.globalDialectMetaData.hasFemalePlural ? [
            <tr>
                <th rowSpan="2">plural الْجَمْع</th>
                <th>Male</th>
                <td>{renderEntry(Gender.Male, Person.Second, Numerus.Plural)}</td>
            </tr>
        ,
            <tr>
                <th>Female</th>
                <td>{renderEntry(Gender.Female, Person.Second, Numerus.Plural)}</td>
            </tr>
        ] : [
            <tr>
                <th colSpan="2">plural الْجَمْع</th>
                <td>{renderEntry(Gender.Male, Person.Second, Numerus.Plural)}</td>
            </tr>
        ];

        return <fragment>
            <h6>{tenseTitle}</h6>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th colSpan="2"> </th>
                    <th>2nd person الْمُخَاطَب</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th rowSpan="2">singular الْمُفْرَد</th>
                    <th>Male</th>
                    <td>{renderEntry(Gender.Male, Person.Second, Numerus.Singular)}</td>
                </tr>
                <tr>
                    <th>Female</th>
                    <td>{renderEntry(Gender.Female, Person.Second, Numerus.Singular)}</td>
                </tr>
                {dual}
                {plural}
            </tbody>
        </table>
        </fragment>;
    }

    private RenderDerivedWords()
    {
        if(this.derivedWords === null)
            return <ProgressSpinner />;

        return <div className="mt-2">
            <h5>Derived words</h5>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Translation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.derivedWords.map(x => <WordOverviewComponent word={x} />)}
                </tbody>
            </table>

            <RouterButton color="primary" route={"/words/add?verbId=" + this.verbId}><BootstrapIcon>plus</BootstrapIcon></RouterButton>
        </div>;
    }

    private RenderProperties(stem1ctx?: Stem1Context)
    {
        const data = this.data!;
        const root = new VerbRoot(this.rootRadicals);
        const past = this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);
        const present = this.conjugationService.Conjugate(this.rootRadicals, this.data!.stem, "present", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        const stemData = (stem1ctx === undefined) ? (this.data!.stem! as AdvancedStemNumber) : stem1ctx;
        const verbalNounRow = this.conjugationService.HasPotentiallyMultipleVerbalNounForms(this.rootRadicals, stemData) ? null : <tr>
            <th>Verbal noun الْمَصْدَر</th>
            <td>{this.conjugationService.GenerateAllPossibleVerbalNouns(this.rootRadicals, stemData)[0]}</td>
        </tr>;
        return <table>
            <tbody>
                <tr>
                    <th>Root:</th>
                    <td><Anchor route={"/roots/" + data.rootId}>{RootToString(this.root)}</Anchor></td>
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
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(this.rootRadicals, data.stem, Voice.Active, stem1ctx), past)}</td>
                </tr>
                <tr>
                    <th>Passive participle اِسْم الْمَفْعُول:</th>
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(this.rootRadicals, data.stem, Voice.Passive, stem1ctx), past)}</td>
                </tr>
                {verbalNounRow}
                <tr>
                    <th>Related:</th>
                    <td>{this.RenderRelations(data.related)}</td>
                </tr>
                <tr>
                    <th>Translation:</th>
                    <td>{RenderTranslations(data.translations)}</td>
                </tr>
            </tbody>
        </table>;
    }

    private RenderRelation(related: VerbRelation)
    {
        return <li>
            {WordRelationshipTypeToString(related.relationType)} of <VerbIdReferenceComponent verbId={related.relatedVerbId} />
        </li>;
    }

    private RenderRelations(related: VerbRelation[])
    {
        return <ul>
            {related.map(this.RenderRelation.bind(this))}
        </ul>;
    }

    //Event handlers
    private async OnDeleteVerb(event: Event)
    {
        event.preventDefault();

        const verbData = this.data!;
        const stem1ctx = Stem1DataToStem1ContextOptional(verbData.stem1Data);
        const conjugated = this.conjugationService.ConjugateToStringArgs(this.rootRadicals, verbData.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        if(confirm("Are you sure that you want to delete the verb: " + conjugated + "?"))
        {
            const rootId = this.data!.rootId;

            this.data = null;
            await this.apiService.verbs.delete({ verbId: this.verbId });
            
            this.router.RouteTo("/roots/" + rootId);
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

    override OnUnmounted(): void
    {
        this.dialectSubscription.Unsubscribe();
    }
}