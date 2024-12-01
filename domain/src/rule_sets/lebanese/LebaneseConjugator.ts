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
import { ConjugationParams, AdjectiveDeclensionParams, Gender, Letter, Numerus, Person, Stem1Context, Tashkil, Tense, NounDeclensionParams, Voice, AdvancedStemNumber, Mood } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
import { DerivePrefix } from "./prefix";
import { MSAConjugator } from "../msa/MSAConjugator";
import { AugmentRoot } from "./rootAugmentation";
import { _TODO_ToConjugationVocalized, _TODO_VowelToTashkil, ConjugatedWord, ConjugationItem, ConjugationRule } from "../../Conjugation";
import { DeriveSuffix, SuffixResult } from "./suffix";
import { DoesPresentSuffixStartWithWawOrYa } from "../msa/conjugation/suffix";

//Source is mostly: https://en.wikipedia.org/wiki/Levantine_Arabic_grammar

export class LebaneseConjugator implements DialectConjugator
{
    //Public methods    
    public Conjugate(root: VerbRoot, params: ConjugationParams): ConjugationVocalized[]
    {
        const rootAugmentation = AugmentRoot(root, params);
        if(rootAugmentation === undefined)
        {
            return [
                {
                    letter: "TODO" as any,
                    tashkil: Tashkil.Dhamma
                }
            ];
        }

        const rule = this.MatchRule(root, rootAugmentation, params);
        const prefix = DerivePrefix(rule.vowels, params);
        const suffix = DeriveSuffix(params);

        const constructed = this.Construct(rule, prefix, suffix, ((params.tense === Tense.Present) && (params.mood !== Mood.Imperative)));

        return _TODO_ToConjugationVocalized(constructed);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context | undefined): ConjugationVocalized[]
    {
        switch(root.type)
        {
            case RootType.Hollow:
            {
                if((stem === 1) && (voice === Voice.Active))
                {
                    if(root.radicalsAsSeparateLetters.Equals([Letter.Jiim, Letter.Ya, Letter.Hamza]))
                    {
                        return [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: Letter.Ya, tashkil: Tashkil.EndOfWordMarker }
                        ];
                    }

                    return [
                        { letter: root.r1, tashkil: Tashkil.Fatha },
                        { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                        { letter: Letter.Ya, tashkil: Tashkil.Kasra },
                        { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                    ];
                }
                else if((stem === 8) && (voice === Voice.Active))
                {
                    return [
                        { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                        ...this.ConjugateBaseForm(root, stem)
                    ];
                }
            }
            break;
        }

        const conjugator = new MSAConjugator;
        const msaVersion = conjugator.ConjugateParticiple(root, stem, voice, stem1Context);

        switch(root.type)
        {
            case RootType.Defective:
                switch(stem)
                {
                    case 1:
                        msaVersion[2].tashkil = Tashkil.Kasra;
                        msaVersion.push({
                            letter: Letter.Ya,
                            tashkil: Tashkil.LongVowelMarker
                        });
                        return msaVersion;
                }

            case RootType.Sound:
                switch(stem)
                {
                    case 2:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
        }

        return msaVersion;
    }

    public DeclineAdjective(vocalized: DisplayVocalized[], params: AdjectiveDeclensionParams): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }
    
    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        return [{ emphasis: true, letter: "TODO" as any, shadda: true, }];
    }

    //Private methods
    private ConjugateBaseForm(root: VerbRoot, stem: AdvancedStemNumber | Stem1Context)
    {
        if(typeof stem === "number")
        {
            return this.Conjugate(root, {
                gender: Gender.Male,
                tense: Tense.Perfect,
                numerus: Numerus.Singular,
                person: Person.Third,
                stem,
                voice: Voice.Active,
            });
        }

        return this.Conjugate(root, {
            gender: Gender.Male,
            tense: Tense.Perfect,
            numerus: Numerus.Singular,
            person: Person.Third,
            stem: 1,
            stem1Context: stem,
            voice: Voice.Active,
        });
    }

    private Construct(rule: ConjugationRule, prefix: ConjugationItem[], suffix: SuffixResult, hasPrefix: boolean): ConjugatedWord
    {
        const vowels = [...rule.vowels, suffix.previousVowel];
        let vowelIndex = hasPrefix ? 1 : 0;

        const items = prefix.concat(rule.symbols.map((x,i)=> ({
            consonant: x,
            followingVowel: vowels[vowelIndex++],
            emphasis: (i === rule.emphasize) ? true : undefined
        })));
        if(suffix.prefinal !== undefined)
            items.push(suffix.prefinal);

        if(suffix.final !== undefined)
        {
            if(typeof suffix.final === "string")
            {
                return {
                    items,
                    final: suffix.final
                };
            }
            else
                items.push(suffix.final);
        }
        return {
            items
        };
    }

    private MatchRule(root: VerbRoot, rules: ConjugationRule[], params: ConjugationParams)
    {
        function match(rule: ConjugationRule)
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

        for (const rule of rules)
        {
            if(match(rule))
                return rule;
        }
        console.log(root, rules, params);
        throw new Error("No rule match found");
    }
}
