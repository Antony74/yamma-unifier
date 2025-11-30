import fsp from 'fs/promises';

import prettyms from 'pretty-ms';

import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';
import { info } from './diagnosticsString';
import { unify } from './unify';
import { get } from './get';
import { modifyMm } from '../api/modifyMm';

export const cli = async () => {
    const startTime = performance.now();

    const args = parseArgs(process.argv);
    const { mmFile, command } = args;

    try {
        info(`reading ${mmFile}`);
        const mmData = await fsp.readFile(mmFile, {
            encoding: 'utf-8',
        });

        switch (command) {
            case 'unify': {
                const unifier = await createUnifierWithProgress(mmFile, mmData);
                await unify(unifier, args.mmpFiles);
                break;
            }
            case 'get': {
                const unifier = await createUnifierWithProgress(mmFile, mmData);
                await get(unifier, args.proofIds);
                break;
            }
            default: {
                modifyMm(args, mmData);
                break;
            }
        }

        const endTime = performance.now();
        info(`done (${prettyms(endTime - startTime)})`);
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        } else {
            throw e;
        }
    }
};
