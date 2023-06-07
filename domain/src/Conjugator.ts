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

import { CreateVerb, Stem1Context } from "./CreateVerb";
import { A3EIN, LAM, WAW } from "./Definitions";
import { Hamzate } from "./Hamza";
import { RootType, VerbRoot } from "./VerbRoot";
import { Tense, Voice, Gender, Person, Numerus } from "./VerbStem";
import { ParseVocalizedText } from "./Vocalization";
import { DialectDefinition } from "./rule_sets/Definitions";
import { definition as msaDef } from "./rule_sets/msa/dialectDefinition";

export enum DialectType
{
    ModernStandardArabic
}

interface ConjugationParams
{
    dialect: DialectType;
    tense: Tense;
    voice: Voice;
    gender: Gender;
    person: Person;
    numerus: Numerus;
    stem: number;
    stem1Context?: Stem1Context;
}

export class Conjugator
{
    //Public methods
    public Conjugate(root: VerbRoot, params: ConjugationParams)
    {
        const dialectDef = this.GetDialectDefiniton(params.dialect);
        const rules = this.ExtractRules(dialectDef, params.stem, params.tense, params.voice, root.type);
        if(rules !== undefined)
        {
            const rule = rules.find(r => (r.gender === params.gender) && (r.numerus === params.numerus) && (r.person === params.person) && (r.condition ? r.condition(params.stem1Context!) : true) );
            if(rule !== undefined)
            {
                const patternRadicals = this.GetPatternRadicals(root.type);

                const letters = ParseVocalizedText(rule.conjugation);

                const replaced = letters.map(x => {
                    const idx = patternRadicals.indexOf(x.letter);
                    if(idx === -1)
                        return x;
                    return {
                        letter: root.radicalsAsSeparateLetters[idx],
                        tashkil: x.tashkil
                    }
                });
                return Hamzate(...replaced);
            }
        }

        //call legacy api
        const verb = CreateVerb(root.radicalsAsSeparateLetters.join(""), params.stem, params.stem1Context);
        return verb.Conjugate(params.tense, params.voice, params.gender, params.person, params.numerus);
    }

    //Private methods
    private ExtractRules(dialectDef: DialectDefinition, stem: number, tense: Tense, voice: Voice, rootType: RootType)
    {
        const stemData = dialectDef.rules[stem];
        if(stemData === undefined)
            return undefined;
        const tenseData = stemData[tense];
        if(tenseData === undefined)
            return undefined;
        const voiceData = tenseData[voice];
        if(voiceData === undefined)
            return undefined;
        return voiceData[rootType]?.rules;
    }

    private GetDialectDefiniton(dialect: DialectType)
    {
        switch(dialect)
        {
            case DialectType.ModernStandardArabic:
                return msaDef;
        }
    }

    private GetPatternRadicals(type: RootType)
    {
        switch(type)
        {
            case RootType.Assimilated:
                return [WAW, A3EIN, LAM];
        }
        throw new Error("Method not implemented.");
    }
}