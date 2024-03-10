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

import { Component, JSX_CreateElement } from "acfrontend";
import { IsValidRootRadical } from "./general";
import { A3EIN, BA, Letter, HHA, LAM, MIM, QAF, LETTER_RA, WAW, DAL, FA, ZAY } from "arabdict-domain/src/Definitions";
import { NUN, SIIN, TA } from "arabdict-domain/src/rule_sets/msa/_legacy/VerbStem";

export class RadicalsEditorComponent extends Component<{ radicals: string; onDataChanged: (newValue: string) => void; joinBeginning?: boolean }>
{
    constructor()
    {
        super();

        this.radicals = [];
    }

    protected Render(): RenderValue
    {
        const padBeginning = !(this.input.joinBeginning === true);
        function PaddingClass(i: number)
        {
            if( (i === 0) && padBeginning)
                return "pe-0";
            else if(i === 3)
                return "ps-0";
            return "p-0";
        }
        function Width(i: number)
        {
            if( ((i === 0) && padBeginning) || (i === 3) )
                return "3.5em";
            return "3em";
        }

        const edits = [];
        for(let i = 3; i >= 0; i--)
        {
            const radical = IsValidRootRadical(this.radicals[i]) ? this.radicals[i] : "";
            let className;
            if(i === 0)
                className = "rounded-0 rounded-end";
            else if((i === 3) && padBeginning)
                className = "rounded-0 rounded-start";
            else
                className = "rounded-0";
            edits.push(<input type="text" value={radical} onkeydown={this.OnKeyDown.bind(this)} onkeyup={this.OnKeyUp.bind(this, i)} placeholder={"r" + (i+1)} className={"form-control form-control-sm " + className} maxLength={1} />);
        }
        return <div className="row">
            {edits.map((x, i) => <div id={"rootRadicalInput" + (3 - i)} className={"col-auto " + PaddingClass(i)} style={"width: " + Width(i) + ";"}>{x}</div>)}
        </div>;
    }

    //Private state
    private radicals: string[];

    //Private methods
    private ConstructRadicals()
    {
        return this.radicals.map(x => (x.length === 0) ? " " : x).join("").trimEnd();
    }

    private MapToRootCharacter(char: string)
    {
        if(IsValidRootRadical(char))
            return char;

        switch(char)
        {
            case "3":
                return A3EIN;
            case "a":
                return Letter.Hamza;
            case "b":
                return BA;
            case "d":
                return DAL;
            case "D":
                return Letter.Daad;
            case "f":
                return FA;
            case "g":
                return Letter.Ghain;
            case "h":
                return Letter.Ha;
            case "H":
                return HHA;
            case "j":
                return Letter.Jiim;
            case "k":
                return Letter.Kaf;
            case "l":
                return LAM;
            case "m":
                return MIM;
            case "n":
                return NUN;
            case "q":
                return QAF;
            case "r":
                return LETTER_RA;
            case "s":
                return SIIN;
            case "S":
                return Letter.Saad;
            case "t":
                return TA;
            case "T":
                return Letter.Tta;
            case "w":
                return WAW;
            case "y":
                return Letter.Ya;
            case "z":
                return ZAY;
        }
        return "";
    }

    private Select(index: number)
    {
        if( (index < 0) || (index > 3) )
            return;
        const element = document.getElementById("rootRadicalInput" + index)?.firstElementChild as (HTMLInputElement | null | undefined);
        element?.focus();
    }

    private UpdateState()
    {
        if( (this.ConstructRadicals() !== this.input.radicals) || (this.radicals.length !== 4))
        {
            for(let i = 0; i < 4; i++)
            {
                const char = this.input.radicals[i];
                this.radicals[i] = IsValidRootRadical(char) ? char : "";
            }
            this.Update();
        }
    }

    //Event handlers
    override OnInitiated(): void
    {
        this.UpdateState();
    }

    override OnInputChanged(): void
    {
        this.UpdateState();
    }

    private OnKeyDown(event: KeyboardEvent)
    {
        if(this.MapToRootCharacter(event.key).length === 0)
        {
            switch(event.key)
            {
                case "ArrowLeft":
                case "ArrowRight":
                case "Backspace":
                case "Delete":
                    break;
                default:
                    event.preventDefault();
            }
        }
    }

    private OnKeyUp(index: number, event: KeyboardEvent)
    {
        const rootChar = this.MapToRootCharacter(event.key);
        if(rootChar.length === 0)
        {
            switch(event.key)
            {
                case "ArrowLeft":
                    this.Select(index + 1);
                    break;
                case "ArrowRight":
                    this.Select(index - 1);
                    break;
                case "Backspace":
                case "Delete":
                    const result = this.OnRadicalChanged(index, "");
                    if(result.oldChar === "")
                    {
                        if(index > 0)
                            this.OnRadicalChanged(index - 1, "");
                        this.Select(index - 1);
                    }
                    break;
            }
        }
        else
        {
            const result = this.OnRadicalChanged(index, rootChar);
            if(result.newChar !== "")
                this.Select(index + 1);
        }
    }

    private OnRadicalChanged(index: number, newValue: string)
    {
        const oldChar = this.radicals[index];
        const char = this.MapToRootCharacter(newValue);
        this.radicals[index] = char;
        this.input.onDataChanged(this.ConstructRadicals());
        this.Update();

        return { oldChar, newChar: char };
    }
}