import { Diagnostic } from 'vscode-languageserver';
import { BlockStatement } from './BlockStatement';
import { DisjointVarMap } from './DisjointVarMap';
import { MmToken } from '../grammar/MmLexer';
import { InternalNode } from '../grammar/ParseNode';
import { AssertionStatement } from "./AssertionStatement";
import { MmpProof } from '../mmp/MmpProof';
export interface DataFieldForMissingDjVarConstraintsDiagnostic {
    missingDisjVar1: string;
    missingDisjVar2: string;
}
export declare class DisjointVarsManager {
    private mandatoryVars;
    assertion: AssertionStatement;
    substitution: Map<string, InternalNode>;
    outermostBlock: BlockStatement;
    produceDiagnostics: boolean;
    stepLabelToken?: MmToken;
    stepRef?: string;
    uProof?: MmpProof;
    diagnostics: Diagnostic[];
    /** true iff the last checkSingleDisjVarsPair() found a disj var constraint violation */
    foundDisjVarsConstraintViolation: boolean;
    /** the missing disjoint constraints, computed by the last call to
     *  checkMissingDisjVarsConstraints() */
    missingDisjVarConstraints: DisjointVarMap | undefined;
    constructor(assertion: AssertionStatement, substitution: Map<string, InternalNode>, outermostBlock: BlockStatement, mandatoryVars: Set<string>, produceDiagnostics: boolean, stepLabelToken?: MmToken, stepRef?: string, uProof?: MmpProof);
    private addDiagnosticForCommonVariable;
    private checkDisjVarsForTwoNodes;
    private checkSingleDisjVarsPair;
    checkDisjVarsConstraintsViolation(): void;
    addDisjVarsConstraintForCurrentNodes(parseNode1: InternalNode, parseNode2: InternalNode, uProof: MmpProof, missingDisjVarConstraints: DisjointVarMap): void;
    private getMissingDisjVarConstraints;
    isDummy(variable: string): boolean;
    addMissingDjVarConstraint(var1: string, var2: string): void;
    private addDiagnosticsForMissingDjVarConstraints;
    /** a Diagnostic is added when two vars are in the respective substitution of two
     * mandatory vars (for the assertion in the constructor)
     */
    checkMissingDisjVarsConstraints(uProof: MmpProof): void;
}
