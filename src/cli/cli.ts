import fsp from 'fs/promises';

import prettyms from 'pretty-ms';

import { createUnifierWithProgress } from './createUnifierWithProgress';
import { parseArgs } from './parseArgs';
import { info } from './diagnosticsString';
import { unify } from './unify';
import { get } from './get';
import { ProvableStatement } from 'yamma-server/src/mm/ProvableStatement';

export const cli = async () => {
    const startTime = performance.now();

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

        const proofCount = Array.from(unifier.mmParser.labelToNonSyntaxAssertionMap).filter(
            ([_label, labeledStatement]) => {
                return labeledStatement instanceof ProvableStatement;
            },
        ).length;

        const endTime = performance.now();
        info(
            `done (${prettyms(endTime - startTime)}, ${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'})`,
        );
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            process.exit(1);
        } else {
            throw e;
        }
    }
};
