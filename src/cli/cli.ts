import fsp from 'fs/promises';
import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';
import { info } from './diagnosticsString';
import { unify } from './unify';
import { get } from './get';

export const cli = async () => {
    const args = parseArgs(process.argv);
    const { mmFile, command } = args;

    try {
        info(`reading ${mmFile}`);
        const mmData = await fsp.readFile(mmFile, { encoding: 'utf-8' });

        const unifier = await createUnifierWithProgress(mmFile, mmData);

        switch (command) {
            case 'unify':
                await unify(unifier, args.mmpFiles);
                break;
            case 'get':
                await get(unifier, args.proofIds);
                break;
            default:
                throw new Error(`Command '${command} is not implemented yet`);
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
