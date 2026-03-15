import { BlockStatement } from '../../yamma/server/src/mm/BlockStatement';
import { ProvableStatement } from '../../yamma/server/src/mm/ProvableStatement';
import { Unifier } from '../unifierDefinitions';
import { compressProof } from './compressProof';
import { encodeProofNumbers } from './encodeProofNumbers';
import { getProofNumbers } from './getProofNumbers';
import { ProofToReplace } from './parseForCompressOrDecompressProofs';

export const getChunksForCompressOrDecompressProofs = (
    command: 'compress' | 'decompress',
    mmData: string,
    proofsToReplace: ProofToReplace[],
    unifier: Unifier,
    actionCallback: (label: string) => void = () => {},
): string[] => {
    const mmParser = unifier.mmParser;
    const chunks: string[] = [];

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

        const assertionStatement =
            mmParser.labelToNonSyntaxAssertionMap.get(label);

        if (assertionStatement === undefined) {
            throw new Error(`${label} not found`);
        }

        const provableStatement =
            assertionStatement instanceof ProvableStatement
                ? assertionStatement
                : undefined;

        if (provableStatement === undefined) {
            throw new Error(`${label} is not a proof`);
        }

        const frame = provableStatement.frame;

        if (frame === undefined) {
            throw new Error(`${label} proof is missing frame`);
        }

        actionCallback(label);

        const { proofTokens } = provableStatement;

        const parentBlock =
            provableStatement.ParentBlock ?? new BlockStatement();

        if (provableStatement.hasCompressedProof) {
            // const closeBracketIndex = proofTokens.findIndex(
            //     (token) => token.value === ')',
            // );

            // const hypotheses: string[] = proofTokens
            //     .slice(1, closeBracketIndex)
            //     .map((token) => token.value);

            // const proofString = proofTokens[closeBracketIndex + 1].value;

            // throw { hypotheses, proofString };

            const eHyps = provableStatement.frame?.eHyps ?? [];

            const mandVars = parentBlock.get_mand_vars(
                provableStatement.formula,
                eHyps,
            );
            const otherHyps = proofTokens
                .slice(1, -2)
                .map((token) => token.value);

            const mappingsProofNumbers = [
                [],
                ...mandVars.map((token) => [token]),
                ...otherHyps.map((token) => [token]),
            ];

            const proofToken = proofTokens[proofTokens.length - 1];

            const proofNumbers = getProofNumbers(label, proofToken.value);

            let result: string[] = [];
            for (const proofNumber of proofNumbers) {
                if (proofNumber === 0) {
                    mappingsProofNumbers.push(result);
                    result = [];
                } else if (proofNumber < mappingsProofNumbers.length) {
                    result.push(...mappingsProofNumbers[proofNumber]);
                } else {
                    throw new Error(`Proof number out of bounds`);
                }
            }

            result.push('$.');

            const formulaText = provableStatement.formula.join(' ');

            const proofDefinition = `${label} $p ${formulaText} $=`;

            const indent = start - mmData.lastIndexOf('\n', start) + 1;

            const proofStatement = result.join(' ');

            chunks.push(proofDefinition);
            chunks.push(' ');
            chunks.push(proofStatement);

            chunks.push(mmData.substring(end, nextStart));
        } else {
            const mandatoryVars = frame.fHyps.map(hyp => hyp.Label);

            const { labels, proofnumbers } = compressProof(
                mandatoryVars,
                proofTokens.map((token) => token.value),
            );

            const formulaText = provableStatement.formula.join(' ');

            const proofDefinition = `${label} $p ${formulaText} $=`;
            const encodedProofNumbers = encodeProofNumbers(proofnumbers);

            chunks.push(proofDefinition);
            chunks.push(' ');
            chunks.push(`( ${labels.join(' ')} ) ${encodedProofNumbers} $.`);
        }

        chunks.push(mmData.substring(end, nextStart));
    }

    return chunks;
};
