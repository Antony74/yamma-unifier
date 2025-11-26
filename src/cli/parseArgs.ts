import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const commands = [
    'unify',
    'get',
    'compress',
    'decompress',
    'truncate',
] as const;

const truncateSubCommands = ['before', 'after', 'count'] as const;

export type Command = (typeof commands)[number];
export type TruncateSubCommand = (typeof truncateSubCommands)[number];

export type UnifyArgs = {
    command: 'unify';
    mmFile: string;
    mmpFiles: string[];
};

export type GetArgs = {
    command: 'get';
    mmFile: string;
    proofIds: string[];
    all: boolean | undefined;
};

export type CompressArgs = {
    command: 'compress';
    mmFile: string;
    proofIds: string[];
    all: boolean | undefined;
};

export type DecompressArgs = {
    command: 'decompress';
    mmFile: string;
    proofIds: string[];
    all: boolean | undefined;
};

export type TruncateBeforeArgs = {
    command: 'truncate';
    subCommand: 'before';
    proofIds: string;
};

export type TruncateAfterArgs = {
    command: 'truncate';
    subCommand: 'after';
    proofIds: string;
};

export type TruncateCountArgs = {
    command: 'truncate';
    subCommand: 'count';
    count: number;
};

export type Args =
    | UnifyArgs
    | GetArgs
    | CompressArgs
    | DecompressArgs
    | TruncateBeforeArgs
    | TruncateAfterArgs
    | TruncateCountArgs;

export const parseArgs = (argv: string[]): Args => {
    const parsed = yargs(hideBin(argv))
        .scriptName('yamma')
        .command(
            ['unify <mmFile> [mmpFiles...]', 'u'],
            'Unify any given .mmp filenames',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('mmpFilenames', {
                        description: 'Zero or more .mmp files',
                        type: 'string',
                    });
            },
        )
        .command(
            ['get <mmFile> [proofIds...]', 'g'],
            'Get proofs and create .mmp files',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        description:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Create .mmp files for all(!) proofs',
                    });
            },
        )
        .command(
            ['compress <mmFile> [proofIds...]', 'c'],
            'Compress proofs in .mm',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        describe:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Compress all(!) proofs',
                    });
            },
        )
        .command(
            ['decompress <mmFile> [proofIds...]', 'd'],
            'Decompress proofs in .mm',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm file',
                        type: 'string',
                    })
                    .positional('proofIds', {
                        description:
                            'Zero or more proof identifiers from the .mm file',
                        type: 'string',
                    })
                    .option('all', {
                        description: 'Decompress all(!) proofs',
                    });
            },
        )
        .command(
            ['truncate <proofIdOrNumber>', 't'],
            'Truncate .mm file',
            (yargs) => {
                return yargs
                    .positional('mmFile', {
                        description: 'A .mm filename',
                        type: 'string',
                    })
                    .option('before', {
                        alias: 'b',
                        type: 'boolean',
                        description:
                            'File should be truncated before the given proof',
                    })
                    .option('after', {
                        alias: 'a',
                        type: 'boolean',
                        description:
                            'File should be truncated after the given proof',
                    })
                    .option('count', {
                        alias: 'c',
                        type: 'boolean',
                        description:
                            'File should be truncated at the given count of proofs',
                    })
                    .check(
                        (_argv, options) =>
                            options.before || options.after || options.count,
                    )
                    .positional('proofIdOrNumber', {
                        description:
                            'Proof to truncate .mm before or after, or total count of proofs desired after truncation',
                        type: 'string',
                    });
            },
        )
        .middleware((argv) => {
            const fullCommand = commands.find(
                (command) => argv._[0] === command.charAt(0),
            );

            argv.command = fullCommand ?? argv._[0];
        })
        .strictCommands()
        .demandCommand(1)
        .parseSync();

    switch (parsed.command) {
        case 'get':
            return {
                command: 'get',
                mmFile: parsed.mmFile,
                proofIds: parsed.proofIds,
                all: parsed.all,
            } as GetArgs;
        case 'compress':
        case 'decompress':
        case 'truncate':

        case 'unify':
        default:
            return {
                command: parsed.command,
                mmFile: parsed.mmFile,
                mmpFiles: parsed.mmpFiles,
            } as UnifyArgs;
    }
};
