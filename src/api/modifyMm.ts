import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokenReader } from 'yamma-server/src/mm/TokenReader';
import { TokensCreator } from 'yamma-server/src/mm/TokensCreator';
import { UnifierConfig } from './unifierDefinitions';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';

const commands = [
    'compress',
    'decompress',
    'truncateBefore',
    'truncateAfter',
    'truncateCount',
] as const;

export type Command = (typeof commands)[number];

export const modifyMm = (
    _command: Command,
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
