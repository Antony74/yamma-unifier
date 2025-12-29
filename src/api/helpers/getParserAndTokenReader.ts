import { MmParser } from 'yamma-server/src/mm/MmParser';
import { TokensCreator } from 'yamma-server/src/mm/TokensCreator';
import { UnifierConfig } from '../unifierDefinitions';
import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';
import { TokenReaderWithIndex } from './tokenReaderWithIndex';
import { monitorMmParser } from '../../cli/heapStatistics';

export const getParserAndTokenReader = (
    config: UnifierConfig | undefined,
    mmData: string,
): { tokenReader: TokenReaderWithIndex; mmParser: MmParser } => {
    const completeConfig = applyDefaultsToConfig(config);

    const tokensCreator = new TokensCreator();
    const mmTokens = tokensCreator.createTokensFromText(mmData);
    const tokenReader = new TokenReaderWithIndex(mmData, mmTokens);

    const mmParser = new MmParser(mapConfigToGlobalState(completeConfig));
    monitorMmParser(mmParser);

    return { tokenReader, mmParser };
};
