import { describe, expect, it } from 'vitest';
import { createUnifier } from '../src/unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, async () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        await unifier.deepParse();
        const result = unifier.unify(exampleFiles['ununified.mmp']);
        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`throws an error given bad mmData`, async () => {
        await expect(async () =>
            createUnifier(exampleFiles['bad1.mm']),
        ).rejects.toEqual(new Error('A comment was never closed'));
    });
});
