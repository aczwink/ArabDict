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

import { BootstrapIcon, Component, Injectable, JSX_CreateElement } from "acfrontend";
import { ConjugationService } from "./services/ConjugationService";

@Injectable
export class SessionComponent extends Component
{
    constructor(private conjugationService: ConjugationService)
    {
        super();
    }
    
    protected Render(): RenderValue
    {
        const icon = this.conjugationService.canEdit.Get() ? "door-open-fill" : "door-closed-fill";
        return <a href="#" onclick={this.OnToggleEditMode.bind(this)}><BootstrapIcon>{icon}</BootstrapIcon></a>;
    }

    //Event handlers
    private OnToggleEditMode(event: Event)
    {
        event.preventDefault();

        this.conjugationService.canEdit.Set(!this.conjugationService.canEdit.Get());
        this.Update();
    }
}