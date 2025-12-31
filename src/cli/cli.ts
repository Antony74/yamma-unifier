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
import { truncateAfter } from '../api/truncateAfter';
import { truncateBefore } from '../api/truncateBefore';
import { ProvableStatement } from 'yamma-server/src/mm/ProvableStatement';

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

                if (args.all) {
                    args.proofIds = Array.from(
                        unifier.mmParser.labelToStatementMap.entries(),
                    )
                        .filter(
                            ([_label, statement]) =>
                                statement instanceof ProvableStatement,
                        )
                        .map(([label]) => label);
                }

                await get(unifier, args.proofIds);
                break;
            }
            case 'truncate':
                info(`parsing ${mmFile}`);
                switch (args.subCommand) {
                    case 'before':
                        {
                            const result = truncateBefore(
                                mmData,
                                args.proofIdOrCount,
                            );
                            info(`writing ${mmFile}`);
                            await fsp.writeFile(mmFile, result);
                        }
                        break;
                    case 'after':
                        {
                            const result = truncateAfter(
                                mmData,
                                args.proofIdOrCount,
                            );
                            info(`writing ${mmFile}`);
                            await fsp.writeFile(mmFile, result);
                        }
                        break;
                    case 'count':
                        {
                            const result = truncateCount(
                                mmData,
                                parseInt(args.proofIdOrCount),
                            );
                            info(`writing ${mmFile}`);
                            await fsp.writeFile(mmFile, result);
                        }
                        break;
                }
                break;
            case 'compress':
            case 'decompress': {
                info(`parsing ${mmFile}`);
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
                throw new Error(`${command} is not implemented`);
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
