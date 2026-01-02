import { Grammar } from 'nearley';
import { Diagnostic } from 'vscode-languageserver/node';
import { BlockStatement } from '../mm/BlockStatement';
import { MmToken } from '../grammar/MmLexer';
import { InternalNode, ParseNode } from '../grammar/ParseNode';
import { AssertionStatement } from "../mm/AssertionStatement";
import { WorkingVars } from './WorkingVars';
import { MmpProofStep } from "./MmpProofStep";
export interface SubstitutionResult {
    hasBeenFound: boolean;
    substitution: Map<string, InternalNode> | undefined;
}
export declare class MmpSubstitutionBuilder {
    uProofStep: MmpProofStep;
    assertion: AssertionStatement;
    outermostBlock: BlockStatement;
    workingVars: WorkingVars;
    grammar: Grammar;
    diagnostics: Diagnostic[];
    private logicalSystemEHyps;
    private eHypUSteps;
    /** when this is true, a working var cannot be a substitution of a "complex" formula,
     * it must correspond to a logical variable;
     * for instance, if the parse node for the formula ( ph - ps ) had to match with $W1,
     * the SubstitutionBuilder should fail;
     * instead, when this.requireWorkingVarsToBeASubstitutionOfALogicalVar is false
     * the Substitution wil not fail if ( ph - ps ) had to match with $W1 (maybe the
     * m.g.u. algoritm will fail, later on);
     * the strongest requirement is used by the step derivation process
    */
    requireWorkingVarsToBeAnExactSubstitutionOfALogicalVar: boolean;
    constructor(uProofStep: MmpProofStep, assertion: AssertionStatement, outermostBlock: BlockStatement, workingVars: WorkingVars, grammar: Grammar, diagnostics: Diagnostic[], requireWorkingVarsToBeAnExactSubstitutionOfALogicalVar?: boolean);
    isSameKind(logicalSystemVariable: string, uStepParseNode: ParseNode): boolean;
    addSubstitutionOrCheckCoherence(logicalSystemVariable: string, uStepParseNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForLeafNodeWithInternalNode(logicalSystemFormulaToken: MmToken, uStepParseNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForLeafNode(logicalSystemFormulaToken: MmToken, uStepParseNode: ParseNode, substitution: Map<string, InternalNode>): boolean;
    private isInternalNodeForLogicalVariableNotAddedToSubstitutionYet;
    buildExactSubstitutionForWorkingVar(logicalSystemFormulaInternalNode: InternalNode, uStepInternalNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForWorkingVarOfTheSameKind(logicalSystemFormulaInternalNode: InternalNode, uStepInternalNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForChildren(logicalSystemParseNodes: ParseNode[], uStepParseNodes: ParseNode[], substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForInternalNodesOfTheSameKindNoWorkingVar(logicalSystemFormulaInternalNode: InternalNode, uStepInternalNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForBothInternalNode(logicalSystemFormulaInternalNode: InternalNode, uStepInternalNode: InternalNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForInternalNode(logicalSystemFormulaInternalNode: InternalNode, uStepParseNode: ParseNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForParseNode(parseNodeForLogicalSystemFormula: ParseNode, uStepParseNode: ParseNode, substitution: Map<string, InternalNode>): boolean;
    buildSubstitutionForSingleLine(logicalSystemFormulaInternalNode: InternalNode, uStepFormula: MmToken[] | undefined, uStepParseNode: InternalNode | undefined, substitution: Map<string, InternalNode>): boolean;
    addSubstitutionForEHypsMoreOrEqual(substitution: Map<string, InternalNode>): any;
    buildSubstitutionForEHyps(substitution: Map<string, InternalNode>): boolean;
    addDiagnosticsForWorkingVar(strWorkingVar: string, parseNode: ParseNode, message: string): void;
    private addDiagnosticsForWorkingVarsIfTheCase;
    private tryToUnifyWorkingVars;
    buildSubstitutionForExistingParseNodes(): SubstitutionResult;
    addWorkingVarsForLogicalVarsWithoutASubstitutionForUndefinedInternalNode(logicalSystemFormulaInternalNode: InternalNode, substitution: Map<string, InternalNode>): void;
    addWorkingVarsForLogicalVarsWithoutASubstitutionForSingleParseNode(parseNodeForLogicalSystemFormula: ParseNode | undefined, substitution: Map<string, InternalNode>): void;
    addWorkingVarsForLogicalVarsWithoutASubstitution(substitution: Map<string, InternalNode>): void;
    /**
     * tries to find substitution for the uProofStep given in the constructor. If the uProofStep can be unified
     * with the given logical assertion, a substitution is returned and it is complete (all logical vars
     * have a substitution; some logical vars may be substituted with a Working Var)
     * @returns
     */
    buildSubstitution(): SubstitutionResult;
    buildCompleteSubstitutionForExistingParseNodes(substitution: Map<string, InternalNode>, nonUnifiableLogicalParseNodes: InternalNode[]): Map<string, InternalNode>;
    addWorkingVarsForLogicalVarsWithoutASubstitutionUsingNonUnifiableSteps(substitution: Map<string, InternalNode>, nonUnifiableLogicalParseNodes: InternalNode[]): void;
    /**
     * returns a substitution for the uProofStep given in the constructor. It will return a substitution
     * even if the uProofStep cannot be unified. The substitution returned is complete (all logical vars
     * have a substitution; some logical vars may be substituted with a Working Var).
     * This method can be invoked the best possible Diagnostic, when a unification error is encountered.
     */
    buildACompleteSubstitutionEvenIfNonUnifiable(): Map<string, InternalNode>;
}
