import { UnifierConfig } from './unifierDefinitions';
import { MmParser } from 'yamma-server/src/mm/MmParser';
import { applyDefaultsToConfig, mapConfigToGlobalState } from './config';
import { tokenize } from './tokenize';
import { ModifyingTokenReader } from './modifyingTokenReader';

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

    const mmTokens = tokenize(mmData);

    const tokenReader = new ModifyingTokenReader(mmTokens);
    mmParser.parseFromTokenReader(tokenReader);

    return tokenReader.chunks.join('');
};
