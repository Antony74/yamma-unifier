import { describe, expect, it } from 'vitest';

import { compressOrDecompressProofs } from '../src/compressOrDecompressProofs';
import { exampleFiles } from './examples';

describe('compressOrDecompressProofs', () => {
    it(`can compress a proof`, () => {
        const result = compressOrDecompressProofs(
            'compress',
            exampleFiles['example.mm'],
            ['th1'],
            false,
        );

        expect(result).toEqual(exampleFiles['example-compressed1.mm']);
    });

    it(`can decompress a proof`, () => {
        const result = compressOrDecompressProofs(
            'decompress',
            exampleFiles['example-compressed1.mm'],
            ['th1'],
            false,
        );

        expect(result).toEqual(exampleFiles['example.mm']);
    });
});
