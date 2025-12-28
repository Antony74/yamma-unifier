import { UnifierConfig } from './unifierDefinitions';

import {
    AssertionParsedArgs,
    MmParserEvents,
} from 'yamma-server/src/mm/MmParser';

import { getParserAndTokenReader } from './common/getParserAndTokenReader';
import { applyDefaultsToConfig } from './common/config';
import { ProofMode } from 'yamma-server/src/mm/ConfigurationManager';
import { createUnifier } from './unifier';

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
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    const unifier = createUnifier(mmParser, completeConfig);

    chunks.push(
        mmData.substring(
            0,
            proofsToReplace.length ? proofsToReplace[0].start : mmData.length,
        ),
    );

    for (let index = 0; index < proofsToReplace.length; ++index) {
        const { label, start, end } = proofsToReplace[index];

        const nextStart =
            index + 1 < proofsToReplace.length
                ? proofsToReplace[index + 1].start
                : mmData.length;

        const result = unifier.get(label);

        const mmpProof = result.mmpUnifier.uProof;
        const textForFormula = mmpProof?.lastMmpProofStep?.textForFormula;

        if (mmpProof && mmpProof.isProofComplete && textForFormula) {
            const mmpStatements = mmpProof.mmpStatements;
            
            const proofStatement = `${label} $p ${textForFormula}`;
            const proofContent = mmpStatements[mmpStatements.length - 1].toText();

            chunks.push(proofStatement);
            chunks.push(proofContent);
        } else {
            chunks.push(mmData.substring(start, end));
        }

        chunks.push(mmData.substring(end, nextStart));
    }

    return Buffer.concat(chunks.map(Buffer.from)).toString();
};
