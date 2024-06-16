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

import { Anchor, BootstrapIcon, Component, Injectable, JSX_CreateElement, MatIcon, ProgressSpinner, Router, RouterButton, RouterState, TitleService } from "acfrontend";
import { APIService } from "../services/APIService";
import { FullWordData, VerbData, WordFunctionData, WordRelation, WordRootDerivationData, WordType, WordVerbDerivationData, WordVerbDerivationType, WordWordDerivationLink, WordWordDerivationType } from "../../dist/api";
import { RenderTranslations } from "../shared/translations";
import { WordDerivationTypeFromWordToString, WordRelationshipTypeToString, WordTypeToText } from "../shared/words";
import { RemoveTashkil } from "arabdict-domain/src/Util";
import { ConjugationService } from "../services/ConjugationService";
import { WordIdReferenceComponent } from "./WordReferenceComponent";
import { Stem1DataToStem1ContextOptional } from "../verbs/model";
import { Subscription } from "../../../../ACTS-Util/core/dist/main";
import { Case, Gender, Mood, NounState, Numerus, Person } from "arabdict-domain/src/Definitions";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { DisplayVocalized, ParseVocalizedText } from "arabdict-domain/src/Vocalization";
import { TargetNounDerivation } from "arabdict-domain/src/DialectConjugator";

