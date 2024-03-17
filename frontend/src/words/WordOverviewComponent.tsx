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

import { Component, Injectable, JSX_CreateElement } from "acfrontend";
import { RenderTranslations } from "../shared/translations";
import { WordReferenceComponent } from "./WordReferenceComponent";
import { FullWordData } from "../../dist/api";

@Injectable
export class WordOverviewComponent extends Component<{ word: FullWordData; }>
{
    protected Render(): RenderValue
    {
        return <tr>
            <td><WordReferenceComponent word={this.input.word} /></td>
            <td>
                {RenderTranslations(this.input.word.functions[0].translations)}
            </td>
        </tr>;
    }
}