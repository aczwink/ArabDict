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
import { Conjugator, DialectType } from "arabdict-domain/dist/Conjugator";
import { A3EIN, DAL, DHAMMA, YA } from "arabdict-domain/dist/Definitions";
import { PartiallyVocalized } from "arabdict-domain/dist/Vocalization";

It("Reverse lookup يُعد", () => {
    const conjugator = new Conjugator();

    const conjugated: PartiallyVocalized[] = [
        {
            letter: YA,
            shadda: false,
            tashkil: DHAMMA
        },
        {
            letter: A3EIN,
            shadda: false
        },
        {
            letter: DAL,
            shadda: false
        }
    ];

    const analyzed = conjugator.AnalyzeConjugation(DialectType.ModernStandardArabic, conjugated);
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
        const gotStems = got[entry.root];
        if(gotStems === undefined)
            Expect(true).ToBe(false); //TODO: expect test capabilities
        Expect(gotStems).ToBe(entry.stems);
    }
});