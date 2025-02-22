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

import { Anchor, Component, Injectable, JSX_CreateElement, ProgressSpinner, Router, RouterState, TitleService } from "acfrontend";
import { APIService } from "../services/APIService";
import { FullWordData, OpenArabDictNonVerbDerivationType, OpenArabDictVerbDerivationType, OpenArabDictWordType, VerbData, WordFunctionData, WordRelation, WordRootDerivationData, WordVerbDerivationData, WordWordDerivationLink } from "../../dist/api";
import { RenderTranslations } from "../shared/translations";
import { WordDerivationTypeFromWordToString, WordRelationshipTypeToString, WordTypeToText } from "../shared/words";
import { RemoveTashkil } from "openarabicconjugation/src/Util";
import { ConjugationService } from "../services/ConjugationService";
import { WordIdReferenceComponent } from "./WordReferenceComponent";
import { Stem1DataToStem1ContextOptional } from "../verbs/model";
import { Case, Gender, Numerus, Person, Tense, Voice } from "openarabicconjugation/src/Definitions";
import { NounDeclensionTable } from "./NounDeclensionTable";
import { DialectType } from "openarabicconjugation/src/Dialects";
import { DialectsService } from "../services/DialectsService";
import { VerbRoot } from "openarabicconjugation/src/VerbRoot";

@Injectable
export class ShowWordComponent extends Component
{
    constructor(private apiService: APIService, routerState: RouterState, private router: Router, private conjugationService: ConjugationService,
        private titleService: TitleService, private dialectsService: DialectsService)
    {
        super();

        this.wordId = parseInt(routerState.routeParams.wordId!);
        this.data = null;
        this.rootRadicals = "";
    }

    protected Render(): RenderValue
    {
        if(this.data === null)
            return <ProgressSpinner />;

        return <fragment>
            <div className="row">
                <h1>Word: {this.data.word}</h1>
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
        </fragment>;
    }

    //Private state
    private wordId: number;
    private data: FullWordData | null;
    private verb?: VerbData;
    private rootRadicals: string;

    //Private methods
    private RelationshipToText(relationType: OpenArabDictNonVerbDerivationType, outgoing: boolean)
    {
        if(outgoing)
            return WordDerivationTypeFromWordToString(relationType);

        switch(relationType)
        {
            case OpenArabDictNonVerbDerivationType.Feminine:
                return "male version";
            case OpenArabDictNonVerbDerivationType.Plural:
                return "singular";
            case OpenArabDictNonVerbDerivationType.Nisba:
                return "noun version";
            case OpenArabDictNonVerbDerivationType.Colloquial:
                return "فصحى version";
            case OpenArabDictNonVerbDerivationType.Extension:
                return "base";
            case OpenArabDictNonVerbDerivationType.ElativeDegree:
                return "positive degree";
            case OpenArabDictNonVerbDerivationType.Singulative:
                return "collective";
        }
    }

    private RenderAdjectiveDeclensionTable()
    {
        const word = this.data!.word;

        const render = (definite: boolean, gender: Gender, c: Case) => this.conjugationService.DeclineAdjective(DialectType.ModernStandardArabic, word, {
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

    private RenderRelation(related: WordRelation)
    {
        return <li>
            {WordRelationshipTypeToString(related.relationType as any)} of <WordIdReferenceComponent wordId={related.relatedWordId} />
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
                case OpenArabDictVerbDerivationType.ActiveParticiple:
                    return "active participle of ";
                case OpenArabDictVerbDerivationType.PassiveParticiple:
                    return "passive participle of ";
                case OpenArabDictVerbDerivationType.Unknown:
                    return "";
                case OpenArabDictVerbDerivationType.VerbalNoun:
                    return "verbal noun of ";
            }
        }
        const dialectType = this.dialectsService.MapIdToType(this.verb!.dialectId);
        const root = new VerbRoot(this.rootRadicals);
        const conjugated = this.conjugationService.ConjugateToString(dialectType, root, {
            gender: Gender.Male,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: this.verb!.stem as any,
            stem1Context: Stem1DataToStem1ContextOptional(DialectType.ModernStandardArabic, root.DeriveDeducedVerbConjugationScheme(), this.verb!.stem1Context),
            voice: Voice.Active
        });

        return <tr>
            <th>Derived from verb:</th>
            <td>{DerivationText()}<Anchor route={"/verbs/" + verbData.verbId}>{conjugated}</Anchor></td>
        </tr>;
    }

    private RenderWordDeclensionTables(wordType: OpenArabDictWordType)
    {
        switch(wordType)
        {
            case OpenArabDictWordType.Adjective:
                return this.RenderAdjectiveDeclensionTable();
            case OpenArabDictWordType.Noun:
                return <NounDeclensionTable word={this.data!} />;
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
}