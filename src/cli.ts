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
        const mmData = await fsp.readFile(mmFilename, { encoding: 'utf-8' });

        const unifier = createUnifier(mmData);

        for (const mmpFilename of mmpFilenames) {
            const mmpUnunifiedData = await fsp.readFile(mmpFilename, {
                encoding: 'utf-8',
            });

            const mmpUnifiedData = unifier.unify(mmpUnunifiedData);

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
};

main();
