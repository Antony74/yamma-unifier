import { createUnifier } from './unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, () => {
        const unifier = createUnifier(exampleFiles['example.mm']);
        const result = unifier.unify(exampleFiles['ununified.mmp']);

        console.log(result.mmpUnifier.mmpParser.diagnostics);

        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`throws an error given bad mmData`, () => {
        expect(() => createUnifier(exampleFiles['bad1.mm'])).toThrow(
            new Error('A comment was never closed'),
        );
    });
});
