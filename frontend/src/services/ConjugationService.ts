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

import { Injectable } from "acfrontend";
import { Conjugator, DialectType } from "arabdict-domain/src/Conjugator";
import { ReverseConjugator } from "arabdict-domain/src/ReverseConjugator";
import { RootType, VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Property } from "../../../../ACTS-Util/core/dist/Observables/Property";
import { GetDialectMetadata } from "arabdict-domain/src/DialectsMetadata";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "arabdict-domain/src/Vocalization";
import { Stem1Context, ConjugationParams, Person, Tense, Voice, Gender, Numerus, Mood, TenseString, VoiceString, AdjectiveDeclensionParams, NounDeclensionParams, StemNumber, Tashkil, Letter } from "arabdict-domain/src/Definitions";
import { NounInput, TargetNounDerivation } from "arabdict-domain/src/DialectConjugator";

@Injectable
export class ConjugationService
{
    constructor()
    {
        this.conjugator = new Conjugator;
        this._canEdit = new Property(false);
        this._globalDialect = new Property(DialectType.ModernStandardArabic);
        this._TODO_informedSet = new Set();
    }

    //Properties
    public get canEdit()
    {
        return this._canEdit;
    }

    public get globalDialect()
    {
        return this._globalDialect;
    }

    public get globalDialectMetaData()
    {
        return GetDialectMetadata(this._globalDialect.Get());
    }

    //Public methods
    public AnalyzeConjugation(conjugated: string)
    {
        const reverser = new ReverseConjugator(this._globalDialect.Get(), ParseVocalizedText(conjugated));
        return reverser.AnalyzeConjugation();
    }

    public Conjugate(rootRadicals: string, stem: number, tense: TenseString, voice: VoiceString, gender: Gender, person: Person, numerus: Numerus, mood: Mood, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);

        this._TODO_CheckConjugation(root, {
            stem: stem as any,
            tense: (tense === "perfect") ? Tense.Perfect : Tense.Present,
            voice: (voice === "active" ? Voice.Active : Voice.Passive),
            gender,
            person,
            numerus,
            mood,
            stem1Context: stem1Context as any,
        });

