import { createUnifier } from '../src/api/unifier';
import { exampleFiles } from './examples';

describe(`yamma-unifier`, () => {
    it(`can unify`, async () => {
        const unifier = await createUnifier(exampleFiles['example.mm']);
        const result = unifier.unify(exampleFiles['ununified.mmp']);
        expect(result.text).toEqual(exampleFiles['unified.mmp']);
    });

    it(`throws an error given bad mmData`, async () => {
        expect(
            async () => await createUnifier(exampleFiles['bad1.mm']),
        ).rejects.toEqual(new Error('A comment was never closed'));
    });
});
