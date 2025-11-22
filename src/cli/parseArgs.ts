import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const parseArgs = () => {
    return yargs(hideBin(process.argv))
        .scriptName('yamma')
        .command('unify', 'Unify any given .mmp files')
        .positional('mmFilename', { describe: 'A .mm file', type: 'string' })
        .positional('mmpFilename', {
            describe: 'Zero or more .mmp files',
            type: 'string',
            array: true,
        })
        .parse();
};
