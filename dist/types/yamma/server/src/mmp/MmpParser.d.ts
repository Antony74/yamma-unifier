import { Grammar } from 'nearley';
import { Diagnostic, Range } from 'vscode-languageserver';
import { BlockStatement } from '../mm/BlockStatement';
import { MmLexer, MmToken } from '../grammar/MmLexer';
import { ProofStepFirstTokenInfo } from './MmpStatements';
import { MmpProofStep } from "./MmpProofStep";
import { LabeledStatement } from "../mm/LabeledStatement";
import { AssertionStatement } from "../mm/AssertionStatement";
import { WorkingVars } from './WorkingVars';
import { InternalNode, ParseNode } from '../grammar/ParseNode';
import { MmpProof } from './MmpProof';
import { OrderedPairOfNodes } from './WorkingVarsUnifierFinder';
import { DataFieldForMissingDjVarConstraintsDiagnostic } from '../mm/DisjointVarsManager';
import { EHyp } from '../mm/EHyp';
import { MmParser } from '../mm/MmParser';
import { FormulaToParseNodeCache } from './FormulaToParseNodeCache';
import { IDiagnosticMessageForSyntaxError } from './DiagnosticMessageForSyntaxError';
import { MmpComment } from './MmpComment';
import { MmpDisjVarStatement } from './MmpDisjVarStatement';
import { DisjVarAutomaticGeneration } from '../mm/ConfigurationManager';
export declare enum MmpParserErrorCode {
    unexpectedEndOfFormula = "unexpectedEndOfFormula",
    formulaSyntaxError = "formulaSyntaxError",
    firstTokenWithMoreThanTwoColumns = "firstTokenWithMoreThanTwoColumns",
    stepRefCannotContainAComma = "stepRefCannotContainAComma",
    unknownLabel = "unknownLabel",
    provableStatementWithFailedVerification = "provableStatementWithFailedVerification",
    unificationError = "unificationError",
    workingVarUnificationError = "workingVarUnificationError",
    refStatementUnificationError = "refStatementUnificationError",
    wrongNumberOfEHyps = "wrongNumberOfEHyps",
    duplicatedEHyp = "duplicatedEHyp",
    wrongVariableKind = "wrongVariableKind",
    notAnAssertion = "notAnAssertion",
    unknownStepRef = "unknownStepRef",
    djVarsRestrictionViolated = "djVarsRestrictionViolated",
    disjVarSyntaxError = "disjVarSyntaxError",
    eHypLabelNotCoherentForAlreadyExistingTheorem = "eHypLabelNotCoherentForAlreadyExistingTheorem",
    missingQedStatementForAlreadyExistingTheorem = "missingQedStatementForAlreadyExistingTheorem",
    doesntMatchTheoryFormula = "doesntMatchTheoryFormula",
    disjVarConstraintNotInTheTheory = "disjVarConstraintNotInTheTheory",
    wrongNumberOfEHypsForAlreadyExistingTheorem = "wrongNumberOfEHypsForAlreadyExistingTheorem",
    disjVarWithItself = "disjVarWithItself",
    /** The formula in a $a or $e statement is not parsable wrt the grammar of the specific theory.
    The error is in the .mm file, not in the .mmp file, but we report it here also when we try to unify a proof step
    with a label for which the formula in the .mm is not parsable and the .mmp does not
    have a formula either, because the unifier is trying to create the unified formula,
    but the formula in the theory cannot have a parse node and so the unification fails */
    mmFormulaNonParsable = "FormulaNonParsable"
}
export declare enum MmpParserWarningCode {
    missingLabel = "missingLabel",
    missingFormula = "missingFormula",
    missingRef = "missingRef",
    missingEHyps = "missingEHyps",
    missingMandatoryDisjVarsStatement = "missingMandatoryDisjVarsStatement",
    missingDummyDisjVarsStatement = "missingDummyDisjVarsStatement",
    missingTheoremLabel = "missingTheoremLabel",
    lastStatementShouldBeQed = "lastStatementShouldBeQED",
    missingComment = "missingComment",
    isDiscouraged = "isDiscouraged"
}
export interface IMmpParserParams {
    textToParse: string;
    mmParser: MmParser;
    workingVars: WorkingVars;
    disjVarAutomaticGeneration?: DisjVarAutomaticGeneration;
    formulaToParseNodeCache?: FormulaToParseNodeCache;
    diagnosticMessageForSyntaxError?: IDiagnosticMessageForSyntaxError;
    documentUri?: string;
}
export declare class MmpParser {
    params: IMmpParserParams;
    textToParse: string;
    mmLexer: MmLexer;
    mmParser: MmParser;
    labelToStatementMap: Map<string, LabeledStatement>;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    workingVars: WorkingVars;
    private diagnosticMessageForSyntaxError;
    /** when Parse() is invoked, it will contain the raw tokens produced by the MmLexer */
    mmTokens: MmToken[] | undefined;
    private _orderedPairsOfNodesForMGUalgorithm;
    refToProofStepMap: Map<string, MmpProofStep>;
    allowDiscouraged: boolean;
    diagnostics: Diagnostic[];
    disjVarAutomaticGeneration: DisjVarAutomaticGeneration;
    /** it will conatin the $d statements that are generated in place of warnings */
    disjVarStatementsAutomaticallyGenerated: MmpDisjVarStatement[];
    mmpProof: MmpProof | undefined;
    /** the set of eHyp labels, for this theorem; used to check if there is an eHyp label
     * duplication
     */
    private eHypLabels;
    formulaToParseNodeCache: FormulaToParseNodeCache | undefined;
    documentUri: string | undefined;
    constructor(params: IMmpParserParams);
    private addDiagnosticError;
    private addDiagnosticWarning;
    static hypRefRanges(hypRefs: string[], currentRow: number, positions: number[]): Range[];
    proofStepFirstTokenInfo(firstToken: MmToken): ProofStepFirstTokenInfo;
    addTheoremLabel(nextProofStepTokens: MmToken[]): void;
    private addAllowDiscouraged;
    addGetProofStatement(nextProofStepTokens: MmToken[]): void;
    addDiagnosticForDefaultComment(comment: MmpComment): void;
    addComment(nextProofStepTokens: MmToken[]): void;
    addSearchStatement(searchStatementTokens: MmToken[]): void;
    addProofStep(proofStep: MmpProofStep): void;
    private addDiagnosticMissingLabel;
    addDiagnisticsForEHypRefs(proofStepFirstTokenInfo: ProofStepFirstTokenInfo, stepLabel: MmToken, labeledStatement: AssertionStatement): void;
    addDiagnosticForEHypLabel(stepLabel: MmToken): void;
    private addDiagnosticForLabelAndEHypRefs;
    private static tryToParse;
    getParseNode(stepFormula: MmToken[]): InternalNode | undefined;
    private getEHypMmpStep;
    private getEHypMmpSteps;
    addDiagnosticForExpectedVariable(mmToken: MmToken): void;
    addDisjointVarConstraint(nextProofStepTokens: MmToken[]): void;
    createMmpProofStep(nextProofStepTokens: MmToken[]): void;
    addTextProofStatement(nextProofStepTokens: MmToken[]): void;
    createMmpStatementFromStepTokens(nextProofStepTokens: MmToken[]): void;
    private createNextMmpStatement;
    addDiagnisticsForSubstitutionInEHyp(frameEHypParseNode: ParseNode, referencedEHypProofStep: MmpProofStep, range: Range, substitution: Map<string, InternalNode>): void;
    addDiagnisticsForSubstitutionInEHyps(frameEHyps: EHyp[], proofStep: MmpProofStep, substitution: Map<string, InternalNode>): void;
    addDiagnisticsForAssertion(assertionStatementParseNode: ParseNode, proofStep: MmpProofStep, substitution: Map<string, InternalNode>): void;
    addDiagnisticsForSubstitution(frameEHyps: EHyp[], assertionStatement: AssertionStatement, proofStep: MmpProofStep, substitution: Map<string, InternalNode>): void;
    addStartingPairsForMGUFinder(mmpProofStep: MmpProofStep, assertion: AssertionStatement, substitution: Map<string, InternalNode>): void;
    isMissingDisjVar(diagnostic: Diagnostic): boolean;
    isDiagnosticToBeAdded(diagnostic: Diagnostic): boolean;
    generateDisjVarStatement(dataFieldForMissingDjVarConstraintsDiagnostic: DataFieldForMissingDjVarConstraintsDiagnostic): void;
    addDiagnosticsOrGenerateDisjVarStatements(diagnostics: Diagnostic[]): void;
    protected checkDisjVarConstraints(assertion: AssertionStatement, substitution: Map<string, InternalNode>, stepLabelToken: MmToken, stepRef: string): void;
    checkUnificationWithUSubstitutionManager(mmpProofStep: MmpProofStep, outermostBlock: BlockStatement, grammar: Grammar, workingVars: WorkingVars): void;
    /**
     * Adds diagnostics for each unification in the proof
     */
    checkUnificationOfLogicalVars(outermostBlock: BlockStatement, grammar: Grammar, workingVars: WorkingVars): void;
    /**
     * parses the given text and builds the properties mmpStatements , refToProofStepMap and diagnostics;
     * builds diagnostics, but it doesn't check for unification errors.
     * This is mainly used for testing it separately from the whole method parse
     * @param textToParse
     * @param labelToStatementMap
     * @param grammar
     */
    protected createMmpStatements(): void;
    checkQedStatement(): void;
    checkCoherenceIfAlreadyExistingTheorem(): void;
    addDiagnosticForOccourenceOfWorkingVarToSingleParseNode(parseNode: InternalNode, workingVar: string, errorMessage: string): void;
    addDiagnosticForOccourenceOfWorkingVarToSingleFormula(stepFormula: MmToken[], workingVar: string, errorMessage: string): void;
    addDiagnosticForEachOccourenceOfWorkingVar(workingVar: string, errorMessage: string): void;
    protected addDiagnosticsForWorkingVarsMGUerror(occourCheckOrderedPair: OrderedPairOfNodes): void;
    protected checkUnificationOfWorkingVars(): void;
    /**
     * parses the given text and builds the properties mmpStatements , refToProofStepMap and diagnostics
     * @param textToParse
     */
    parse(): void;
}
