import { Unifier } from '../api/unifierDefinitions';
import { unifyString } from './unify';

export const get = async (unifier: Unifier, proofIds: string[]) => {
    for (const proofId of proofIds) {
        await unifyString(unifier, `${proofId}.mmp`, `$getproof ${proofId}`, `getting`);
    }
};
