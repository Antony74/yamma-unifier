import { describe, expect, test, vi } from 'vitest';
import {
    Args,
    CompressArgs,
    DecompressArgs,
    GetArgs,
    parseArgs,
    TruncateAfterArgs,
    TruncateBeforeArgs,
    TruncateCountArgs,
    UnifyArgs,
} from '../../src/cli/parseArgs';

type TestItem =
    | { name: string; cmd: string; outcome: 'return'; expected: Args }
    | {
          name: string;
          cmd: string;
          outcome: 'exit';
          expected: { exit: number; logString: string };
      };

const testConfig: TestItem[] = [
    {
        name: 'unify zero .mmp files',
        cmd: 'npm start unify examples/example.mm',
        outcome: 'return',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: [],
            singleThread: false
        } satisfies UnifyArgs,
    },
    {
        name: 'unify one .mmp file',
        cmd: 'npm start unify examples/example.mm examples/ununified.mmp --single-thread',
        outcome: 'return',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp'],
            singleThread: true
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
            singleThread: false
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
            all: false,
            singleThread: false
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
            singleThread: false
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
            all: false,
            singleThread: false
        } satisfies CompressArgs,
    },
    {
        name: 'compress nothing',
        cmd: 'npm start compress examples/example.mm',
        outcome: 'return',
        expected: {
            command: 'compress',
            mmFile: 'examples/example.mm',
            proofIds: [],
            all: false,
            singleThread: false
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
            singleThread: false
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
            all: false,
            singleThread: false
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
            singleThread: false
        } satisfies DecompressArgs,
    },
    {
        name: 'miss mmFile',
        cmd: 'npm start truncate --before th1',
        outcome: 'exit',
        expected: {
            exit: 1,
            logString:
                'Not enough non-option arguments: got 1, need at least 2',
        },
    },
    {
        name: 'truncate with no sub-command',
        cmd: 'npm start truncate examples/example.mm th1',
        outcome: 'exit',
        expected: {
            exit: 1,
            logString:
                'truncate command expected exactly one --before, --after, --count option.  Found 0',
        },
    },
    {
        name: 'truncate before',
        cmd: 'npm start truncate examples/example.mm --before th1',
        outcome: 'return',
        expected: {
            command: 'truncate',
            mmFile: 'examples/example.mm',
            subCommand: 'before',
            proofIdOrNum: 'th1',
            singleThread: false
       } satisfies TruncateBeforeArgs,
    },
    {
        name: 'truncate after',
        cmd: 'npm start truncate examples/example.mm --after th1',
        outcome: 'return',
        expected: {
            command: 'truncate',
            mmFile: 'examples/example.mm',
            subCommand: 'after',
            proofIdOrNum: 'th1',
            singleThread: false
        } satisfies TruncateAfterArgs,
    },
    {
        name: 'truncate count with invalid number',
        cmd: 'npm start truncate examples/example.mm --count zzz',
        outcome: 'exit',
        expected: {
            exit: 1,
            logString: 'truncate count expected a number.  Found zzz',
        },
    },
    {
        name: 'truncate count',
        cmd: 'npm start truncate examples/example.mm --count 42',
        outcome: 'return',
        expected: {
            command: 'truncate',
            mmFile: 'examples/example.mm',
            subCommand: 'count',
            proofIdOrNum: '42',
            singleThread: false
        } satisfies TruncateCountArgs,
    },
];

describe('parseArgs', () => {
    testConfig.map(({ name, cmd, outcome, expected }) => {
        test(name, () => {
            vi.resetAllMocks();

            const exitSpy = vi
                .spyOn(process, 'exit')
                .mockImplementation((() => {}) as never);

            const errorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const result = parseArgs(cmd.split(' '));

            switch (outcome) {
                case 'return':
                    expect(exitSpy).toBeCalledTimes(0);
                    expect(result).toEqual(expected);
                    break;
                case 'exit':
                    expect(errorSpy).toBeCalledWith(expected.logString);
                    break;
                default:
                    expect(true).toEqual(false);
            }
        });
    });
});
