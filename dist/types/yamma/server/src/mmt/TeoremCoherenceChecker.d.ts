import { Diagnostic, Range } from 'vscode-languageserver';
import { DisjointVarMap } from '../mm/DisjointVarMap';
import { ProvableStatement } from "../mm/ProvableStatement";
import { ILabeledStatementSignature, ITheoremSignature } from './MmtParser';
export declare class TheoremCoherenceChecker {
    theorem: ITheoremSignature;
    provableStatement: ProvableStatement;
    /** it will contain the result of checkCoherence()  */
    isTheoremCoherent?: boolean;
    diagnostics: Diagnostic[];
    defaultRangeForDiagnostics: Range;
    constructor(theorem: ITheoremSignature, provableStatement: ProvableStatement, defaultRangeForDiagnostics: Range, diagnostics: Diagnostic[]);
    addDiagnosticForInvalidConstraint(var1: string, var2: string): void;
    checkIfDisjVarConstraintsAreIncluded(disjVars: DisjointVarMap, theoryDisjVars: DisjointVarMap): void;
    checkLabels(mmtStatement: ILabeledStatementSignature, theoryStatementLabel: string): void;
    computeFormulaRange(mmtStatement: ILabeledStatementSignature): Range;
    checkFormulas(mmtStatement: ILabeledStatementSignature, theoryStatementFormula: string[]): void;
    private areLabeledStatementsEqual;
    addDiagnosticForWrongNumberOfEHyps(): void;
    private checkIfEHypsAreCoherent;
    checkIfPStatementIsCoherent(): void;
    /** the theorem can be added iff either it does not exist in the theory, or
     * it exists, but $e hyps agree and $p agrees and $d are included in those
     * in the theory
     */
    checkCoherence(): void;
}
