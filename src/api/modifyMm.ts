import { UnifierConfig } from './unifierDefinitions';

import {
    AssertionParsedArgs,
    MmParser,
    MmParserEvents,
} from 'yamma-server/src/mm/MmParser';

import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';
import { tokenize } from './tokenize';
import { ModifyingTokenReader } from './modifyingTokenReader';
import { MmToken } from 'yamma-server/src/grammar/MmLexer';

export type ModifyMmCommonArgs = {
    mmData: string;
    config?: UnifierConfig;
};

export type ModifyMmCompressArgs = ModifyMmCommonArgs & {
    command: 'compress';
    proofIds: string[];
    all: boolean;
};

export type ModifyMmDecompressArgs = ModifyMmCommonArgs & {
    command: 'decompress';
    proofIds: string[];
    all: boolean;
};

export type ModifyMmTruncateBeforeArgs = ModifyMmCommonArgs & {
    command: 'truncateBefore';
    proofId: string;
};

export type ModifyMmTruncateAfterArgs = ModifyMmCommonArgs & {
    command: 'truncateAfter';
    proofId: string;
};

export type ModifyMmTruncateCountArgs = ModifyMmCommonArgs & {
    command: 'truncateCount';
    count: number;
};

export type ModifyMmArgs =
    | ModifyMmCompressArgs
    | ModifyMmDecompressArgs
    | ModifyMmTruncateBeforeArgs
    | ModifyMmTruncateAfterArgs
    | ModifyMmTruncateCountArgs;

export const modifyMm = (args: ModifyMmArgs): string => {
    const { command, config, mmData } = args;
    const completeConfig = applyDefaultsToConfig(config);

    const mmTokens = tokenize(mmData);
    const tokenReader = new ModifyingTokenReader(mmTokens);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));

    switch (command) {
        // case 'compress':
        //     let proofStart;

        //     mmParser.on(MmParserEvents.proofStart, (token: MmToken) => {
        //         proofStart = token;
        //     });

        //     mmParser.on(
        //         MmParserEvents.newProvableStatement,
        //         (assertionArgs: AssertionParsedArgs) => {
        //         },
        //     );

        //     break;
        case 'truncateCount':
            let { count } = args;

            mmParser.on(MmParserEvents.newProvableStatement, () => {
                --count;
                if (count === 0) {
                    tokenReader.setWriting(false);
                }
            });
            break;
        default:
            throw new Error(`${command} is not implemented yet`);
    }

    mmParser.parseFromTokenReader(tokenReader);

    return tokenReader.chunks.join('');
};
