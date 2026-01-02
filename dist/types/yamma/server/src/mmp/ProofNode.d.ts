import { InternalNode } from '../grammar/ParseNode';
import { BlockStatement } from '../mm/BlockStatement';
import { MmpProofStep } from './MmpProofStep';
export declare class ProofNode {
    internalNode: InternalNode;
    children: ProofNode[];
    mmpProofStep?: MmpProofStep | undefined;
    constructor(internalNode: InternalNode, children: ProofNode[], mmpProofStep?: MmpProofStep | undefined);
    toText(): string;
    get cachedRpnRepresentation(): string;
    private static proofNodesWithSubstitution;
    static proofNodeForParseNode(parseNode: InternalNode, outermostBlock: BlockStatement): ProofNode;
    private static addProofNodesForFStatements;
    private static addProofNodesForEHyps;
    private static proofNodeChildren;
    static proofNodeForMmpProofStep(mmpProofStep: MmpProofStep): ProofNode;
    private static squishProofNodeChildren;
    private static squishProofNode2;
    static squishProofNode(proofNode: ProofNode): ProofNode;
}
