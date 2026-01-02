import { BlockStatement } from '../mm/BlockStatement';
import { LabeledStatement } from '../mm/LabeledStatement';
import { ProofNode } from './ProofNode';
/**
 * This class resembles the RNPstep class in mmj2.
 * Stores backreference information in "packed" and "compressed" formats.
 * In packed format, proof steps come in three different flavors: unmarked
 * (for example 'syl') and marked (for example '5:syl'), as well
 * as backreference steps (just written as numbers i.e. '5'). In
 * compressed format the same rules apply, except it is harder to read.
 * Marked steps get a 'Z' after the number, and backreferences are
 * numbers larger than the statement list. In our format, which most closely
 * resembles the packed format, unmarked steps have undefined markedStep
 * and undefined backRef.
 * Marked steps have a valid markedStep (the ref number, in the packedProof)
 * and undefined backRef.
 * Backreference steps, have undefined markedStep and backRef is referenced step.
 * )
 */
export declare class RpnStep {
    proofNode: ProofNode;
    outermostBlock: BlockStatement;
    backRef?: RpnStep | undefined;
    isMarkedStep: boolean;
    markedStepNumber?: number;
    labeledStatement: LabeledStatement;
    get isLogHyp(): boolean;
    get isVarHyp(): boolean;
    /** true iff it is a logHyp or a varHyp */
    get isHyp(): boolean;
    get isBackRefStep(): boolean;
    /** true iff the proof for the given proof node is a single label; we don't want
     * this kind of RPNStep to be a marked step. This is similar the mmj2 behaviour,
     * see the paramater pressLeaf given as true to the mmj2 method
     * ParseNode.convetToRPN(final boolean pressLeaf)
     */
    isSingleStepProof(proofNode: ProofNode): boolean;
    /** true iff its proof is a single step. It is used by  */
    get isMarkedStepCandidate(): boolean;
    constructor(proofNode: ProofNode, outermostBlock: BlockStatement, backRef?: RpnStep | undefined);
    get labelForCompressedProof(): string;
    /** this is similar to the ParseNode.convertToRPN() method in mmj2	 */
    static isUnmarkedStep(proofNode: ProofNode, outermostBlock: BlockStatement): boolean;
    static createRpnStep(proofNode: ProofNode, outermostBlock: BlockStatement, encountered: Map<ProofNode, RpnStep>): RpnStep;
    static addCurrentProofNode(proofNode: ProofNode, outermostBlock: BlockStatement, encountered: Map<ProofNode, RpnStep>, rpnSteps: RpnStep[]): void;
    static packedProofForAStepThatIsNotABackreference(proofNode: ProofNode, outermostBlock: BlockStatement, encountered: Map<ProofNode, RpnStep>, rpnSteps: RpnStep[]): void;
    static packedProof2(proofNode: ProofNode, outermostBlock: BlockStatement, encountered: Map<ProofNode, RpnStep>, rpnSteps: RpnStep[]): void;
    static setMarkedStepNumber(rpnSteps: RpnStep[]): void;
    static packedProof(proofNode: ProofNode, outermostBlock: BlockStatement): RpnStep[];
    toText(): string;
}
