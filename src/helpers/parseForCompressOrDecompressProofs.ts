import {
    MmParser,
    MmParserEvents,
    AssertionParsedArgs,
} from '../../yamma/server/src/mm/MmParser';

import { TokenReaderWithIndex } from './tokenReaderWithIndex';

export type ProofToReplace = { label: string; start: number; end: number };

export const parseForCompressOrDecompressProofs = (
    mmParser: MmParser,
    tokenReader: TokenReaderWithIndex,
    proofIds: string[],
    all: boolean,
): ProofToReplace[] => {
    const proofsToReplace: ProofToReplace[] = [];

    const proofsFound = Object.fromEntries(
        proofIds.map((label) => {
            return [label, false];
        }),
    );

    let lastLabelStart: number;

    mmParser.on(MmParserEvents.newLabel, () => {
        lastLabelStart = tokenReader.lastIndex;
    });

    mmParser.on(
        MmParserEvents.newProvableStatement,
        (assertionArgs: AssertionParsedArgs) => {
            const label = assertionArgs.labeledStatement.Label;
            if (all || proofsFound[label] !== undefined) {
                const start = lastLabelStart;
                const end = tokenReader.lastIndex + tokenReader.lastTokenLength;

                proofsToReplace.push({ label, start, end });
                proofsFound[label] = true;
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    const notFound = Object.entries(proofsFound)
        .filter(([_label, found]) => found === false)
        .map(([label]) => `${label} not found`);

    if (notFound.length) {
        throw new Error(notFound.join('\n'));
    }

    return proofsToReplace;
};
