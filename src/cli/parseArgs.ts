import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const parseArgs = () => {
    return yargs(hideBin(process.argv))
        .usage('yammau <mmFilename> [unify] [mmpFilenames...]')
        .usage('yammau <mmFilename> [unify] [proofIdentifiers...]')
        .positional('mmFilename', { describe: 'A .mm file', type: 'string' })
        .positional('command', {
            describe: 'Operation to perform',
            type: 'string',
            choices: ['unify', 'get', 'compress', 'uncompress', 'truncate'],
            default: 'unify',
        })
        .positional('mmpFilename', {
            describe: 'Zero or more .mmp files',
            type: 'string',
            array: true,
        })
        .positional('proofIdentifiers', {
            describe: 'Zero or more .mmp files',
            type: 'string',
            array: true,
        })
        .parse();
};
