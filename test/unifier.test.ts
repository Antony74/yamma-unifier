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

    it(`throws an error given bad mmData`, () => {
        expect(() => createUnifier(exampleFiles['bad1.mm'])).toThrowError(
            new Error('A comment was never closed'),
        );
    });

    it(`can get a proof`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        const result = unifier.get('th1');
        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`can get a proof without stripping the header`, () => {
        const unifier = createUnifier(exampleFiles['example.mm'], {
            unifier: { getProofStripHeader: false },
        });
        const result = unifier.get('th1');
        expect(result.text).toContain('* MissingComment');
    });

    it(`returns suitable diagnostics if it can't get a proof`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        const result = unifier.get('notTh');
        const { diagnostics } = result.mmpUnifier.mmpParser;
        expect(diagnostics.length).toEqual(1);
        expect(diagnostics[0].message).toEqual(`notTh not found`);
    });
});
