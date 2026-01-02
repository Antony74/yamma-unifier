import { InternalNode } from '../grammar/ParseNode';
import { MmpProofStep } from "./MmpProofStep";
import { MmpProof } from './MmpProof';
import { FormulaToParseNodeCache } from './FormulaToParseNodeCache';
export declare class WorkingVarsUnifierApplier {
    private formulaToParseNodeCache?;
    unifier: Map<string, InternalNode>;
    uProof: MmpProof;
    constructor(unifier: Map<string, InternalNode>, uProof: MmpProof, formulaToParseNodeCache?: FormulaToParseNodeCache | undefined);
    invalidateParseNodeCache(mmpProofStep: MmpProofStep): void;
    applyUnifierToSingleInternalNode(parseNode: InternalNode): boolean;
    applyUnifierToSubstitution(mmpProofStep: MmpProofStep): void;
    rebuildSubstitution(mmpProofStep: MmpProofStep): void;
    applyUnifierToProofStep(mmpProofStep: MmpProofStep): void;
    /**
     * applies the unifier in every step of this.uProof;
     * at the end of the method, this.uProof will have all working vars
     * replaced by the given unifier
     */
    applyUnifier(): void;
}
