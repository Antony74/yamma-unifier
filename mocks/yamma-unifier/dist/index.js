// This is just a mock
import { exampleFiles } from './examples';
export { exampleFiles };
export const createUnifier = (mmData) => {
    if (mmData === exampleFiles['example.mm']) {
        return {
            unify: (mmpData) => {
                if (
                    mmpData === exampleFiles['ununified.mmp'] ||
                    mmpData === exampleFiles['unified.mmp']
                ) {
                    return exampleFiles['unified.mmp'];
                } else {
                    throw new Error(
                        'unify: called with mmpData which yamma-unifier mock did not recognise',
                    );
                }
            },
        };
    } else {
        throw new Error(
            'createUnifier: called with mmData which yamma-unifier mock did not recognise',
        );
    }
};
