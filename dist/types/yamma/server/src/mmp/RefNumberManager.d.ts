import { MmpProof } from './MmpProof';
import { MmpProofStep } from './MmpProofStep';
export declare abstract class RefNumberManager {
    static renumberMmpProofStep(mmpProofStep: MmpProofStep, oldRefToProofStepMap: Map<string, MmpProofStep>, ref: number): void;
    static renumber(mmpProof: MmpProof): void;
}
