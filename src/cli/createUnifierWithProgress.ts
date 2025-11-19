import { createPrompt, useState, useEffect } from '@inquirer/core';
import { ProgressCallback } from 'yamma-server/src/parseNodesCreatorThread/ParseNodesCreator';
import { createUnifier } from '../api/unifier';
import { Unifier } from '../api/unifierDefinitions';
import * as color from 'picocolors';

export const createUnifierWithProgress = async (
    mmFilename: string,
    mmData: string,
): Promise<Unifier> => {
    const prompt = createPrompt<Unifier, {}>((_config, done): string => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const progressCallback: ProgressCallback = (message) => {
                if (message.kind === 'progress') {
                    setProgress(message.index / message.count);
                }
            };

            createUnifier(mmData, {
                mm: { progressCallback },
            }).then((unifier) => {
                setProgress(1);
                done(unifier);
            });
        }, []);

        return color.gray(
            `parsing ${mmFilename}... ${Math.round(progress * 100)}%`,
        );
    });

    return prompt({});
};
