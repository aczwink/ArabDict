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

import { Injectable } from "acfrontend";
import { Conjugator } from "arabdict-domain/src/Conjugator";
import { ReverseConjugator } from "arabdict-domain/src/ReverseConjugator";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { Property } from "../../../../ACTS-Util/core/dist/Observables/Property";
import { GetDialectMetadata } from "arabdict-domain/src/DialectsMetadata";
import { DisplayVocalized, ParseVocalizedText, VocalizedToString } from "arabdict-domain/src/Vocalization";
import { Stem1Context, ConjugationParams, Person, Tense, Voice, Gender, Numerus, Mood, TenseString, VoiceString, AdjectiveDeclensionParams, NounDeclensionParams, AdvancedStemNumber } from "arabdict-domain/src/Definitions";
import { NounInput, TargetNounDerivation } from "arabdict-domain/src/DialectConjugator";
import { DialectType } from "arabdict-domain/src/Dialects";

@Injectable
export class ConjugationService
{
    constructor()
    {
        this.conjugator = new Conjugator;
        this._canEdit = new Property(false);
    }

    //Properties
    public get canEdit()
    {
        return this._canEdit;
    }

    //Public methods
    public AnalyzeConjugation(conjugated: string)
    {
        const reverser = new ReverseConjugator(DialectType.ModernStandardArabic, ParseVocalizedText(conjugated));
        return reverser.AnalyzeConjugation();
    }

    public Conjugate(dialect: DialectType, rootRadicals: string, stem: number, tense: TenseString, voice: VoiceString, gender: Gender, person: Person, numerus: Numerus, mood: Mood, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);

        return this.conjugator.Conjugate(root, {
            stem: stem as any,
            tense: (tense === "perfect") ? Tense.Perfect : Tense.Present,
            voice: (voice === "active" ? Voice.Active : Voice.Passive),
            gender,
            person,
            numerus,
            mood,
            stem1Context: stem1Context as any,
        }, dialect);
    }

    public ConjugateToString(dialect: DialectType, root: VerbRoot, params: ConjugationParams)
    {
        const vocalized = this.conjugator.Conjugate(root, params, dialect);
        return this.VocalizedToString(vocalized);
    }

    public ConjugateToStringArgs(dialect: DialectType, rootRadicals: string, stem: number, tense: TenseString, voice: VoiceString, gender: Gender, person: Person, numerus: Numerus, mood: Mood, stem1Context?: Stem1Context)
    {
        const vocalized = this.Conjugate(dialect, rootRadicals, stem, tense, voice, gender, person, numerus, mood, stem1Context);
        return this.VocalizedToString(vocalized);
    }

    public ConjugateParticiple(dialect: DialectType, rootRadicals: string, stem: number, voice: Voice, stem1Context?: Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.ConjugateParticiple(dialect, root, stem, voice, stem1Context);
    }

    public DeclineAdjective(dialect: DialectType, word: string, params: AdjectiveDeclensionParams)
    {
        const declined = this.conjugator.DeclineAdjective(word, params, dialect);
        return this.VocalizedToString(declined);
    }

    public DeclineNoun(dialect: DialectType, inputNoun: NounInput, params: NounDeclensionParams)
    {
        return this.conjugator.DeclineNoun(inputNoun, params, dialect);
    }

    public DeriveSoundNoun(dialect: DialectType, singular: DisplayVocalized[], singularGender: Gender, target: TargetNounDerivation): DisplayVocalized[]
    {
        return this.conjugator.DeriveSoundNoun(singular, singularGender, target, dialect);
    }

    public GenerateAllPossibleVerbalNouns(rootRadicals: string, stem: AdvancedStemNumber | Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        const nouns = this.conjugator.GenerateAllPossibleVerbalNouns(root, stem);
        return nouns.map(this.VocalizedToString.bind(this));
    }

    public HasPotentiallyMultipleVerbalNounForms(rootRadicals: string, stem: AdvancedStemNumber | Stem1Context)
    {
        const root = new VerbRoot(rootRadicals);
        return this.conjugator.HasPotentiallyMultipleVerbalNounForms(root, stem);
    }

    public VocalizedToString(vocalized: DisplayVocalized[]): string
    {
        return vocalized.Values().Map(VocalizedToString).Join("");
    }

    //Private state
    private conjugator: Conjugator;
    private _canEdit: Property<boolean>;
}