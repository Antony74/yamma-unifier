import { UnifierConfig } from './unifierDefinitions';
import { getParserAndTokenReader } from './common/getParserAndTokenReader';
import { applyDefaultsToConfig } from './common/config';
import { ProofMode } from 'yamma-server/src/mm/ConfigurationManager';
import { createUnifier } from './unifier';
import { getChunksForCompressOrDecompressProofs } from './common/getChunksForCompressOrDecompressProofs';
import { parseForCompressOrDecompressProofs } from './common/parseForCompressOrDecompressProofs';

export const compressOrDecompressProofs = (
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

    const proofsToReplace = parseForCompressOrDecompressProofs(
        mmParser,
        tokenReader,
        proofIds,
        all,
    );

    const unifier = createUnifier(mmParser, completeConfig);

    const chunks = getChunksForCompressOrDecompressProofs(mmData, proofsToReplace, unifier);

    return chunks.join('');
};
