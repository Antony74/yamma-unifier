import { Diagnostic } from 'vscode-languageserver';
import { BlockStatement } from './BlockStatement';
import { Frame } from "./Frame";
import { Statement } from "./Statements";
import { ProvableStatement } from "./ProvableStatement";
import { LabeledStatement } from "./LabeledStatement";
import { AssertionStatement } from "./AssertionStatement";
import { FHyp } from './FHyp';
import { EHyp } from './EHyp';
export declare class Verifier {
    diagnostics: Diagnostic[];
    /** true iff the verify() method fails */
    verificationFailed: boolean;
    constructor(diagnostics: Diagnostic[]);
    private addDiagnosticError;
    fHypsStack(frame: Frame, stack: string[][]): string[][];
    eHypsStack(frame: Frame, stack: string[][]): string[][];
    buildSubstitution(frameFHyps: FHyp[], fHypsStack: string[][], assertionStatement?: AssertionStatement): Map<string, string[]>;
    selectVars(statementContent: string[], parentBlock: BlockStatement): Set<string>;
    checkDisjointViolation1(provableStatement: AssertionStatement, frameProofStep: Frame, disjVar1: string, disjVar2: string, substitution1: string[], substitution2: string[]): void;
    checkDisjointViolation(provableStatement: AssertionStatement, frameProofStep: Frame, substitution: Map<string, string[]>): void;
    applySubstitution(symbolList: string[], substitution: Map<string, string[]>): string[];
    checkSubstitutionForStakEHyps1(currentEHypInTheStack: string[], frameEHyp: string[], substitution: Map<string, string[]>, assertionStatement: AssertionStatement): boolean;
    checkSubstitutionForStakEHyps(eHypsStack: string[][], frameEHyps: EHyp[], substitution: Map<string, string[]>, assertionStatement: AssertionStatement): void;
    verifyAssertionStatementActually(assertionStatement: AssertionStatement, assertionStatementProofStep: AssertionStatement, stack: string[][]): void;
    verifyAssertionStatement(assertionStatement: AssertionStatement, assertionStatementProofStep: AssertionStatement, stack: string[][]): void;
    verifyDecompressedProof(provableStatement: ProvableStatement, proof: Statement[]): void;
    static getProofStatement(label: string, labelToStatementMap: Map<string, LabeledStatement>, currentBlock: BlockStatement): LabeledStatement | undefined;
    static GetProofStatements(proofStrings: string[], labelToStatementMap: Map<string, LabeledStatement>, currentBlock: BlockStatement): Statement[];
    addDiagnosticForMissingCompressedProofString(provableStatement: ProvableStatement, proofStrings: string[]): void;
    decompressExistingProofString(provableStatement: ProvableStatement, labelToStatementMap: Map<string, LabeledStatement>): Statement[] | undefined;
    getDecompressedProof(provableStatement: ProvableStatement, proofStrings: string[], labelToStatementMap: Map<string, LabeledStatement>): Statement[] | undefined;
    private setVerificationStatus;
    verify(provableStatement: ProvableStatement, proofStrings: string[], labelToStatementMap: Map<string, LabeledStatement>): void;
}