@Injectable
export class ShowWordComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router, private conjugationService: ConjugationService, private titleService: TitleService)
    {
        super();

        this.wordId = parseInt(routerState.routeParams.wordId!);
        this.data = null;
        this.rootRadicals = "";
        this.editSubscription = this.conjugationService.canEdit.Subscribe(this.Update.bind(this));
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        const canEdit = this.conjugationService.canEdit.Get();
        return <fragment>
            <div className="row">
                <div className="col"><h1>Word: {this.data.word}</h1></div>
                <div className="col-auto">
                    {canEdit ? this.RenderEditControls() : null}
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Gender:</th>
                        <td>{this.RenderGender(this.data.isMale)}</td>
                    </tr>
                    {this.RenderDerivationData(this.data.derivation)}
                    <tr>
                        <th>Related:</th>
                        <td>{this.RenderRelations(this.data.related)}</td>
                    </tr>
                    <tr>
                        <th>Derived words/terms:</th>
                        <td>{this.RenderDerivedTerms()}</td>
                    </tr>
                    {this.RenderSingleFunction()}
                </tbody>
            </table>
            <a href={"https://en.wiktionary.org/wiki/" + RemoveTashkil(this.data.word)} target="_blank">See on Wiktionary</a>
            <br />
            {this.RenderMultipleFunctions()}
            <br />
            {canEdit ? <RouterButton className="btn btn-primary" route={"/words/add?relatedWordId=" + this.wordId}><BootstrapIcon>plus</BootstrapIcon> Add related word</RouterButton> : null}
        </fragment>;
    }

    //Private state
    private wordId: number;
    private data: FullWordData | null;
    private verb?: VerbData;
    private rootRadicals: string;
    private editSubscription: Subscription;

    //Private methods
    private BuildBaseNoun(referenceWord: DisplayVocalized[], targetGender: Gender, targetNumerus: Numerus)
    {
        const ctx = this;
        function Singular()
        {
            if(ctx.data!.isMale)
            {
                if(targetGender === Gender.Male)
                    return referenceWord;
                return ctx.conjugationService.DeriveSoundNoun(referenceWord, Gender.Male, TargetNounDerivation.DeriveFeminineSingular);
            }
            return referenceWord;
        }

        const singular = Singular();
        switch(targetNumerus)
        {
            case Numerus.Dual:
                return this.conjugationService.DeriveSoundNoun(singular, targetGender, TargetNounDerivation.DeriveDualSameGender);
            case Numerus.Plural:
                {
                    const plural = this.TryExtractPlural();
                    if(plural !== undefined)
                        return ParseVocalizedText(plural);
                    return this.conjugationService.DeriveSoundNoun(singular, targetGender, TargetNounDerivation.DerivePluralSameGender);
                }
            case Numerus.Singular:
                return singular;
        }
    }

    private TryExtractPlural()
    {
        const wordId = this.data?.derived.find(x => x.relationType === WordWordDerivationType.Plural)?.refWordId;
        if(wordId === undefined)
            return undefined;
        return "TODO: EXTRACT PLURAL";
    }

    private IsPlural()
    {
        if((this.data!.derivation !== undefined) && ("relationType" in this.data!.derivation))
            return this.data!.derivation.relationType === WordWordDerivationType.Plural;
        return false;
    }

    private RelationshipToText(relationType: WordWordDerivationType, outgoing: boolean)
    {
        if(outgoing)
            return WordDerivationTypeFromWordToString(relationType);

        switch(relationType)
        {
            case WordWordDerivationType.Feminine:
                return "male version";
            case WordWordDerivationType.Plural:
                return "singular";
            case WordWordDerivationType.Nisba:
                return "noun version";
            case WordWordDerivationType.Colloquial:
                return "فصحى version";
            case WordWordDerivationType.Extension:
                return "base";
            case WordWordDerivationType.ElativeDegree:
                return "positive degree";
        }
    }

    private RenderAdjectiveDeclensionTable()
    {
        const word = this.data!.word;

        const render = (definite: boolean, gender: Gender, c: Case) => this.conjugationService.DeclineAdjective(word, {
            definite,
            gender,
            case: c
        });

        return <table className="table table-sm table-bordered text-center">
            <thead>
                <tr>
                    <th>Singular</th>
                    <th colSpan="2">Masculine</th>
                    <th colSpan="2">Feminine</th>
                </tr>
                <tr>
                    <th> </th>
                    <th>Indefinite</th>
                    <th>Definite</th>
                    <th>Indefinite</th>
                    <th>Definite</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nominative</td>
                    <td>{render(false, Gender.Male, Case.Nominative)}</td>
                    <td>{render(true, Gender.Male, Case.Nominative)}</td>
                    <td>{render(false, Gender.Female, Case.Nominative)}</td>
                    <td>{render(true, Gender.Female, Case.Nominative)}</td>
                </tr>
            </tbody>
        </table>;
    }

    private RenderDerivationData(derivation?: WordRootDerivationData | WordVerbDerivationData | WordWordDerivationLink)
    {
        if(derivation === undefined)
            return null;

        if("rootId" in derivation)
            return this.RenderRootDerivationData(derivation);
        if("verbId" in derivation)
            return this.RenderVerbDerivationData(derivation);
        return this.RenderWordDerivationData(derivation);
    }

    private RenderDerivedTerm(outgoing: boolean, relation: WordWordDerivationLink)
    {
        return <fragment>{this.RelationshipToText(relation.relationType, outgoing)} of <WordIdReferenceComponent wordId={relation.refWordId} /></fragment>;
    }

    private RenderDerivedTerms()
    {
        if(this.data!.derived.length === 0)
            return null;

        return <ul>{this.data!.derived.map(x => <li>{this.RenderDerivedTerm(false, x)}</li>)}</ul>;
    }

    private RenderEditControls()
    {
        return <fragment>
            <Anchor route={"words/" + this.data!.id + "/edit"}><MatIcon>edit</MatIcon></Anchor>
            <a href="#" className="link-danger" onclick={this.OnDeleteWord.bind(this)}><BootstrapIcon>trash</BootstrapIcon></a>
        </fragment>;
    }
    
    private RenderFunction(func: WordFunctionData)
    {
        return <fragment>
            <h4>{WordTypeToText(func.type)}</h4>
            {RenderTranslations(func.translations)}
            {this.RenderWordDeclensionTables(func.type)}
        </fragment>;
    }

    private RenderGender(isMale: boolean | null)
    {
        if(isMale)
            return "male";
        else if(isMale === false)
            return "female";
        return "unknown";
    }

    private RenderMultipleFunctions()
    {
        if(this.data!.functions.length < 2)
            return null;
        
        const result = [];

        for (const func of this.data!.functions)
        {
            const rendered = this.RenderFunction(func);
            if(result.length > 0)
                result.push(<hr />);
            result.push(rendered);
        }

        return result;
    }

    private RenderNounDeclensionTable()
    {
        if(this.IsPlural())
            return null;

        return <table className="table table-sm table-bordered text-center">
            <tbody>
                {this.RenderNounDeclensionTableNumerus(Numerus.Singular)}
                {this.RenderNounDeclensionTableNumerus(Numerus.Dual)}
                {this.RenderNounDeclensionTableNumerus(Numerus.Plural)}
            </tbody>
        </table>;
    }

    private RenderNounDeclensionTableNumerus(numerus: Numerus)
    {
        function headline()
        {
            switch(numerus)
            {
                case Numerus.Dual:
                    return "Dual";
                case Numerus.Plural:
                    return "Plural";
                case Numerus.Singular:
                    return "Singular";
            }
        }

        const hasMale = this.data!.isMale;
        const cols = [
            <th>Indefinite</th>,
            <th>Definite</th>,
            <th>Construct</th>
        ];
        return <fragment>
            <tr>
                <th>{headline()}</th>
                {hasMale ? <th colSpan="3">Masculine</th> : null}
                <th colSpan="3">Feminine</th>
            </tr>
            <tr>
                <th> </th>
                {hasMale ? cols : null}
                {...cols}
            </tr>
            
            <tr>
                <td>Nominative</td>
                {this.RenderNounDeclensionTableNumerusCase(numerus, Case.Nominative)}
            </tr>
            <tr>
                <td>Accusative</td>
                {this.RenderNounDeclensionTableNumerusCase(numerus, Case.Accusative)}
            </tr>
            <tr>
                <td>Genitive</td>
                {this.RenderNounDeclensionTableNumerusCase(numerus, Case.Genitive)}
            </tr>
        </fragment>;
    }

    private RenderNounDeclensionTableNumerusCase(numerus: Numerus, c: Case)
    {
        const hasMale = this.data!.isMale;
        return <fragment>
            {hasMale ? this.RenderNounDeclensionTableNumerusCaseGender(numerus, c, Gender.Male) : null}
            {this.RenderNounDeclensionTableNumerusCaseGender(numerus, c, Gender.Female)}
        </fragment>;
    }

    private RenderNounDeclensionTableNumerusCaseGender(numerus: Numerus, c: Case, gender: Gender)
    {
        const inputWord = this.data!.word;
        const parsed = ParseVocalizedText(inputWord);
        const base = this.BuildBaseNoun(parsed, gender, numerus);

        const render = (state: NounState) => RenderWithDiffHighlights(this.conjugationService.DeclineNoun({
            gender,
            numerus,
            vocalized: base
        }, {
            state,
            case: c,
        }), parsed);

        return <fragment>
            <td>{render(NounState.Indefinite)}</td>
            <td>{render(NounState.Definite)}</td>
            <td>{render(NounState.Construct)}</td>
        </fragment>;
    }

    private RenderRelation(related: WordRelation)
    {
        return <li>
            {WordRelationshipTypeToString(related.relationType)} of <WordIdReferenceComponent wordId={related.relatedWordId} />
        </li>;
    }

    private RenderRelations(related: WordRelation[])
    {
        return <ul>
            {related.map(this.RenderRelation.bind(this))}
        </ul>;
    }

    private RenderRootDerivationData(rootData: WordRootDerivationData)
    {
        return <tr>
            <th>Derived from root:</th>
            <td><Anchor route={"/roots/" + rootData.rootId}>{this.rootRadicals.split("").join("-")}</Anchor></td>
        </tr>;
    }

    private RenderSingleFunction()
    {
        if(this.data!.functions.length !== 1)
            return null;

        const func = this.data!.functions[0];
        return <fragment>
            <tr>
                <th>Type:</th>
                <td>{WordTypeToText(func.type)}</td>
            </tr>
            <tr>
                <th>Translation:</th>
                <td>{RenderTranslations(func.translations)}</td>
            </tr>
            <tr>
                <th>Declension:</th>
                <td>{this.RenderWordDeclensionTables(func.type)}</td>
            </tr>
        </fragment>;
    }

    private RenderVerbDerivationData(verbData: WordVerbDerivationData)
    {
        function DerivationText()
        {
            switch(verbData.type)
            {
                case WordVerbDerivationType.ActiveParticiple:
                    return "active participle of ";
                case WordVerbDerivationType.PassiveParticiple:
                    return "passive participle of ";
                case WordVerbDerivationType.Unknown:
                    return "";
                case WordVerbDerivationType.VerbalNoun:
                    return "verbal noun of ";
            }
        }
        const conjugated = this.conjugationService.ConjugateToStringArgs(this.rootRadicals, this.verb!.stem, "perfect", "active", Gender.Male, Person.Third, Numerus.Singular, Mood.Indicative, Stem1DataToStem1ContextOptional(this.verb!.stem1Data));

        return <tr>
            <th>Derived from verb:</th>
            <td>{DerivationText()}<Anchor route={"/verbs/" + verbData.verbId}>{conjugated}</Anchor></td>
        </tr>;
    }

    private RenderWordDeclensionTables(wordType: WordType)
    {
        switch(wordType)
        {
            case WordType.Adjective:
                return this.RenderAdjectiveDeclensionTable();
            case WordType.Noun:
                return this.RenderNounDeclensionTable();
        }
        return null;
    }

    private RenderWordDerivationData(derivation: WordWordDerivationLink)
    {
        return <tr>
            <th>Derived from word:</th>
            <td>{this.RenderDerivedTerm(true, derivation)}</td>
        </tr>;
    }

    //Event handlers
    private async OnDeleteWord(event: Event)
    {
        event.preventDefault();

        if(confirm("Are you sure that you want to delete the word: " + this.data!.word + "?"))
        {
            const word = this.data!;
            this.data = null;
            await this.apiService.words._any_.delete(this.wordId);

            if(word.derivation === undefined)
                this.router.RouteTo("/underived_words");
            else if("rootId" in word.derivation)
                this.router.RouteTo("/roots/" + word.derivation.rootId);
            else if("verbId" in word.derivation)
                this.router.RouteTo("/verbs/" + word.derivation.verbId);
            else
                this.router.RouteTo("/underived_words");
        }
    }

    override async OnInitiated(): Promise<void>
    {
        const response = await this.apiService.words._any_.get(this.wordId);
        if(response.statusCode !== 200)
            throw new Error("TODO: implement me");

        if(response.data.derivation !== undefined)
        {
            let rootId;
            if("rootId" in response.data.derivation)
                rootId = response.data.derivation.rootId;
            else if("verbId" in response.data.derivation)
            {
                const response2 = await this.apiService.verbs.get({ verbId: response.data.derivation.verbId });
                if(response2.statusCode !== 200)
                    throw new Error("TODO: implement me");
                this.verb = response2.data;
                rootId = response2.data.rootId;
            }

            if(rootId !== undefined)
            {
                const response3 = await this.apiService.roots._any_.get(rootId);
                if(response3.statusCode !== 200)
                    throw new Error("TODO: implement me");
                this.rootRadicals = response3.data.radicals;
            }
        }
            
        this.data = response.data;
        this.titleService.title = this.data.word;
    }

    override OnUnmounted(): void
    {
        this.editSubscription.Unsubscribe();
    }
}