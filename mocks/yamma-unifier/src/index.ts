// This is just a mock

import { exampleFiles } from './examples';
export { exampleFiles };

export type Unifier = { unify: (mmpData: string) => string };
export type CreateUnifier = (mmData: string) => Unifier;

export const createUnifier: CreateUnifier = (mmData: string) => {
    if (mmData === exampleFiles['example.mm']) {
        return {
            unify: (mmpData: string): string => {
                mmpData = mmpData.replaceAll('\r', '');

                if (
                    mmpData === exampleFiles['ununified.mmp'] ||
                    mmpData === exampleFiles['unified.mmp']
                ) {
                    return exampleFiles['unified.mmp'];
                } else {
                    throw new Error(
                        'unify: called with mmpData which yamma-unifier mock did not recognize',
                    );
                }
            },
        };
    } else {
        throw new Error(
            'createUnifier: called with mmData which yamma-unifier mock did not recognize',
        );
    }
};
