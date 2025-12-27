import { UnifierConfig } from './unifierDefinitions';

import {
    AssertionParsedArgs,
    MmParserEvents,
} from 'yamma-server/src/mm/MmParser';

import { getParserAndTokenReader } from './common/getParserAndTokenReader';

export const modifyProofMode = (
    command: 'compress' | 'decompress',
    mmData: string,
    proofIds: string[],
    all: boolean,
    config?: UnifierConfig,
): string => {
    const { mmParser, tokenReader } = getParserAndTokenReader(config, mmData);

    const chunks: string[] = [];
    let start = 0;
    let end = mmData.length;

    let lastLabelStart: number;

    mmParser.on(MmParserEvents.newLabel, () => {
        lastLabelStart = tokenReader.lastIndex;
    });

    mmParser.on(
        MmParserEvents.newProvableStatement,
        (assertionArgs: AssertionParsedArgs) => {
            const label = assertionArgs.labeledStatement.Label;
            if (
                all ||
                proofIds.find((wantedLabel) => label === wantedLabel) !==
                    undefined
            ) {
                const currentProof = mmData.substring(
                    lastLabelStart,
                    tokenReader.lastIndex + tokenReader.lastTokenLength,
                );

                console.log(`"${currentProof}"`);
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    chunks.push(mmData.substring(start, end));

    return Buffer.concat(chunks.map(Buffer.from)).toString();
};
