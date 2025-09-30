import { exampleFiles } from './examples';
export { exampleFiles };
export type Unifier = {
    unify: (mmpData: string) => string;
};
export type CreateUnifier = (mmData: string) => Unifier;
export declare const createUnifier: CreateUnifier;
