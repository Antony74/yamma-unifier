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

const commands = [
    'compress',
    'decompress',
    'truncateBefore',
    'truncateAfter',
    'truncateCount',
] as const;

export type Command = (typeof commands)[number];

export const modifyMm = (
    command: Command,
    mmData: string,
    proofIdOrCount: string,
    config?: UnifierConfig,
): string => {
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
            let count = parseInt(proofIdOrCount);

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

    //    mmParser.parseFromTokenReader(tokenReader);

    return tokenReader.chunks.join('');
};
