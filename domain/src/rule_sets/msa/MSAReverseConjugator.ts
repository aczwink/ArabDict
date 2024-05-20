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
import { AdvancedStemNumber, Letter, Tense } from "../../Definitions";
import { DialectReverseConjugator, ReverseConjugationResult } from "../../DialectReverseConjugator";
import { VerbRoot } from "../../VerbRoot";
import { CompareVocalized, DisplayVocalized } from "../../Vocalization";

interface PrefixSuffixPattern
{
    prefix: DisplayVocalized[];
    suffix: DisplayVocalized[];
    tense: Tense;
}

interface RootMatch
{
    rootRadicals: Letter[];
    stem: 1 | AdvancedStemNumber;
}

export class MSAReverseConjugator implements DialectReverseConjugator
{
    public AnalyzeConjugation(conjugated: DisplayVocalized[]): ReverseConjugationResult[]
    {
        const patterns: PrefixSuffixPattern[] = [
            //Present
            {
                prefix: [
                    {
                        letter: Letter.Ya,
                        emphasis: false,
                        shadda: false
                    },
                ],
                suffix: [],
                tense: Tense.Present
            },
            {
                prefix: [
                    {
                        letter: Letter.Ta,
                        emphasis: false,
                        shadda: false
                    }
                ],
                suffix: [],
                tense: Tense.Present
            },

            //Perfect
            {
                prefix: [],
                suffix: [
                    {
                        letter: Letter.Ta,
                        emphasis: false,
                        shadda: false
                    },
                ],
                tense: Tense.Perfect
            },
            {
                prefix: [
                    {
                        //hamzat al wasl
                        letter: Letter.Alef,
                        emphasis: false,
                        shadda: false
                    },
                ],
                suffix: [],
                tense: Tense.Perfect
            },
            {
                prefix: [],
                suffix: [],
                tense: Tense.Perfect
            },
        ];

        const results: ReverseConjugationResult[] = [];
        for (const pattern of patterns)
        {
            const matches = this.Matches(pattern.prefix, conjugated.slice(0, pattern.prefix.length))
                && this.Matches(pattern.suffix, conjugated.slice(conjugated.length - pattern.suffix.length));
            if(matches)
            {
                const prefixOmitted = conjugated.slice(pattern.prefix.length);
                const rootMatches = this.TryMatchRoot(prefixOmitted.slice(0, prefixOmitted.length - pattern.suffix.length));
                rootMatches.forEach(x => results.push({
                    root: new VerbRoot(x.rootRadicals.join("")),
                    tense: pattern.tense,
                    stem: x.stem
                }))
            }
        }

        return results;
    }

    //Private methods
    private MapToRootLetters(letters: Letter[])
    {
        return letters.map(x => {
            switch(x)
            {
                case Letter.AlefHamza:
                    return Letter.Hamza;
            }
            return x;
        });
    }

    private Matches(a: DisplayVocalized[], b: DisplayVocalized[])
    {
        return CompareVocalized(a, b) >= 1;
    }

    private TryMatchRoot(conjugated: DisplayVocalized[]): RootMatch[]
    {
        const rootLetters = this.MapToRootLetters(conjugated.map(x => x.letter));
        switch(conjugated.length)
        {
            case 2:
                return [
                    {
                        //assimilated
                        rootRadicals: [Letter.Waw, conjugated[0].letter, conjugated[1].letter],
                        stem: 1
                    },
                    {
                        //hollow
                        rootRadicals: [conjugated[0].letter, Letter.Waw, conjugated[1].letter],
                        stem: 1
                    },
                    {
                        //doubled r2
                        rootRadicals: [conjugated[0].letter, conjugated[1].letter, conjugated[1].letter],
                        stem: 1
                    }
                ];
            case 3:
                if(conjugated[1].letter === Letter.Alef)
                {
                    //hollow
                    return [
                        {
                            rootRadicals: [conjugated[0].letter, Letter.Waw, conjugated[2].letter],
                            stem: 1
                        },
                        {
                            rootRadicals: [conjugated[0].letter, Letter.Ya, conjugated[2].letter],
                            stem: 1
                        }
                    ];
                }

                if(conjugated[1].letter === Letter.Ya)
                {
                    //hollow
                    return [
                        {
                            rootRadicals: [conjugated[0].letter, Letter.Waw, conjugated[2].letter],
                            stem: 1
                        }
                    ];
                }

                return [
                    {
                        rootRadicals: rootLetters,
                        stem: 1
                    }
                ];
            case 4:
                if(conjugated[0].letter === Letter.AlefHamza)
                {
                    const sub = this.TryMatchRoot(conjugated.slice(1));
                    return sub.map(x => ({
                        rootRadicals: x.rootRadicals,
                        stem: 4
                    }));
                }
                else if(conjugated[0].letter === Letter.Ta)
                {
                    const sub = this.TryMatchRoot(conjugated.slice(1));
                    return sub.map(x => ({
                        rootRadicals: x.rootRadicals,
                        stem: 5
                    }));
                }
                else if(conjugated[1].letter === Letter.Ta)
                {
                    const sub = this.TryMatchRoot([
                        conjugated[0], conjugated[2], conjugated[3]
                    ]);
                    return sub.map(x => ({
                        rootRadicals: x.rootRadicals,
                        stem: 8
                    }));
                }
                break;
        }
        throw new Error("TODO: implement me: " + conjugated.length);
    }
}