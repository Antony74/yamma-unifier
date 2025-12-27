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
    const setProgress = (progress: number) => {
        process.stdout.write(
            '\r' +
                color.gray(
                    `deep parsing ${mmFilename}... ${Math.round(progress * 100)}%`,
                ),
        );
    };

    const progressCallback: ProgressCallback = (message) => {
        if (message.kind === 'progress') {
            setProgress(message.index / message.count);
        }
    };

    console.log(color.gray(`parsing ${mmFilename}`));

    const unifier = await createUnifier(mmData, {
        mm: { progressCallback, singleThread },
    });

    const proofCount = Array.from(
        unifier.mmParser.labelToNonSyntaxAssertionMap,
    ).filter(([_label, labeledStatement]) => {
        return labeledStatement instanceof ProvableStatement;
    }).length;

    console.log(
        color.gray(`${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'}`),
    );

    if (deepParse) {
        setProgress(0);
        await unifier.deepParse();
        setProgress(1);
        console.log();
    }

    return unifier;
};
