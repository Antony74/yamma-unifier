import * as color from 'picocolors';
import { Unifier } from '../unifierDefinitions';
import { ProofToReplace } from './parseForCompressOrDecompressProofs';

export const getChunksForCompressOrDecompressProofs = (
    command: 'compress' | 'decompress',
    mmData: string,
    proofsToReplace: ProofToReplace[],
    unifier: Unifier,
): string[] => {
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

        const result = unifier.get(label);

        const mmpProof = result.mmpUnifier.uProof;
        const textForFormula = mmpProof?.lastMmpProofStep?.textForFormula;
        let proofStatement = mmpProof?.proofStatement?.toText().trim();

        if (mmpProof && mmpProof.isProofComplete && textForFormula && proofStatement) {
            console.log(color.gray(`${command}ing ${label}`));

            const proofDefinition = `${label} $p ${textForFormula}`;

            const indent = start - mmData.lastIndexOf('\n', start) + 1;

            if (proofStatement.startsWith('$= ')) {
                proofStatement = '$=\n' + proofStatement.slice(3).trim();
            }

            proofStatement = proofStatement
                .split('\n')
                .map((s) => s.trim())
                .join('\n' + ' '.repeat(indent));

            chunks.push(proofDefinition);
            chunks.push(' ');
            chunks.push(proofStatement);
        } else {
            chunks.push(mmData.substring(start, end));
        }

        chunks.push(mmData.substring(end, nextStart));
    }

    return chunks;
};
