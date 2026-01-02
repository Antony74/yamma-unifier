import { MmParser } from '../../yamma/server/src/mm/MmParser';
import { TokensCreator } from '../../yamma/server/src/mm/TokensCreator';
import { UnifierConfig } from '../unifierDefinitions';
import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';
import { TokenReaderWithIndex } from './tokenReaderWithIndex';

export const getParserAndTokenReader = (
    config: UnifierConfig | undefined,
    mmData: string,
): { tokenReader: TokenReaderWithIndex; mmParser: MmParser } => {
    const completeConfig = applyDefaultsToConfig(config);

    const tokensCreator = new TokensCreator();
    const mmTokens = tokensCreator.createTokensFromText(mmData);
    const tokenReader = new TokenReaderWithIndex(mmData, mmTokens);

    const { createMmParser } = completeConfig.mm;
    const mmParser = createMmParser(mapConfigToGlobalState(completeConfig));

    return { tokenReader, mmParser };
};
