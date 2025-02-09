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

import { JSX_CreateElement, RootInjector } from "acfrontend";
import { TranslationEntry } from "../../dist/api";
import { DialectsService } from "../services/DialectsService";

function RenderText(text: string[])
{
    if(text.length === 0)
        return null;
    if(text.length === 1)
        return text[0];
    return <ul>
        {text.map(x => <li>{x}</li>)}
    </ul>;
}

function RenderTranslationEntry(translationEntry: TranslationEntry)
{
    const d = RootInjector.Resolve(DialectsService).GetDialect(translationEntry.dialectId);
    return <fragment>
        {d.emojiCodes}
        <span style="white-space: pre-wrap;">{RenderText(translationEntry.text)}</span>
    </fragment>;
}

export function RenderTranslations(translations: TranslationEntry[])
{
    if(translations.length === 1)
        return RenderTranslationEntry(translations[0]);

    return <ol>{translations.map(x => <li>{RenderTranslationEntry(x)}</li>)}</ol>;
}