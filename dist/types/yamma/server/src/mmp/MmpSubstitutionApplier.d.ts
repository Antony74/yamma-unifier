import { Grammar } from 'nearley';
import { BlockStatement } from '../mm/BlockStatement';
import { MmToken } from '../grammar/MmLexer';
import { InternalNode, ParseNode } from '../grammar/ParseNode';
import { AssertionStatement } from "../mm/AssertionStatement";
import { MmpProof } from './MmpProof';
import { WorkingVars } from './WorkingVars';
import { MmpProofStep } from "./MmpProofStep";
export declare class MmpSubstitutionApplier {
    substitution: Map<string, InternalNode>;
    uStepIndex: number;
    assertion: AssertionStatement;
    outermostBlock: BlockStatement;
    workingVars: WorkingVars;
    grammar: Grammar;
    uProof: MmpProof;
    private uProofStep;
    private logicalSystemEHyps;
    private eHypUSteps;
    constructor(substitution: Map<string, InternalNode>, uStepIndex: number, uProof: MmpProof, assertion: AssertionStatement, outermostBlock: BlockStatement, workingVars: WorkingVars, grammar: Grammar);
    static createParseNodeForMmToken(parseNodeForLogicalSystemFormula: MmToken, substitution: Map<string, InternalNode>): ParseNode;
    static isInternalNodeForLogicalVariable(parseNodeForLogicalSystemFormula: ParseNode, outermostBlock: BlockStatement): boolean;
    static createParseNodeForLogicalVariable(internalNodeForLogicalVariable: InternalNode, substitution: Map<string, InternalNode>): InternalNode;
    static createParseNodeForInternalNode(parseNodeForLogicalSystemFormula: InternalNode, substitution: Map<string, InternalNode>, outermostBlock: BlockStatement): InternalNode;
    static createParseNode(parseNodeForLogicalSystemFormula: ParseNode, substitution: Map<string, InternalNode>, outermostBlock: BlockStatement): ParseNode;
    applySubstitutionToSingleNode(uProofStep: MmpProofStep, parseNodeForLogicalSystemFormula: InternalNode): void;
    applySubstitutionToEHypsAndAddMissingOnes(): number;
    /**
     * Applies a substitution to a single MmpProofStep:
     * - if the formula is missing, it's added (with working vars)
     * - if an $e hypothesis is missing, it's added (with working vars)
     * - new $e hypothesis and the MmpProofStep are added at the end of to the UProof
     * Returns the new index for the MmpProofStep that was indexed by uStepIndex (this
     * can be increased, if new hypothesis are added)
     */
    applySubstitution(): number;
}
