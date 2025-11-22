import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const commands = [
    'unify',
    'add',
    'compress',
    'decompress',
    'truncate',
] as const;

type Command = (typeof commands)[number];

export type Args = { command: Command, mmFilename: string, mmpFilenames: string[] };

export const parseArgs = (): Args => {
    const parsed = yargs(hideBin(process.argv))
        .scriptName('yamma')
        .command(
            ['unify <mmFilename> [mmpFiles...]', 'u'],
            'Unify any given .mmp filenames',
            (yargs) => {
                return yargs
                    .positional('mmFilename', {
                        describe: 'A .mm file',
                        type: 'string',
                    })
                    .positional('mmpFilenames', {
                        describe: 'Zero or more .mmp files',
                        type: 'string',
                        array: true,
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

    return {
        command: parsed.command as Command,
        mmFilename: parsed.mmFilename as string,
        mmpFilenames: parsed.mmpFilenames as string[],
    };
};
