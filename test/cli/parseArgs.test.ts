import { describe, expect, test } from 'vitest';
import { Args, GetArgs, parseArgs, UnifyArgs } from '../../src/cli/parseArgs';

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
        name: 'u two .mmp files',
        cmd: 'npm start unify examples/example.mm examples/ununified.mmp examples/unified.mmp',
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
            all: undefined
        } satisfies GetArgs,
    },
    {
        name: 'get all proofs',
        cmd: 'npm start g examples/example.mm --all',
        expected: {
            command: 'get',
            mmFile: 'examples/example.mm',
            proofIds: [],
            all: true
        } satisfies GetArgs,
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
