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

import { Expect, It } from "acts-util-test";
import { DialectType } from "arabdict-domain/dist/Conjugator";
import { ReverseConjugator } from "arabdict-domain/dist/ReverseConjugator";
import { Letter, Tashkil } from "arabdict-domain/dist/Definitions";
import { DisplayVocalized } from "arabdict-domain/dist/Vocalization";

It("Reverse lookup يُعد", () => {
    const conjugated: DisplayVocalized[] = [
        {
            letter: Letter.Ya,
            shadda: false,
            tashkil: Tashkil.Dhamma,
            emphasis: false,
        },
        {
            letter: Letter.A3ein,
            shadda: false,
            emphasis: false,
        },
        {
            letter: Letter.Dal,
            shadda: false,
            emphasis: false,
        }
    ];

    const conjugator = new ReverseConjugator(DialectType.ModernStandardArabic, conjugated);
    const analyzed = conjugator.AnalyzeConjugation();
    const got = analyzed.Values().GroupBy(x => x.root.ToString()).Map(x => ({
        key: x.key,
        stems: x.value.Values().Map(x => x.params.stem).ToSet()
    })).ToDictionary(kv => kv.key, kv => kv.stems.Values().OrderBy(x => x).ToArray());

    const expected = [
        {
            root: "ع-و-د",
            stems: [1, 4]
        },
        {
            root: "ع-د-د",
            stems: [1, 4]
        },
        {
            root: "و-ع-د",
            stems: [1]
        }
    ];

    for (const entry of expected)
    {
        const gotStems = got[entry.root] as number[];
        Expect(gotStems).ToBe(entry.stems, entry.root);
    }
});