import { describe, expect, it } from 'vitest';

import { truncateAfter } from '../src/truncateAfter';
import { exampleFiles } from './examples';

describe(`truncateAfter`, () => {
    it(`can truncate a .mm file`, () => {
        const result = truncateAfter(exampleFiles['example.mm'], 'th1');
        expect(result).toEqual(exampleFiles['example-truncated.mm']);
    });
});
