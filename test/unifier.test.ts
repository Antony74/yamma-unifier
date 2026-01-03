import { describe, expect, it } from 'vitest';
import { createUnifier, parseMm, parseMmp } from '../src/unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, async () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        await unifier.deepParse();
        const result = unifier.unify(exampleFiles['ununified.mmp']);
        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`can unify from parsers and a single thread`, async () => {
        const mmParser = parseMm(exampleFiles['example.mm']);
        const unifier = createUnifier(mmParser, { mm: { singleThread: true } });
        await unifier.deepParse();
        const mmpParser = parseMmp(exampleFiles['ununified.mmp'], mmParser);
        const result = unifier.unify(mmpParser);
        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`throws an error given bad mmData`, async () => {
        await expect(async () =>
            createUnifier(exampleFiles['bad1.mm']),
        ).rejects.toEqual(new Error('A comment was never closed'));
    });
});
