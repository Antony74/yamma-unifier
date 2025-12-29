import { Unifier } from '../unifierDefinitions';
import { ProofToReplace } from './parseForCompressOrDecompressProofs';

export const getChunksForCompressOrDecompressProofs = (
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

        if (mmpProof && mmpProof.isProofComplete && textForFormula) {
            const mmpStatements = mmpProof.mmpStatements;

            const proofStatement = `${label} $p ${textForFormula}`;
            const proofContent =
                mmpStatements[mmpStatements.length - 1].toText();

            chunks.push(proofStatement);
            chunks.push(proofContent);
        } else {
            chunks.push(mmData.substring(start, end));
        }

        chunks.push(mmData.substring(end, nextStart));
    }

    return chunks;
};
