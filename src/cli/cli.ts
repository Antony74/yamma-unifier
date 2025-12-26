import fsp from 'fs/promises';

import prettyms from 'pretty-ms';

import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';
import { info } from './diagnosticsString';
import { unify } from './unify';
import { get } from './get';
import { modifyMm } from '../api/modifyMm';
import { mapToModifyArgs } from './mapToModifyArgs';
import { getHeapLimitMB, getUsedHeapMB } from './heapStatistics';

export const cli = async () => {
    const startTime = performance.now();

    let peakMem = getUsedHeapMB();

    const interval = setInterval(() => {
        peakMem = Math.max(peakMem, getUsedHeapMB());
    }, 50);

    const args = parseArgs(process.argv);
    const { mmFile, command } = args;

    try {
        info(`reading ${mmFile}`);
        const mmData = await fsp.readFile(mmFile, {
            encoding: 'utf-8',
        });

        switch (command) {
            case 'unify': {
                const unifier = await createUnifierWithProgress(
                    mmFile,
                    mmData,
                    args.singleThread,
                );
                await unify(unifier, args.mmpFiles);
                break;
            }
            case 'get': {
                const unifier = await createUnifierWithProgress(
                    mmFile,
                    mmData,
                    args.singleThread,
                );
                await get(unifier, args.proofIds);
                break;
            }
            case 'truncate':
            case 'compress':
            case 'decompress': {
                info(`modifying ${mmFile}`);
                const modifyArgs = mapToModifyArgs(args, mmData);
                const result = modifyMm(modifyArgs);
                info(`writing ${mmFile}`);
                await fsp.writeFile(mmFile, result);
                break;
            }
            default:
                throw new Error(`${command} is not implemented yet`);
        }

        const memInfo = `peak mem ${peakMem}MB of ${getHeapLimitMB()}MB`;

        interval.close();
        const endTime = performance.now();
        info(`done (${prettyms(endTime - startTime)}, ${memInfo})`);
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        } else {
            throw e;
        }
    }
};
