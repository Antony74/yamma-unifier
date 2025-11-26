import { describe, expect, test } from 'vitest';
import { Args, parseArgs, UnifyArgs } from '../../src/cli/parseArgs';

type TestItem = { name: string; cmd: string; expected: Args };

const testConfig: TestItem[] = [
    {
        name: 'unify one .mmp file',
        cmd: 'npm start unify examples/example.mm examples/ununified.mmp',
        expected: {
            command: 'unify',
            mmFile: 'examples/example.mm',
            mmpFiles: ['examples/ununified.mmp'],
        } satisfies UnifyArgs,
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
