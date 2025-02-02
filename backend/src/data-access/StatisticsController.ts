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

import { Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { RootType, VerbRoot } from "openarabicconjugation/src/VerbRoot";
import { Dictionary, ObjectExtensions, Of } from "acts-util-core";
import { VerbsController, VerbUpdateData } from "./VerbsController";
import { RootsController } from "./RootsController";
import { Conjugator } from "openarabicconjugation/src/Conjugator";
import { WordsController } from "./WordsController";
import { DisplayVocalized, VocalizedToString } from "openarabicconjugation/src/Vocalization";
import { AdvancedStemNumber, Stem1Context } from "openarabicconjugation/src/Definitions";
import { DialectsService } from "../services/DialectsService";

interface DialectStatistics
{
    dialectId: number;
    wordsCount: number;
    verbsCount: number;
}

interface RootStatistics
{
    rootType: RootType;
    count: number;
}

interface VerbalNounFrequencies
{
    count: number;
    rootType: RootType;
    stem: number;
    stemChoiceIndex?: number;
    verbalNounIndex: number;
}

interface VerbStemStatistics
{
    stem: number;
    count: number;
}

interface VerbStem1Frequencies
{
    rootType: RootType;
    index: number;
    count: number;
}

interface DictionaryStatistics
{
    rootsCount: number;
    wordsCount: number;

    dialectCounts: DialectStatistics[];
    rootCounts: RootStatistics[];
    stemCounts: VerbStemStatistics[];
    stem1Freq: VerbStem1Frequencies[];
    verbalNounFreq: VerbalNounFrequencies[];
}

@Injectable
export class StatisticsController
{
    constructor(private dbController: DatabaseController, private verbsController: VerbsController, private rootsController: RootsController,
        private wordsController: WordsController, private dialectsService: DialectsService)
    {
    }

    public async QueryStatistics(): Promise<DictionaryStatistics>
    {
        const document = await this.dbController.GetDocumentDB();

        return {
            rootsCount: document.roots.length,
            wordsCount: document.words.length,
            /*dialectCounts: await this.QueryDialectCounts(),
            rootCounts: await this.QueryRootCounts(),
            stemCounts: await this.QueryStemCounts(),
            stem1Freq: await this.QueryStem1Frequencies(),
            verbalNounFreq: await this.QueryVerbalNounFrequencies()*/
            dialectCounts: [],
            rootCounts: [],
            stemCounts: [],
            stem1Freq: [],
            verbalNounFreq: []
        };
    }

    //Private methods
    private GenerateStemData(rootType: RootType, verbData: VerbUpdateData): AdvancedStemNumber | Stem1Context
    {
        if(verbData.stem1Context === undefined)
            return verbData.stem as AdvancedStemNumber;

        return this.dialectsService.GetDialectMetaData(verbData.dialectId).CreateStem1Context(rootType, verbData.stem1Context);
    }

    private async QueryDialectCounts()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const verbs = await conn.Select("SELECT COUNT(DISTINCT verbId) as cnt, dialectId FROM `verbs_translations` GROUP BY dialectId");
        const words = await conn.Select("SELECT COUNT(DISTINCT wf.id) as cnt, wft.dialectId FROM `words_functions` wf INNER JOIN `words_functions_translations` wft ON wft.wordFunctionId = wf.id GROUP BY wft.dialectId");

        const dialectCounts: DialectStatistics[] = [];
        for (const row of verbs)
            dialectCounts.push({ dialectId: row.dialectId, verbsCount: parseInt(row.cnt), wordsCount: 0});

        for (const row of words)
        {
            const count = parseInt(row.cnt);
            const entry = dialectCounts.find(x => x.dialectId === row.dialectId);
            if(entry === undefined)
                dialectCounts.push({ dialectId: row.dialectId, verbsCount: 0, wordsCount: count });
            else
                entry.wordsCount = count;
        }

        return dialectCounts;
    }

    private async QueryRootCounts()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT radicals FROM roots");
        return rows.Values().Map(x => new VerbRoot(x.radicals)).GroupBy(x => x.type).Map<RootStatistics>(x => ({
            count: x.value.length,
            rootType: x.key
        })).ToArray();
    }

    private async QueryStemCounts()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT stem, COUNT(*) AS cnt FROM verbs GROUP BY stem");
        return rows.map(row => Of<VerbStemStatistics>({
            count: parseInt(row.cnt),
            stem: row.stem
        }));
    }

    private async QueryStem1Frequencies()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        const rows = await conn.Select("SELECT id FROM verbs WHERE stem = 1");

        const dict: Dictionary<VerbStem1Frequencies> = {};
        for (const row of rows)
        {
            const verb = await this.verbsController.QueryVerb(row.id);
            const rootData = await this.rootsController.QueryRoot(verb!.rootId);

            const root = new VerbRoot(rootData!.radicals);
            const choices = this.dialectsService.GetDialectMetaData(verb!.dialectId).GetStem1ContextChoices(root);

            const index = choices.types.indexOf(verb!.stem1Context!);

            const key = [root.type, index].join("_");
            const obj = dict[key];
            if(obj === undefined)
            {
                dict[key] = {
                    count: 1,
                    index,
                    rootType: root.type
                };
            }
            else
                obj.count++;
        }

        return ObjectExtensions.Values(dict).NotUndefined().ToArray();
    }

    private async QueryVerbalNounFrequencies()
    {
        function VocalizedArrayToString(vocalized: DisplayVocalized[]): string
        {
            return vocalized.Values().Map(VocalizedToString).Join("");
        }

        const conjugator = new Conjugator();

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();
        const rows = await conn.Select("SELECT wordId, verbId FROM words_verbs WHERE type = 1");

        const dict: Dictionary<VerbalNounFrequencies> = {};
        for (const row of rows)
        {
            const verbData = await this.verbsController.QueryVerb(row.verbId);
            const rootData = await this.rootsController.QueryRoot(verbData!.rootId);

            const root = new VerbRoot(rootData!.radicals);
            const generated = conjugator.GenerateAllPossibleVerbalNouns(root, this.GenerateStemData(root.type, verbData!));
            const verbalNounPossibilities = generated.map(VocalizedArrayToString);

            const wordData = await this.wordsController.QueryWord(row.wordId);
            const verbalNounIndex = verbalNounPossibilities.indexOf(wordData!.word);

            let stemKey = verbData!.stem.toString();
            let stemChoiceIndex;
            if(verbData?.stem === 1)
            {
                stemChoiceIndex = this.dialectsService.GetDialectMetaData(verbData.dialectId).GetStem1ContextChoices(root).types.indexOf(verbData.stem1Context!);
                stemKey += "_" + stemChoiceIndex;
            }

            const key = [root.type, stemKey, verbalNounIndex].join("_");
            const obj = dict[key];
            if(obj === undefined)
            {
                dict[key] = {
                    count: 1,
                    rootType: root.type,
                    stem: verbData!.stem,
                    stemChoiceIndex,
                    verbalNounIndex,
                };
            }
            else
                obj.count++;
        }

        return ObjectExtensions.Values(dict).NotUndefined().ToArray();
    }
}