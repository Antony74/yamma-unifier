import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const commands = [
    'unify',
    'get',
    'compress',
    'decompress',
    'truncate',
] as const;

export type CommonArgs = {
    mmFile: string;
    singleThread: boolean;
};

export type UnifyArgs = CommonArgs & {
    command: 'unify';
    mmpFiles: string[];
};

export type GetArgs = CommonArgs & {
    command: 'get';
    proofIds: string[];
    all: boolean;
};

export type CompressArgs = CommonArgs & {
    command: 'compress';
    proofIds: string[];
    all: boolean;
};

export type DecompressArgs = CommonArgs & {
    command: 'decompress';
    proofIds: string[];
    all: boolean;
};

export type TruncateBeforeArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'before';
    proofIdOrCount: string;
};

export type TruncateAfterArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'after';
    proofIdOrCount: string;
};

export type TruncateCountArgs = CommonArgs & {
    command: 'truncate';
    subCommand: 'count';
    proofIdOrCount: string;
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
            ['truncate <mmFile> <proofIdOrCount>', 't'],
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
                    .positional('proofIdOrCount', {
                        description:
                            'Proof to truncate .mm before or after, or total count of proofs desired after truncation',
                        type: 'string',
                    });
            },
        )
        .option('single-thread', { alias: 's' })
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
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
                singleThread: parsed.singleThread ? true : false,
            };
        case 'compress':
            return {
                command: 'compress',
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
                singleThread: parsed.singleThread ? true : false,
            };
        case 'decompress':
            return {
                command: 'decompress',
                mmFile: parsed.mmFile as string,
                proofIds: parsed.proofIds as string[],
                all: parsed.all ? true : false,
                singleThread: parsed.singleThread ? true : false,
            };
        case 'truncate':
            const optionCount = [
                parsed.before,
                parsed.after,
                parsed.count,
            ].filter((flag) => flag === true).length;

            if (optionCount !== 1) {
                console.error(
                    `truncate command expected exactly one --before, --after, --count option.  Found ${optionCount}`,
                );
                process.exit(1);
            }

            if (parsed.before) {
                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'before',
                    proofIdOrCount: parsed.proofIdOrCount as string,
                    singleThread: parsed.singleThread ? true : false,
                };
            } else if (parsed.after) {
                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'after',
                    proofIdOrCount: parsed.proofIdOrCount as string,
                    singleThread: parsed.singleThread ? true : false,
                };
            } else {
                const countString = parsed.proofIdOrCount as string;
                const count = Number.parseInt(countString);

                if (isNaN(count)) {
                    console.error(
                        `truncate count expected a number.  Found ${countString}`,
                    );
                    process.exit(1);
                }

                return {
                    command: 'truncate',
                    mmFile: parsed.mmFile as string,
                    subCommand: 'count',
                    proofIdOrCount: countString,
                    singleThread: parsed.singleThread ? true : false,
                };
            }
        case 'unify':
        default:
            return {
                command: 'unify',
                mmFile: parsed.mmFile as string,
                mmpFiles: parsed.mmpFiles as string[],
                singleThread: parsed.singleThread ? true : false,
            };
    }
};
