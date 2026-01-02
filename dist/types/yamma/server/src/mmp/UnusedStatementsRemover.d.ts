import { MmpProof } from './MmpProof';
import { MmpProofStep } from './MmpProofStep';
import { IMmpStatement } from './MmpStatement';
export declare abstract class UnusedStatementsRemover {
    static getUsedStatementsRecursively(currentMmpProofStep: MmpProofStep, usedSatements: Set<IMmpStatement>): void;
    static getUsedStatements(mmpProof: MmpProof): Set<IMmpStatement>;
    static removeUnusedStatements(mmpProof: MmpProof): void;
}
