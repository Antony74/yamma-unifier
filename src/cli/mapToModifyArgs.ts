import {
    ModifyMmArgs,
    ModifyMmCompressArgs,
    ModifyMmTruncateAfterArgs,
    ModifyMmTruncateBeforeArgs,
    ModifyMmTruncateCountArgs,
} from '../api/modifyMm';
import { UnifierConfig } from '../api/unifierDefinitions';
import { Args } from './parseArgs';

export const mapToModifyArgs = (
    args: Args,
    mmData: string,
): ModifyMmArgs => {
    switch (args.command) {
        case 'compress':
            return {
                command: 'compress',
                all: args.all,
                proofIds: args.proofIds,
                mmData,
            } satisfies ModifyMmCompressArgs;
        case 'decompress':
            return {
                command: 'decompress',
                all: args.all,
                proofIds: args.proofIds,
                mmData,
            };
        case 'truncate':
            switch (args.subCommand) {
                case 'before':
                    return {
                        command: 'truncateBefore',
                        proofId: args.proofIdOrCount,
                        mmData,
                    } satisfies ModifyMmTruncateBeforeArgs;
                case 'after':
                    return {
                        command: 'truncateAfter',
                        proofId: args.proofIdOrCount,
                        mmData,
                    } satisfies ModifyMmTruncateAfterArgs;
                case 'count':
                    return {
                        command: 'truncateCount',
                        count: parseInt(args.proofIdOrCount),
                        mmData,
                    } satisfies ModifyMmTruncateCountArgs;
                default:
                    throw new Error(`mapToModifyArgs: unexpected subcommand`);
            }
        default:
            throw new Error(`mapToModifyArgs: unexpected command`);
    }
};
