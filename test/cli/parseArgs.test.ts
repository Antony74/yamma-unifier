import { describe, expect, test } from 'vitest';
import {
    Args,
    CompressArgs,
    DecompressArgs,
    GetArgs,
    parseArgs,
    TruncateBeforeArgs,
    UnifyArgs,
} from '../../src/cli/parseArgs';

type TestItem = { name: string; cmd: string; expected: Args };

const testConfig: TestItem[] = [
    {
        name: 'unify zero .mmp files',
        cmd: 'npm start unify examples/example.mm',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: [],
        } satisfies UnifyArgs,
    },
    {
        name: 'unify one .mmp file',
        cmd: 'npm start unify examples/example.mm examples/ununified.mmp',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp'],
        } satisfies UnifyArgs,
    },
    {
        name: 'unify two .mmp files',
        cmd: 'npm start u examples/example.mm examples/ununified.mmp examples/unified.mmp',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp', 'examples/unified.mmp'],
        } satisfies UnifyArgs,
    },
    {
        name: 'get th1',
        cmd: 'npm start get examples/example.mm th1',
        expected: {
            command: 'get',
            mmFile: 'examples/example.mm',
            proofIds: ['th1'],
            all: undefined,
        } satisfies GetArgs,
    },
    {
        name: 'get all proofs',
        cmd: 'npm start g examples/example.mm --all',
        expected: {
            command: 'get',
            mmFile: 'examples/example.mm',
            proofIds: [],
            all: true,
        } satisfies GetArgs,
    },
    {
        name: 'compress a proof',
        cmd: 'npm start compress examples/example.mm th1',
        expected: {
            command: 'compress',
            mmFile: 'examples/example.mm',
            proofIds: ['th1'],
            all: undefined,
        } satisfies CompressArgs,
    },
    {
        name: 'compress all proofs',
        cmd: 'npm start compress examples/example.mm --all',
        expected: {
            command: 'compress',
            mmFile: 'examples/example.mm',
            proofIds: [],
            all: true,
        } satisfies CompressArgs,
    },
    {
        name: 'decompress a proof',
        cmd: 'npm start decompress examples/example.mm th1',
        expected: {
            command: 'decompress',
            mmFile: 'examples/example.mm',
            proofIds: ['th1'],
            all: undefined,
        } satisfies DecompressArgs,
    },
    {
        name: 'decompress all proofs',
        cmd: 'npm start decompress examples/example.mm --all',
        expected: {
            command: 'decompress',
            mmFile: 'examples/example.mm',
            proofIds: [],
            all: true,
        } satisfies DecompressArgs,
    },
    // {
    //     name: 'miss mmFile',
    //     cmd: 'npm start truncate --before th1',
    //     expected: {
    //         command: 'truncate',
    //         mmFile: 'examples/example.mm',
    //         subCommand: 'before',
    //         proofId: 'th1',
    //     } satisfies TruncateBeforeArgs,
    // },
    {
        name: 'truncate before',
        cmd: 'npm start truncate examples/example.mm --before th1',
        expected: {
            command: 'truncate',
            mmFile: 'examples/example.mm',
            subCommand: 'before',
            proofId: 'th1',
        } satisfies TruncateBeforeArgs,
    },
];

describe('parseArgs', () => {
    testConfig.map(({ name, cmd, expected }) => {
        test(name, () => {
            const result = parseArgs(cmd.split(' '));
            expect(result).toEqual(expected);
        });
    });
});
