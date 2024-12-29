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
import { ConjugationParams, AdjectiveDeclensionParams, Gender, Letter, Numerus, Person, Stem1Context, Tashkil, Tense, NounDeclensionParams, Voice, AdvancedStemNumber } from "../../Definitions";
import { DialectConjugator, NounInput, TargetNounDerivation } from "../../DialectConjugator";
import { RootType, VerbRoot } from "../../VerbRoot";
import { ConjugationVocalized, DisplayVocalized } from "../../Vocalization";
import { DerivePrefix } from "./prefix";
import { MSAConjugator } from "../msa/MSAConjugator";
import { AugmentRoot } from "./rootAugmentation";
import { _TODO_ToConjugationVocalized, _TODO_VowelToTashkil, ConjugatedWord, ConjugationItem, ConjugationRuleMatchResult } from "../../Conjugation";
import { DeriveSuffix, SuffixResult } from "./suffix";
import { ConjugationRuleMatcher } from "../../ConjugationRuleMatcher";

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

        const matched = new ConjugationRuleMatcher().Match(rootAugmentation, params);

        const prefix = DerivePrefix(matched.prefixVowel, matched.vowels[0], params);
        const suffix = DeriveSuffix(params);

        const constructed = this.Construct(matched, prefix, suffix);

        return _TODO_ToConjugationVocalized(constructed);
    }

    public ConjugateParticiple(root: VerbRoot, stem: number, voice: Voice, stem1Context?: Stem1Context | undefined): ConjugationVocalized[]
    {
        if(voice !== Voice.Active)
            return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.AlefMaksuraMarker }];
        
        switch(root.type)
        {
            case RootType.Defective:
            {
                switch(stem)
                {
                    case 5:
                    case 6:
                        const base = this.ConjugateBaseForm(root, stem);
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 1].letter = Letter.Ya;
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
                        ];
                }
            }
            break;

            case RootType.Hollow:
            {
                switch(stem)
                {
                    case 1:
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

                    case 8:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...this.ConjugateBaseForm(root, stem)
                        ];
                }
            }
            break;

            case RootType.Quadriliteral:
            {
                switch(stem)
                {
                    case 2:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...this.ConjugateBaseForm(root, stem)
                        ];
                }
            }
            break;

            case RootType.SecondConsonantDoubled:
            {
                switch(stem)
                {
                    case 1:
                        return [
                            { letter: root.r1, tashkil: Tashkil.Fatha },
                            { letter: Letter.Alef, tashkil: Tashkil.LongVowelMarker },
                            { letter: root.r2, tashkil: Tashkil.Kasra },
                            { letter: root.r3, tashkil: Tashkil.EndOfWordMarker },
                        ];
                }
            }
            break;

            case RootType.Sound:
            {
                switch(stem)
                {
                    case 5:
                    case 6:
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...this.ConjugateBaseForm(root, stem)
                        ];
                    case 8:
                        const base = this.ConjugateBaseForm(root, stem);
                        base[base.length - 2].tashkil = Tashkil.Kasra;
                        base[base.length - 3].tashkil = Tashkil.Kasra;
                        base[base.length - 3].emphasis = undefined;
                        return [
                            { letter: Letter.Mim, tashkil: Tashkil.Kasra },
                            ...base
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
                break;

            case RootType.HamzaOnR1:
                switch(stem)
                {
                    case 1:
                        return msaVersion;
                }
            break;

            case RootType.Hollow:
                switch(stem)
                {
                    case 3:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
                break;

            case RootType.Quadriliteral:
                switch(stem)
                {
                    case 1:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
                break;

            case RootType.Sound:
                switch(stem)
                {
                    case 1:
                    case 4:
                        return msaVersion;
                    case 2:
                        msaVersion[0].tashkil = Tashkil.Sukun;
                        return msaVersion;
                }
                break;
        }

        return [{ emphasis: true, letter: "TODO" as any, tashkil: Tashkil.AlefMaksuraMarker }];
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

    private Construct(rule: ConjugationRuleMatchResult, prefix: ConjugationItem[], suffix: SuffixResult): ConjugatedWord
    {
        const vowels = [...rule.vowels, suffix.previousVowel];
        let vowelIndex = 0;

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
}
