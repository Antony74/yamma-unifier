import { describe, expect, test, vi } from 'vitest';
import {
    Args,
    CompressArgs,
    DecompressArgs,
    GetArgs,
    parseArgs,
    TruncateBeforeArgs,
    UnifyArgs,
} from '../../src/cli/parseArgs';
import { afterEach } from 'node:test';

type TestItem =
    | { name: string; cmd: string; outcome: 'return'; expected: Args }
    | { name: string; cmd: string; outcome: 'exit'; expected: 1 };

const testConfig: TestItem[] = [
    {
        name: 'unify zero .mmp files',
        cmd: 'npm start unify examples/example.mm',
        outcome: 'return',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: [],
        } satisfies UnifyArgs,
    },
    {
        name: 'unify one .mmp file',
        cmd: 'npm start unify examples/example.mm examples/ununified.mmp',
        outcome: 'return',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp'],
        } satisfies UnifyArgs,
    },
    {
        name: 'unify two .mmp files',
        cmd: 'npm start u examples/example.mm examples/ununified.mmp examples/unified.mmp',
        outcome: 'return',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp', 'examples/unified.mmp'],
        } satisfies UnifyArgs,
    },
    {
        name: 'get th1',
        cmd: 'npm start get examples/example.mm th1',
        outcome: 'return',
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
        outcome: 'return',
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
        outcome: 'return',
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
        outcome: 'return',
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
        outcome: 'return',
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
        outcome: 'return',
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
    //     outcome: 'exit',
    //     expected: 1,
    // },
    // {
    //     name: 'truncate before',
    //     cmd: 'npm start truncate examples/example.mm --before th1',
    //     outcome: 'return',
    //     expected: {
    //         command: 'truncate',
    //         mmFile: 'examples/example.mm',
    //         subCommand: 'before',
    //         proofId: 'th1',
    //     } satisfies TruncateBeforeArgs,
    // },
    {
        name: 'truncate before',
        cmd: 'npm start truncate examples/example.mm th1 --before',
        outcome: 'return',
        expected: {
            command: 'truncate',
            mmFile: 'examples/example.mm',
            subCommand: 'before',
            proofId: 'th1',
        } satisfies TruncateBeforeArgs,
    },
];

describe('parseArgs', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    testConfig.map(({ name, cmd, outcome, expected }) => {
        test(name, () => {
            const exitSpy = vi
                .spyOn(process, 'exit')
                .mockImplementation((() => {}) as never);

            const result = parseArgs(cmd.split(' '));

            expect(exitSpy).toBeCalledTimes(outcome === 'exit' ? 1 : 0);

            if (outcome === 'return') {
                expect(result).toEqual(expected);
            }
        });
    });
});
