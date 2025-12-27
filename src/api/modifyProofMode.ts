import { UnifierConfig } from './unifierDefinitions';

import {
    AssertionParsedArgs,
    MmParserEvents,
} from 'yamma-server/src/mm/MmParser';

import { getParserAndTokenReader } from './common/getParserAndTokenReader';
import { applyDefaultsToConfig } from './common/config';
import { ProofMode } from 'yamma-server/src/mm/ConfigurationManager';
import { createUnifier } from './unifier';

export const modifyProofMode = (
    command: 'compress' | 'decompress',
    mmData: string,
    proofIds: string[],
    all: boolean,
    config?: UnifierConfig,
): string => {
    const completeConfig = applyDefaultsToConfig(config);

    completeConfig.common.proofMode =
        command === 'compress' ? ProofMode.compressed : ProofMode.normal;

    const { mmParser, tokenReader } = getParserAndTokenReader(
        completeConfig,
        mmData,
    );

    const proofsToReplace: { label: string; start: number; end: number }[] = [];

    const chunks: string[] = [];

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
                const start = lastLabelStart;
                const end = tokenReader.lastIndex + tokenReader.lastTokenLength;

                proofsToReplace.push({ label, start, end });

                // const currentProof = mmData.substring(
                //     lastLabelStart,
                //     tokenReader.lastIndex + tokenReader.lastTokenLength,
                // );

                // console.log(`"${currentProof}"`);
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    createUnifier(mmParser, completeConfig);

    // chunks.push(mmData.substring(start, end));

    return Buffer.concat(chunks.map(Buffer.from)).toString();
};
