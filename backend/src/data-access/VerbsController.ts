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
import { TranslationEntry, TranslationsController } from "./TranslationsController";
import { RootsController } from "./RootsController";
import { VerbRoot } from "arabdict-domain/src/VerbRoot";
import { WordRelationshipType } from "./WordsController";
import { DialectsService } from "../services/DialectsService";

interface VerbRelation
{
    relatedVerbId: number;
    relationType: WordRelationshipType;
}

export interface VerbUpdateData
{
    dialectId: number;
    stem: number;
    stem1Context?: string;
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
    constructor(private dbController: DatabaseController, private translationsController: TranslationsController, private rootsController: RootsController,
        private dialectsService: DialectsService
    )
    {
    }

    //Public methods
    public async CreateVerb(data: VerbCreationData)
    {
        await this.ValidateStem1Context(data, data.rootId);
        
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const result = await conn.InsertRow("verbs", {
            dialectId: data.dialectId,
            rootId: data.rootId,
            stem: data.stem,
            stem1Context: (data.stem1Context === undefined) ? null : data.stem1Context,
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

        const row = await conn.SelectOne("SELECT id, rootId, dialectId, stem, stem1Context FROM verbs WHERE id = ?", verbId);
        if(row === undefined)
            return undefined;

        return {
            id: row.id,
            rootId: row.rootId,
            dialectId: row.dialectId,
            stem: row.stem,
            translations: await this.translationsController.QueryVerbTranslations(row.id),
            stem1Context: (row.stem1Context !== null) ? row.stem1Context : undefined,
            related: await this.QueryRelatedVerbs(row.id),
        };
    }

    public async QueryVerbs(rootId: number)
    {
        const conn = await this.dbController.CreateAnyConnectionQueryExecutor();

        const rows = await conn.Select("SELECT id FROM verbs WHERE rootId = ? ORDER BY stem, stem1Context", rootId);
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
            stem1Context: (data.stem1Context === undefined) ? null : data.stem1Context,
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
            data.stem1Context = undefined;
            return;
        }
        if(data.stem1Context === undefined)
            throw new Error("Missing context for stem 1");

        const rootData = await this.rootsController.QueryRoot(rootId);
        if(rootData === undefined)
            throw new Error("Root not found");

        const root = new VerbRoot(rootData.radicals);
        const choices = this.dialectsService.GetDialectMetaData(data.dialectId).GetStem1ContextChoices(root);
        const r2choice = choices.types.indexOf(data.stem1Context);
        if(r2choice === undefined)
            throw new Error("Illegal stem1 context");
    }
}