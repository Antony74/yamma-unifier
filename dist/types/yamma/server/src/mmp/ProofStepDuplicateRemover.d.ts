import { MmpProof } from './MmpProof';
export declare abstract class ProofStepDuplicateRemover {
    private static removeMmpProofStepIfTheCase;
    private static updateEHypIfNeeded;
    private static updateEHypsIfNeeded;
    /** removes all MmpProofStep's that have the same formula
     * of some preceding step. All references are adjusted accordingly.
     */
    static removeStepDuplicates(mmpProof: MmpProof): void;
}
