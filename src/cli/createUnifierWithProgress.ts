import { createPrompt, useState, useEffect } from '@inquirer/core';
import * as color from 'picocolors';
import { ProgressCallback } from 'yamma-server/src/parseNodesCreatorThread/ParseNodesCreator';
import { ProvableStatement } from 'yamma-server/src/mm/ProvableStatement';
import { createUnifier } from '../api/unifier';
import { Unifier } from '../api/unifierDefinitions';

export const createUnifierWithProgress = async (
    mmFilename: string,
    mmData: string,
): Promise<Unifier> => {
    const prompt = createPrompt<Unifier, {}>((_config, done): string => {
        const [progress, setProgress] = useState(0);
        const [proofCount, setProofCount] = useState<null | number>(null);

        useEffect(() => {
            const progressCallback: ProgressCallback = (message) => {
                if (message.kind === 'progress') {
                    setProgress(message.index / message.count);
                }
            };

            createUnifier(mmData, {
                mm: { progressCallback },
            }).then((unifier) => {
                setProofCount(
                    Array.from(
                        unifier.mmParser.labelToNonSyntaxAssertionMap,
                    ).filter(([_label, labeledStatement]) => {
                        return labeledStatement instanceof ProvableStatement;
                    }).length,
                );

                setProgress(1);
                done(unifier);
            });
        }, []);

        const proofCountString =
            proofCount === null
                ? ''
                : `(${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'})`;

        return color.gray(
            `parsing ${mmFilename}... ${Math.round(progress * 100)}% ${proofCountString}`,
        );
    });

    return prompt({});
};
