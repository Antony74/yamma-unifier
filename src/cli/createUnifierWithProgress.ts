import * as color from 'picocolors';
import { ProgressCallback } from 'yamma-server/src/parseNodesCreatorThread/ParseNodesCreator';
import { ProvableStatement } from 'yamma-server/src/mm/ProvableStatement';
import { createUnifier } from '../api/unifier';
import { Unifier } from '../api/unifierDefinitions';

export const createUnifierWithProgress = async (
    mmFilename: string,
    mmData: string,
    singleThread: boolean,
    deepParse: boolean,
): Promise<Unifier> => {
    const setProgress = (progress: number, proofCount?: number) => {
        const proofCountString =
            proofCount === undefined
                ? ''
                : `(${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'})`;

        process.stdout.write(
            '\r' +
                color.gray(
                    `parsing ${mmFilename}... ${Math.round(progress * 100)}% ${proofCountString}`,
                ),
        );
    };

    setProgress(0);

    const progressCallback: ProgressCallback = (message) => {
        if (message.kind === 'progress') {
            setProgress(message.index / message.count);
        }
    };

    const unifier = await createUnifier(mmData, {
        mm: { progressCallback, singleThread, deepParse },
    });

    const proofCount = Array.from(
        unifier.mmParser.labelToNonSyntaxAssertionMap,
    ).filter(([_label, labeledStatement]) => {
        return labeledStatement instanceof ProvableStatement;
    }).length;

    setProgress(1, proofCount);
    console.log();
    return unifier;
};
