/**
 * OpenArabDictViewer
 * Copyright (C) 2023-2025 Amir Czwink (amir130@hotmail.de)
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

import { Anchor, Component, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState } from "acfrontend";
import { FullWordData, RootOverviewData, VerbData, VerbRelation } from "../../dist/api";
import { APIService } from "../services/APIService";
import { StemNumberComponent } from "../shared/RomanNumberComponent";
import { RemoveTashkil } from "openarabicconjugation/src/Util";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { ConjugationService } from "../services/ConjugationService";
import { RenderTranslations } from "../shared/translations";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { WordOverviewComponent } from "../words/WordOverviewComponent";
import { WordRelationshipTypeToString } from "../shared/words";
import { VerbIdReferenceComponent } from "./VerbReferenceComponent";
import { RootToString } from "../roots/general";
import { Stem1DataToStem1ContextOptional } from "./model";
import { Stem1Context, Person, TenseString, VoiceString, Numerus, Gender, Mood, Voice, AdvancedStemNumber } from "openarabicconjugation/src/Definitions";
import { DisplayVocalized } from "openarabicconjugation/src/Vocalization";
import { _TODO_CheckConjugation } from "./_ConjugationCheck";
import { Tense } from "openarabicconjugation/dist/Definitions";
import { DialectsService } from "../services/DialectsService";
import { VerbFormComponent } from "./VerbFormComponent";
import { ConjugationSchemeToString } from "./ToStringStuff";

@Injectable
export class ShowVerbComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private conjugationService: ConjugationService, private router: Router, private dialectsService: DialectsService)
    {
        super();

        this.verbId = parseInt(routerState.routeParams.verbId!);
        this.data = null;
        this.root = { flags: 0, radicals: "", id: 0 };
        this.derivedWords = null;
    }
    
    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const verbData = this.data;
        const root = new VerbRoot(this.rootRadicals);
        const dialectType = this.dialectsService.MapIdToType(verbData.dialectId);
        const stem1ctx = Stem1DataToStem1ContextOptional(dialectType, root.type, verbData.stem1Context);
        const conjugated = this.conjugationService.ConjugateToStringArgs(dialectType, this.rootRadicals, verbData.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

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
                <h2>{conjugated}</h2>
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
    private root: RootOverviewData;
    private derivedWords: FullWordData[] | null;

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
        const dialectType = this.dialectsService.MapIdToType(this.data!.dialectId);
        const dialectMetaData = this.dialectsService.GetDialectMetaData(this.data!.dialectId);
        const past = this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

        const passive = dialectMetaData.hasPassive ? [
            <h5>Passive voice الْفِعْل الْمَجْهُول</h5>,
            this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "passive", Mood.Indicative, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "perfect", "active", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "passive", Mood.Indicative, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "passive", Mood.Subjunctive, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "passive", g, p, n, Mood.Indicative, stem1ctx)),
            this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "passive", Mood.Jussive, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "passive", g, p, n, Mood.Subjunctive, stem1ctx)),
        ] : null;

        const jussive = dialectMetaData.hasJussive ?
            this.RenderConjugationTable("Jussive الْمُضَارِع الْمَجْزُوم ", stem1ctx, "present", "active", Mood.Jussive, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Subjunctive, stem1ctx))
            : null;

        return <div className="mt-2">
            <h4>Conjugation</h4>
            <h5>Active voice الْفِعْل الْمَعْلُوم</h5>
            {this.RenderConjugationTable("Past الْمَاضِي", stem1ctx, "perfect", "active", Mood.Indicative, () => past)}
            {this.RenderConjugationTable("Present indicative الْمُضَارِع الْمَرْفُوع", stem1ctx, "present", "active", Mood.Indicative, () => past)}
            {this.RenderConjugationTable("Subjunctive الْمُضَارِع الْمَنْصُوب", stem1ctx, "present", "active", Mood.Subjunctive, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Indicative, stem1ctx))}
            {jussive}
            {this.RenderConjugationTableImperative("Imperative الْأَمْر", stem1ctx, "present", "active", Mood.Imperative, (g, p, n) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "present", "active", g, p, n, Mood.Jussive, stem1ctx))}

            {passive}
        </div>;
    }

    private RenderConjugationTable(tenseTitle: string, stem1ctx: Stem1Context | undefined, tempus: TenseString, voice: VoiceString, mood: Mood, base: (g: Gender, p: Person, n: Numerus) => DisplayVocalized[])
    {
        const dialectType = this.dialectsService.MapIdToType(this.data!.dialectId);
        const dialectMetaData = this.dialectsService.GetDialectMetaData(this.data!.dialectId);

        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, tempus, voice, g, p, n, mood, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base(g, p, n));

        const dual = dialectMetaData.hasDual ? [
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

        const plural = dialectMetaData.hasFemalePlural ? [
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
            <table className="table table-bordered table-sm">
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
        const dialectType = this.dialectsService.MapIdToType(this.data!.dialectId);
        const dialectMetaData = this.dialectsService.GetDialectMetaData(this.data!.dialectId);

        const conjugate = (g: Gender, p: Person, n: Numerus) => this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, tempus, voice, g, p, n, mood, stem1ctx);
        const renderEntry = (g: Gender, p: Person, n: Numerus) => RenderWithDiffHighlights(conjugate(g, p, n), base(g, p, n));

        const dual = dialectMetaData.hasDual ? [
            <tr>
                <th colSpan="2">dual الْمُثَنَّى</th>
                <td>{renderEntry(Gender.Male, Person.Second, Numerus.Dual)}</td>
            </tr>
        ] : null;

        const plural = dialectMetaData.hasFemalePlural ? [
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
            <table className="table table-bordered table-sm">
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
        </div>;
    }

    private RenderProperties(stem1ctx?: Stem1Context)
    {
        const data = this.data!;
        const root = new VerbRoot(this.rootRadicals);
        const dialect = this.dialectsService.GetDialect(data.dialectId);
        const dialectType = this.dialectsService.MapIdToType(data.dialectId);
        const past = this.conjugationService.Conjugate(dialectType, this.rootRadicals, this.data!.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, stem1ctx);

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
                    <th>Dialect:</th>
                    <td>{dialect.emojiCodes} {dialect.name}</td>
                </tr>
                <tr>
                    <th>Form:</th>
                    <td>
                        <StemNumberComponent rootType={root.type} stem={data.stem} />
                        {" "}
                        {stem1ctx === undefined ? null : ConjugationSchemeToString(stem1ctx.scheme)}
                        {" "}
                        <VerbFormComponent dialectType={dialectType} root={root} stem={this.data!.stem as any} stem1Context={this.data!.stem1Context} />
                    </td>
                </tr>
                <tr>
                    <th>Active participle اِسْم الْفَاعِل:</th>
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(dialectType, this.rootRadicals, data.stem, Voice.Active, stem1ctx), past)}</td>
                </tr>
                <tr>
                    <th>Passive participle اِسْم الْمَفْعُول:</th>
                    <td>{RenderWithDiffHighlights(this.conjugationService.ConjugateParticiple(dialectType, this.rootRadicals, data.stem, Voice.Passive, stem1ctx), past)}</td>
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