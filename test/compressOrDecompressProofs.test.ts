import { describe, expect, it } from 'vitest';

import { compressOrDecompressProofs } from '../src/compressOrDecompressProofs';
import { exampleFiles } from './examples';
import { reduceWhitespace } from './whitespaceAgnosticIsEqual';

describe('compressOrDecompressProofs', () => {
    it(`can compress a proof`, () => {
        const result = compressOrDecompressProofs(
            'compress',
            exampleFiles['example.mm'],
            ['th1'],
            false,
        );

        expect(reduceWhitespace(result)).toEqual(
            reduceWhitespace(exampleFiles['example-compressed1.mm']),
        );
    });

    it.skip(`can decompress a proof`, () => {
        const result = compressOrDecompressProofs(
            'decompress',
            exampleFiles['example-compressed1.mm'],
            ['th1'],
            false,
        );

        expect(result).toEqual(exampleFiles['example.mm']);
    });

    it(`throws if it can't find proof`, () => {
        expect(() =>
            compressOrDecompressProofs(
                'compress',
                exampleFiles['example.mm'],
                ['th1', 'th2', 'th3', 'th4'],
                false,
            ),
        ).toThrow(['th3 not found', 'th4 not found'].join('\n'));
    });
});
