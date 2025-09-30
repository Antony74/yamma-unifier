import { createUnifier } from 'yamma-unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        const result = unifier.unify(exampleFiles['ununified.mmp']);
        expect(result).toEqual(exampleFiles['unified.mmp']);
    });

    it(`throws an error given bad mmData`, () => {
        expect(() => createUnifier(exampleFiles['bad1.mm'])).toThrow(Error);
    });

    it(`throws an error given bad mmpData`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        expect(() => unifier.unify(exampleFiles['bad1.mm'])).toThrow(Error);
    });
});
