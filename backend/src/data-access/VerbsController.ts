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

import { Injectable } from "acts-util-node";
import { DatabaseController } from "./DatabaseController";
import { TranslationEntry, TranslationsController } from "./TranslationsController";
import { RootsController } from "./RootsController";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { WordRelationshipType } from "./WordsController";

interface VerbRelation
{
    relatedVerbId: number;
    relationType: WordRelationshipType;
}

interface Stem1ExtraData
{
    middleRadicalTashkil: string;
    middleRadicalTashkilPresent: string;
    flags: number;
}

export interface VerbUpdateData
{
    stem: number;
    stem1Data?: Stem1ExtraData;
    translations: TranslationEntry[];
    related: VerbRelation[];
}

export interface VerbCreationData extends VerbUpdateData
{
    rootId: number;
}

interface VerbData extends VerbCreationData
{
    id: number;
}

@Injectable
export class VerbsController
{
    constructor(private dbController: DatabaseController, private translationsController: TranslationsController, private rootsController: RootsController)
    {
    }

    //Public methods
    public async CreateVerb(data: VerbCreationData)
    {
        await this.ValidateStem1Context(data, data.rootId);
        
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("verbs", {
            rootId: data.rootId,
            stem: data.stem,
            stem1MiddleRadicalTashkil: data.stem1Data?.middleRadicalTashkil ?? "",
            stem1MiddleRadicalTashkilPresent: data.stem1Data?.middleRadicalTashkilPresent ?? "",
            flags: data.stem1Data?.flags ?? 0
        });
        const verbId = result.insertId;

        await this.translationsController.UpdateVerbTranslations(verbId, data.translations);
        await this.UpdateVerbRelations(verbId, data.related);

        return verbId;
    }

    public async DeleteVerb(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("verbs", "id = ?", verbId);
    }

    public async QueryVerb(verbId: number): Promise<VerbData | undefined>
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT id, rootId, stem, stem1MiddleRadicalTashkil, stem1MiddleRadicalTashkilPresent, flags FROM verbs WHERE id = ?", verbId);
        if(row === undefined)
            return undefined;

        return {
            id: row.id,
            rootId: row.rootId,
            stem: row.stem,
            translations: await this.translationsController.QueryVerbTranslations(row.id),
            stem1Data: (row.stem === 1) ? {
                middleRadicalTashkil: row.stem1MiddleRadicalTashkil,
                middleRadicalTashkilPresent: row.stem1MiddleRadicalTashkilPresent,
                flags: row.flags
            } : undefined,
            related: await this.QueryRelatedVerbs(row.id),
        };
    }

    public async QueryVerbs(rootId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT id FROM verbs WHERE rootId = ? ORDER BY stem, stem1MiddleRadicalTashkil", rootId);
        const result = await rows.Values().Map(x => this.QueryVerb(x.id)).PromiseAll();
        return result.Values().NotUndefined().ToArray();
    }

    public async QueryVerbsCount()
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const row = await conn.SelectOne("SELECT COUNT(*) AS cnt FROM verbs");
        if(row === undefined)
            return 0;
        return row.cnt as number;
    }

    public async SearchVerbs(byTranslation: string)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT DISTINCT verbId FROM verbs_translations WHERE text LIKE ?", "%" + byTranslation + "%");
        const result = await rows.Values().Map(x => this.QueryVerb(x.verbId)).PromiseAll();
        return result.Values().NotUndefined().ToArray();
    }

    public async UpdateVerb(verbId: number, data: VerbUpdateData)
    {
        const verb = await this.QueryVerb(verbId);
        if(verb === undefined)
            return;

        await this.ValidateStem1Context(data, verb.rootId);

        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.UpdateRows("verbs", {
            stem: data.stem,
            stem1MiddleRadicalTashkil: data.stem1Data?.middleRadicalTashkil,
            stem1MiddleRadicalTashkilPresent: data.stem1Data?.middleRadicalTashkilPresent,
            flags: data.stem1Data?.flags
        }, "id = ?", verbId);

        await this.translationsController.UpdateVerbTranslations(verbId, data.translations);
        await this.UpdateVerbRelations(verbId, data.related);
    }

    //Private methods
    private async QueryRelatedVerbs(verbId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT verb1Id, verb2Id, relationship FROM verbs_relations WHERE (verb1Id = ?) OR (verb2Id = ?)", verbId, verbId);

        return rows.map<VerbRelation>(x => ({
            relatedVerbId: x.verb1Id === verbId ? x.verb2Id : x.verb1Id,
            relationType: x.relationship
        }));
    }

    private async UpdateVerbRelations(verbId: number, related: VerbRelation[])
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        await conn.DeleteRows("verbs_relations", "(verb1Id = ?) OR (verb2Id = ?)", verbId, verbId);

        for (const relation of related)
        {
            const verb1Id = Math.min(relation.relatedVerbId, verbId);
            const verb2Id = Math.max(relation.relatedVerbId, verbId);

            await conn.InsertRow("verbs_relations", {
                verb1Id,
                verb2Id,
                relationship: relation.relationType
            });
        }
    }

    private async ValidateStem1Context(data: VerbUpdateData, rootId: number)
    {
        if(data.stem !== 1)
        {
            data.stem1Data = undefined;
            return;
        }
        if(data.stem1Data === undefined)
            throw new Error("Missing context for stem 1");

        const rootData = await this.rootsController.QueryRoot(rootId);
        if(rootData === undefined)
            throw new Error("Root not found");

        const root = new VerbRoot(rootData.radicals);
        const choices = root.GetStem1ContextChoices({
            middleRadicalTashkil: data.stem1Data.middleRadicalTashkil as any,
            middleRadicalTashkilPresent: data.stem1Data.middleRadicalTashkilPresent as any,
            soundOverride: (data.stem1Data.flags & 1) !== 0
        });
        if(choices.past.length === 0)
            data.stem1Data.middleRadicalTashkil = "";
        else if(choices.present.length === 0)
            data.stem1Data.middleRadicalTashkilPresent = "";
    }
}