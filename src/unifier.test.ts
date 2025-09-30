import { createUnifier } from 'yamma-unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        const result = unifier.unify(exampleFiles['ununified.mmp']);
        expect(result).toEqual(exampleFiles['unified.mmp']);
    });
});
