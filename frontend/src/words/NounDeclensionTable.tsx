/**
 * ArabDict
 * Copyright (C) 2024 Amir Czwink (amir130@hotmail.de)
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

import { Component, Injectable, JSX_CreateElement } from "acfrontend";
import { CachedAPIService } from "../services/CachedAPIService";
import { Case, Gender, NounState, Numerus } from "arabdict-domain/src/Definitions";
import { FullWordData, WordWordDerivationType } from "../../dist/api";
import { DisplayVocalized, ParseVocalizedText } from "arabdict-domain/src/Vocalization";
import { RenderWithDiffHighlights } from "../shared/RenderWithDiffHighlights";
import { TargetNounDerivation } from "arabdict-domain/src/DialectConjugator";
import { ConjugationService } from "../services/ConjugationService";

@Injectable
export class NounDeclensionTable extends Component<{ word: FullWordData }>
{
    constructor(private cachedAPIService: CachedAPIService, private conjugationService: ConjugationService)
    {
        super();

        this.plurals = [];
    }

    protected Render(): RenderValue
    {
        return <table className="table table-sm table-bordered text-center">
            <tbody>
                {this.RenderNumerus(Numerus.Singular)}
                {this.RenderNumerus(Numerus.Dual)}
                {this.RenderNumerus(Numerus.Plural)}
            </tbody>
        </table>;
    }

    //State
    private plurals: FullWordData[];

    //Private methods
    private BuildBaseNoun(referenceWord: DisplayVocalized[], targetGender: Gender, targetNumerus: Numerus)
    {
        const ctx = this;
        function Singular()
        {
            if(ctx.input.word.isMale)
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
                    const plural = this.TryExtractPlural(targetGender);
                    if(plural !== undefined)
                        return ParseVocalizedText(plural);
                    return this.conjugationService.DeriveSoundNoun(singular, targetGender, TargetNounDerivation.DerivePluralSameGender);
                }
            case Numerus.Singular:
                return singular;
        }
    }

    private async LoadPlurals()
    {
        const plurals = this.input.word.derived.filter(x => x.relationType === WordWordDerivationType.Plural);
        this.plurals = await plurals.Values().Map(x => this.cachedAPIService.QueryWord(x.refWordId)).PromiseAll();
    }
    
    private RenderNumerus(numerus: Numerus)
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

        const hasMale = this.input.word.isMale;
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
                {this.RenderNumerusCase(numerus, Case.Nominative)}
            </tr>
            <tr>
                <td>Accusative</td>
                {this.RenderNumerusCase(numerus, Case.Accusative)}
            </tr>
            <tr>
                <td>Genitive</td>
                {this.RenderNumerusCase(numerus, Case.Genitive)}
            </tr>
        </fragment>;
    }

    private RenderNumerusCase(numerus: Numerus, c: Case)
    {
        const hasMale = this.input.word.isMale;
        return <fragment>
            {hasMale ? this.RenderNumerusCaseGender(numerus, c, Gender.Male) : null}
            {this.RenderNumerusCaseGender(numerus, c, Gender.Female)}
        </fragment>;
    }

    private RenderNumerusCaseGender(numerus: Numerus, c: Case, gender: Gender)
    {
        const inputWord = this.input.word.word;
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

    private TryExtractPlural(gender: Gender)
    {
        const plural = this.plurals.find(x => (gender === Gender.Male) ? x.isMale : !x.isMale);
        return plural?.word;
    }

    //Event handlers
    override OnInitiated(): void
    {
        this.LoadPlurals();
    }
}