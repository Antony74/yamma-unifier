import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokenReader } from 'yamma-server/src/mm/TokenReader';
import { TokensCreator } from 'yamma-server/src/mm/TokensCreator';
import { UnifierConfig } from './unifierDefinitions';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';

export type CompressArgs = {
    command: 'compress';
    mmFile: string;
    proofIds: string[];
    all: boolean | undefined;
};

export type DecompressArgs = {
    command: 'decompress';
    mmFile: string;
    proofIds: string[];
    all: boolean | undefined;
};

export type TruncateBeforeArgs = {
    command: 'truncate';
    mmFile: string;
    subCommand: 'before';
    proofId: string;
};

export type TruncateAfterArgs = {
    command: 'truncate';
    mmFile: string;
    subCommand: 'after';
    proofId: string;
};

export type TruncateCountArgs = {
    command: 'truncate';
    mmFile: string;
    subCommand: 'count';
    count: number;
};

export type ModifyMmArgs =
    | CompressArgs
    | DecompressArgs
    | TruncateBeforeArgs
    | TruncateAfterArgs
    | TruncateCountArgs;

export const modifyMm = (
    _args: ModifyMmArgs,
    mmData: string,
    config?: UnifierConfig,
): string => {
    const completeConfig = applyDefaultsToConfig(config);
    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));

    const tokensCreator: TokensCreator = new TokensCreator();
    const mmTokens: MmToken[] = tokensCreator.createTokensFromText(mmData);

    console.log(JSON.stringify(mmTokens, null, 4));

    const tokenReader: TokenReader = new TokenReader(mmTokens);
    mmParser.parseFromTokenReader(tokenReader);
    return 'watch this space';
};
