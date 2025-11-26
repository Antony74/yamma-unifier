import fsp from 'fs/promises';
import * as color from 'picocolors';
import { parseMmp } from '../api/unifier';
import { getDiagnosticsString } from './diagnosticsString';
import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';

const info = (s: string) => {
    console.log(color.gray(s));
};

export const cli = async () => {
    const _args = parseArgs(process.argv);

    if (process.argv.length < 3) {
        console.error('usage: yammau file.mm file.mmp [...moreFiles.mmp]');
        process.exit(1);
    }

    const [_program, _script, mmFilename, ...mmpFilenames] = process.argv;

    try {
        info(`reading ${mmFilename}`);
        const mmData = await fsp.readFile(mmFilename, { encoding: 'utf-8' });

        const unifier = await createUnifierWithProgress(mmFilename, mmData);

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
