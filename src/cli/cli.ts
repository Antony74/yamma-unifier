import fsp from 'fs/promises';

import prettyms from 'pretty-ms';

import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';
import { info } from './diagnosticsString';
import { unify } from './unify';
import { get } from './get';
import { compressOrDecompressProofs } from '../api/compressOrDecompressProofs';
import { truncateCount } from '../api/truncateCount';
import { getHeapLimitMB, getPeakMB, pollMemory } from './heapStatistics';

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
                const unifier = await createUnifierWithProgress(
                    mmFile,
                    mmData,
                    args.singleThread,
                    true,
                );
                await unify(unifier, args.mmpFiles);
                break;
            }
            case 'get': {
                const unifier = await createUnifierWithProgress(
                    mmFile,
                    mmData,
                    args.singleThread,
                    false,
                );
                await get(unifier, args.proofIds);
                break;
            }
            case 'truncate':
                info(`modifying ${mmFile}`);
                switch (args.subCommand) {
                    case 'count':
                        const result = truncateCount(
                            mmData,
                            parseInt(args.proofIdOrCount),
                        );
                        info(`writing ${mmFile}`);
                        await fsp.writeFile(mmFile, result);
                        break;
                    default:
                        throw new Error(
                            `${args.subCommand} is not implemented yet`,
                        );
                }
                break;
            case 'compress':
            case 'decompress': {
                info(`modifying ${mmFile}`);
                const result = compressOrDecompressProofs(
                    command,
                    mmData,
                    args.proofIds,
                    args.all,
                );
                info(`writing ${mmFile}`);
                await fsp.writeFile(mmFile, result);
                break;
            }
            default:
                throw new Error(`${command} is not implemented yet`);
        }

        pollMemory();
        const memInfo = `peak mem ${getPeakMB()}MB of ${getHeapLimitMB()}MB`;

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
