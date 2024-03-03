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

import { BootstrapIcon, Component, FormField, Injectable, JSX_CreateElement, SingleSelect, Textarea } from "acfrontend";
import { DialectData, TranslationEntry } from "../../dist/api";
import { DialectsService } from "../DialectsService";

interface DialectRenderInfo
{
    dialect: DialectData;
    level: number;
}

@Injectable
export class TranslationsEditorComponent extends Component<{ translations: TranslationEntry[]; onDataChanged: () => void; }>
{
    constructor(private dialectsService: DialectsService)
    {
        super();

        this.dialects = [];
    }

    protected Render(): RenderValue
    {
        return <FormField title="Translations">
            <fragment>
                {this.input.translations.map(this.RenderTranslationEntry.bind(this))}
                <button type="button" className="btn btn-secondary" onclick={this.OnAddTranslationEntry.bind(this)}><BootstrapIcon>plus</BootstrapIcon></button>
            </fragment>
        </FormField>;
    }

    //State
    private dialects: DialectRenderInfo[];

    //Private methods
    private BuildDialectNodes(dialects: DialectData[], parent: number | null, level: number)
    {
        const filtered = dialects.filter(x => x.parent === parent);
        filtered.forEach(x => {
            this.dialects.push({ dialect: x, level });
            this.BuildDialectNodes(dialects, x.id, level + 1);
        });
    }

    private RenderDialect(x: DialectRenderInfo)
    {
        const indention = "  ".repeat(x.level);
        return <span style="white-space: pre;">
            {indention} {x.dialect.emojiCodes} {x.dialect.name}
        </span>;
    }

    private RenderTranslationEntry(translationEntry: TranslationEntry)
    {
        return <div className="row mb-2">
            <div className="col-auto">
                <SingleSelect selectedIndex={this.dialects.findIndex(x => translationEntry.dialectId === x.dialect.id)} onSelectionChanged={this.OnTranslationDialectChanged.bind(this, translationEntry)}>
                    {this.dialects.map(this.RenderDialect.bind(this))}
                </SingleSelect>
            </div>
            <div className="col">
                <Textarea rows={4} value={translationEntry.text} onChanged={newValue => translationEntry.text = newValue} />
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-danger" onclick={this.RemoveEntry.bind(this, translationEntry)}><BootstrapIcon>trash</BootstrapIcon></button>
            </div>
        </div>;
    }

    //Event handlers
    private OnAddTranslationEntry()
    {
        this.input.translations.push({
            dialectId: this.dialects[0].dialect.id,
            text: ""
        });
        this.input.onDataChanged();
    }

    override async OnInitiated(): Promise<void>
    {
        const dialects = await this.dialectsService.QueryDialects();
        const ordered = dialects.Values().OrderBy(x => x.name).ToArray();
        this.BuildDialectNodes(ordered, null, 0);
    }

    private OnTranslationDialectChanged(translationEntry: TranslationEntry, newIdx: number)
    {
        translationEntry.dialectId = this.dialects[newIdx].dialect.id;
        this.input.onDataChanged();
    }

    private RemoveEntry(translationEntry: TranslationEntry)
    {
        const index = this.input.translations.indexOf(translationEntry);
        this.input.translations.Remove(index);
        this.input.onDataChanged();
    }
}