import fsp from 'fs/promises';
import * as color from 'picocolors';
import { createUnifier } from './unifier';
import { getDiagnosticsString } from './diagnosticsString';

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

        info(`parsing ${mmFilename}`);
        const unifier = createUnifier(mmData);

        for (const mmpFilename of mmpFilenames) {
            info(`reading ${mmpFilename}`);

            const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
                encoding: 'utf-8',
            });

            info(`unifying ${mmpFilename}`);
            const result = unifier.unify(mmpUnunifiedData);

            const diagnosticsString = getDiagnosticsString(
                mmpFilename,
                result.mmpUnifier.mmpParser,
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
