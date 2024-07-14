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
            {
                prefix: [
                    {
                        letter: Letter.AlefHamza,
                        emphasis: false,
                        shadda: false
                    }
                ],
                suffix: [],
                tense: Tense.Present
            },
            {
                prefix: [
                    {
                        letter: Letter.Alef,
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
                case Letter.AlefMaksura:
                    return Letter.Ya;
            }
            return x;
        });
    }

    private Matches(a: DisplayVocalized[], b: DisplayVocalized[])
    {
        return CompareVocalized(a, b) >= 1;
    }

    private TryMatchAugmentedRoot(conjugated: DisplayVocalized[], indices: number[], stem: 1 | AdvancedStemNumber): RootMatch[]
    {
        const sub = this.TryMatchRoot(indices.map(i => conjugated[i]));
        return sub.map(x => ({
            rootRadicals: x.rootRadicals,
            stem
        }));
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
            {
                const [r1, r2, r3] = rootLetters;
                
                if((r2 === Letter.Alef) || (r2 === Letter.Ya))
                {
                    //hollow
                    return [
                        {
                            rootRadicals: [r1, Letter.Waw, r3],
                            stem: 1
                        },
                        {
                            rootRadicals: [r1, Letter.Ya, r3],
                            stem: 1
                        }
                    ];
                }
                if(r3 === Letter.Ya)
                {
                    return [
                        {
                            rootRadicals: [r1, r2, Letter.Waw],
                            stem: 1
                        },
                        {
                            rootRadicals: [r1, r2, Letter.Ya],
                            stem: 1
                        },
                        {
                            rootRadicals: [r1, r2, Letter.Waw],
                            stem: 2
                        },
                        {
                            rootRadicals: [r1, r2, Letter.Ya],
                            stem: 2
                        },
                    ];
                }

                return [
                    {
                        rootRadicals: rootLetters,
                        stem: 1
                    },
                    {
                        rootRadicals: rootLetters,
                        stem: 2
                    }
                ];
            }
            case 4:
            {
                const [r1, r2, r3, r4] = rootLetters;
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
                else if(r2 === Letter.Alef)
                    return this.TryMatchAugmentedRoot(conjugated, [0, 2, 3], 3);
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
            }
            break;
        }
        return [];
    }
}