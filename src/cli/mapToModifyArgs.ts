import { Command } from '../api/modifyMm';
import { Args } from './parseArgs';

export const mapToModifyArgs = (args: Args): { command: Command } => {
    switch (args.command) {
        case 'compress':
            return { command: 'compress' };
        case 'decompress':
            return { command: 'decompress' };
        case 'truncate':
            switch (args.subCommand) {
                case 'before':
                    return { command: 'truncateBefore' };
                case 'after':
                    return { command: 'truncateAfter' };
                case 'count':
                    return { command: 'truncateCount' };
                default:
                    throw new Error(`mapToModifyArgs: unexpected subcommand`);
            }
        default:
            throw new Error(`mapToModifyArgs: unexpected command`);
    }
};
