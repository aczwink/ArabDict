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

import { ConjugationRule, ConjugationRuleMatchResult } from "./Conjugation";
import { ConjugationParams, Tense } from "./Definitions";
import { DoesPresentSuffixStartWithWawOrYa } from "./rule_sets/msa/conjugation/suffix";

export class ConjugationRuleMatcher
{
    constructor()
    {
        this.evaluated = {
            conditions: {}
        };
    }

    public Match(rules: ConjugationRule[], params: ConjugationParams): ConjugationRuleMatchResult
    {
        this.MatchAgainstRules(rules, params);

        if(this.evaluated.symbols === undefined)
            throw new Error("No symbols could be matched");
        if(this.evaluated.vowels === undefined)
            throw new Error("No vowels could be matched");

        return {
            emphasize: this.evaluated.emphasize,
            prefixVowel: this.evaluated.prefixVowel,
            symbols: this.evaluated.symbols,
            vowels: this.evaluated.vowels,
        };
    }

    //Private methods
    private DoConditionsMatch(rule: ConjugationRule, params: ConjugationParams)
    {
        const c = rule.conditions;

        if((c.tense !== undefined) && (c.tense !== params.tense))
            return false;
        if((c.mood !== undefined) && (params.tense === Tense.Present) && (c.mood !== params.mood))
            return false;
        if((c.numerus !== undefined) && (c.numerus !== params.numerus))
            return false;
        if((c.person !== undefined) && (c.person !== params.person))
            return false;
        if((c.gender !== undefined) && (c.gender !== params.gender))
            return false;
        if((c.hasPresentSuffix === true) && (params.tense === Tense.Present) && !DoesPresentSuffixStartWithWawOrYa(params.person, params.numerus, params.gender))
            return false;

        return true;
    }

    private MatchAgainstRules(rules: ConjugationRule[], params: ConjugationParams)
    {
        for (const rule of rules)
        {
            if(this.DoConditionsMatch(rule, params))
            {
                this.evaluated.emphasize = rule.emphasize ?? this.evaluated.emphasize;
                this.evaluated.prefixVowel = rule.prefixVowel ?? this.evaluated.prefixVowel;
                this.evaluated.symbols = rule.symbols ?? this.evaluated.symbols;
                this.evaluated.vowels = rule.vowels ?? this.evaluated.vowels;

                if(rule.children !== undefined)
                    this.MatchAgainstRules(rule.children, params);
                break;
            }
        }
    }

    //State
    private evaluated: ConjugationRule;
}