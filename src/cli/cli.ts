import fsp from 'fs/promises';
import * as color from 'picocolors';
import { createPrompt, useEffect, useState } from '@inquirer/core';
import { createUnifier, parseMmp } from '../api/unifier';
import { getDiagnosticsString } from './diagnosticsString';
import { ProgressCallback } from 'yamma-server/src/parseNodesCreatorThread/ParseNodesCreator';
import { Unifier } from '../api/unifierDefinitions';

const info = (s: string) => {
    console.log(color.gray(s));
};

export const cli = async () => {
    if (process.argv.length < 3) {
        console.error('usage: yammau file.mm file.mmp [...moreFiles.mmp]');
        process.exit(1);
    }

    const [_program, _script, mmFilename, ...mmpFilenames] = process.argv;

    try {
        info(`reading ${mmFilename}`);
        const mmData = await fsp.readFile(mmFilename, { encoding: 'utf-8' });

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

        const unifier = await prompt({});

        for (const mmpFilename of mmpFilenames) {
            info(`reading ${mmpFilename}`);

            const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
                encoding: 'utf-8',
            });

            info(`unifying ${mmpFilename}`);
            const result = unifier.unify(mmpUnunifiedData);

            const diagnosticsString = getDiagnosticsString(
                mmpFilename,
                parseMmp(result.text, unifier.mmParser),
            );

            if (diagnosticsString) {
                console.log();
                console.log(diagnosticsString);
                console.log();
            }

            info(`writing ${mmpFilename}`);
            await fsp.writeFile(mmpFilename, result.text);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        } else {
            throw e;
        }
    }

    info('done');
};
