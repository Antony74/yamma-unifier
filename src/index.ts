#!/usr/bin/env node

// e.g. npm start examples/example.mm examples/ununified.mmp
// e.g. yammau examples/example.mm examples/ununified.mmp

import fsp from 'fs/promises';
import { createUnifier } from 'yamma-unifier';

const main = async () => {
    if (process.argv.length < 3) {
        console.error('usage: yammau file.mm file.mmp [...moreFiles.mmp]');
        process.exit(1);
    }

    const [_program, _script, mmFilename, ...mmpFilenames] = process.argv;

    try {
        console.log(`reading ${mmFilename}`);
        const mmData = await fsp.readFile(mmFilename, { encoding: 'utf-8' });

        console.log(`parsing ${mmFilename}`);
        const unifier = createUnifier(mmData);

        for (const mmpFilename of mmpFilenames) {
            console.log(`reading ${mmpFilename}`);

            const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
                encoding: 'utf-8',
            });

            console.log(`unifying ${mmpFilename}`);
            const mmpUnifiedData = unifier.unify(mmpUnunifiedData);

            console.log(`writing ${mmpFilename}`);
            await fsp.writeFile(mmpFilename, mmpUnifiedData);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        } else {
            throw e;
        }
    }

    console.log('done');
};

main();
