import { UnifierConfig } from './unifierDefinitions';

import {
    AssertionParsedArgs,
    MmParser,
    MmParserEvents,
} from 'yamma-server/src/mm/MmParser';

import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';
import { TokenReaderWithIndex } from './modifyingTokenReader';
import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokensCreator } from 'yamma-server/src/mm/TokensCreator';

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

    const tokensCreator = new TokensCreator();
    const mmTokens = tokensCreator.createTokensFromText(mmData);
    const tokenReader = new TokenReaderWithIndex(mmData, mmTokens);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));

    switch (command) {
        case 'compress':
        case 'decompress':
            let lastLabelStart: number;

            mmParser.on(MmParserEvents.newLabel, (token: MmToken) => {
                lastLabelStart = tokenReader.lastIndex;
            });

            mmParser.on(
                MmParserEvents.newProvableStatement,
                (assertionArgs: AssertionParsedArgs) => {
                    const label = assertionArgs.labeledStatement.Label;
                    if (
                        args.all ||
                        args.proofIds.find(
                            (wantedLabel) => label === wantedLabel,
                        ) !== undefined
                    ) {
                        const lastTokenLength =
                            tokenReader.lastToken?.value.length ?? 0;

                        const currentProof = mmData.substring(
                            lastLabelStart,
                            tokenReader.lastIndex + lastTokenLength,
                        );

                        console.log(`"${currentProof}"`);
                    }
                },
            );

            break;
        case 'truncateCount':
            // let { count } = args;

            // mmParser.on(MmParserEvents.newProvableStatement, () => {
            //     --count;
            //     if (count === 0) {
            //         tokenReader.setWriting(false);
            //     }
            // });
            break;
        default:
            throw new Error(`${command} is not implemented yet`);
    }

    mmParser.parseFromTokenReader(tokenReader);

    return mmData;
};