        return this.conjugator.Conjugate(root, {
            stem: stem as any,
            tense: (tense === "perfect") ? Tense.Perfect : Tense.Present,
            voice: (voice === "active" ? Voice.Active : Voice.Passive),
            gender,
            person,
            numerus,
            mood,
            stem1Context: stem1Context as any,
        }, this._globalDialect.Get());
    }

    public ConjugateToString(root: VerbRoot, params: ConjugationParams)
    {
        this._TODO_CheckConjugation(root, params);

        const vocalized = this.conjugator.Conjugate(root, params, this._globalDialect.Get());
        return this.VocalizedToString(vocalized);
    }

    public ConjugateToStringArgs(rootRadicals: string, stem: number, tense: TenseString, voice: VoiceString, gender: Gender, person: Person, numerus: Numerus, mood: Mood, stem1Context?: Stem1Context)
    {
        const vocalized = this.Conjugate(rootRadicals, stem, tense, voice, gender, person, numerus, mood, stem1Context);
        return this.VocalizedToString(vocalized);
    }

    public ConjugateParticiple(rootRadicals: string, stem: number, voice: Voice, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.ConjugateParticiple(this._globalDialect.Get(), root, stem, voice, stem1Context);
    }

    public DeclineAdjective(word: string, params: AdjectiveDeclensionParams)
    {
        const declined = this.conjugator.DeclineAdjective(word, params, this._globalDialect.Get());
        return this.VocalizedToString(declined);
    }

    public DeclineNoun(inputNoun: NounInput, params: NounDeclensionParams)
    {
        return this.conjugator.DeclineNoun(inputNoun, params, this._globalDialect.Get());
    }

    public DeriveSoundNoun(singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        return this.conjugator.DeriveSoundNoun(singular, singularGender, target, this._globalDialect.Get());
    }

    public GenerateAllPossibleVerbalNouns(rootRadicals: string, stem: StemNumber)
    {
        const root = new VerbRoot(rootRadicals);
        const nouns = this.conjugator.GenerateAllPossibleVerbalNouns(this._globalDialect.Get(), root, stem);
        return nouns.map(this.VocalizedToString.bind(this));
    }

    public VocalizedToString(vocalized: DisplayVocalized[]): string
    {
        return vocalized.Values().Map(VocalizedToString).Join("");
    }

    //Private state
    private conjugator: Conjugator;
    private _canEdit: Property<boolean>;
    private _globalDialect: Property<DialectType>;

    //TODO: remove this
    private _TODO_informedSet: Set<string>;
    private _TODO_CheckConjugation(root: VerbRoot, params: ConjugationParams)
    {
        const needNothing = 0;
        const needPassive = 1;
        const need = 2;

        function IsSpecial()
        {
            //doubly weak ones
            if( (root.r1 === Letter.Hamza) && (root.r2 === root.r3) )
                return need;
            if( (root.r1 === Letter.Hamza) && (root.r3 === Letter.Ya) && (params.stem === 4) )
                return need;
            if( (root.r1 === Letter.Waw) && ((root.r3 === Letter.Waw) || (root.r3 === Letter.Ya)) && (params.stem === 4) )
                return need;
            if( (root.r1 === Letter.Waw) && ((root.r3 === Letter.Waw) || (root.r3 === Letter.Ya)) && (params.stem === 8) )
                return need;

            switch(params.stem)
            {
                case 1:
                    switch(root.type)
                    {
                        case RootType.Assimilated:
                        {
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Fatha) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Fatha))
                                return needPassive;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Kasra) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Fatha))
                                return need;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Fatha) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma))
                                return need;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Dhamma) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma))
                                return need;
                        }
                        break;
                        case RootType.HamzaOnR1:
                            return need;
                        case RootType.Hollow:
                        {
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Dhamma) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma))
                                return needPassive;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Kasra) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Kasra))
                                return need;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Dhamma) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Fatha))
                                return need;
                        }
                        break;
                        case RootType.SecondConsonantDoubled:
                        {
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Fatha) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Fatha))
                                return need;
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Kasra) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Fatha))
                                return needPassive;
                        }
                        break;
                        case RootType.Sound:
                        {
                            if((params.stem1Context.middleRadicalTashkil === Tashkil.Dhamma) && (params.stem1Context.middleRadicalTashkilPresent === Tashkil.Dhamma))
                                return need;
                        }
                        break;
                    }
                    break;
                case 2:
                    switch(root.type)
                    {
                        case RootType.DoublyWeak_WawOnR1_WawOrYaOnR3:
                            return needPassive;
                        case RootType.Quadriliteral:
                            return need;
                    }
                    break;
                case 4:
                    switch(root.type)
                    {
                        case RootType.Quadriliteral:
                            return needPassive;
                    }
                    break;
                case 6:
                    switch(root.type)
                    {
                        case RootType.Defective:
                        case RootType.Sound:
                            return needPassive;
                        case RootType.SecondConsonantDoubled:
                            return need;
                    }
                    break;
                case 7:
                    switch(root.type)
                    {
                        case RootType.Defective:
                        case RootType.Hollow:
                        case RootType.SecondConsonantDoubled:
                            return need;
                        case RootType.Sound:
                            return needPassive;
                    }
                    break;
                case 8:
                    switch(root.type)
                    {
                        case RootType.SecondConsonantDoubled:
                            return needPassive;
                    }
                    break;
            }
            return needNothing;
        }

        const special = IsSpecial();
        if(special === needNothing)
            return;

        const typeKey = (params.stem === 1) ? (params.stem1Context.middleRadicalTashkil + params.stem1Context.middleRadicalTashkilPresent) : "";
        const key = root.ToString() + params.stem + typeKey;
        if(this._TODO_informedSet.has(key))
            return;
        this._TODO_informedSet.add(key);

        switch(special)
        {
            case needPassive:
                alert("CHECK WIKTIONARY IF PASSIVE EXISTS AND WRITE TEST!");
                break;
            case need:
                alert("CHECK WIKTIONARY AND WRITE TEST!");
                break;
        }
    }
}