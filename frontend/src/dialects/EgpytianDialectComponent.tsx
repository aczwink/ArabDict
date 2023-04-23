/**
 * ArabDict
 * Copyright (C) 2023 Amir Czwink (amir130@hotmail.de)
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

import { Component, JSX_CreateElement } from "acfrontend";

export class EgpytianDialectComponent extends Component
{
    protected Render(): RenderValue
    {
        return <fragment>
            <h1>Egyptian dialect</h1>
            <h2>Words</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fusha</th>
                        <th>Egpytian</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>هذا</td>
                        <td>دا</td>
                    </tr>
                    <tr>
                        <td>هذه</td>
                        <td>دي</td>
                    </tr>
                </tbody>
            </table>
        </fragment>;
    }
}