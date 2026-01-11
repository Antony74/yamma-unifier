import { Diagnostic, TextDocuments } from 'vscode-languageserver';
import { Range, TextDocument } from 'vscode-languageserver-textdocument';
import { MmParser } from '../mm/MmParser';
import { MmpParser, MmpParserErrorCode, MmpParserWarningCode } from './MmpParser';
import { AssertionStatement } from "../mm/AssertionStatement";
import { WorkingVars } from './WorkingVars';
import { GlobalState } from '../general/GlobalState';
import { FormulaToParseNodeCache } from './FormulaToParseNodeCache';
import DiagnosticMessageForSyntaxError, { DisjVarAutomaticGeneration } from '../mm/ConfigurationManager';
/** validates a .mmp files and returns diagnostics
 * for the language server event handlers
 */
export declare class MmpValidator {
    private globalState;
    private diagnosticMessageForSyntaxError;
    mmParser: MmParser;
    private formulaToParseNodeCache;
    diagnostics: Diagnostic[];
    mmpParser: MmpParser | undefined;
    constructor(mmParser: MmParser, globalState: GlobalState, diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError);
    hypStack(assertionStatement: AssertionStatement): string[][];
    private updateStatistics;
    private addDiagnosticsForProofCompleteAndItContainsWorkingVarsAndThereAreNoUnusedTheoryVars;
    validateFullDocumentText(textToValidate: string, textDocumentUri: string, mmParser: MmParser, workingVars: WorkingVars): void;
    validateFullDocument(textDocument: TextDocument): Diagnostic[];
    static addDiagnosticError(message: string, range: Range, code: MmpParserErrorCode, diagnostics: Diagnostic[]): void;
    static addDiagnosticWarning(message: string, range: Range, code: MmpParserWarningCode, diagnostics: Diagnostic[]): void;
    static buildMmpParserFromText(textToParse: string, disjVarAutomaticGeneration: DisjVarAutomaticGeneration, mmParser: MmParser, formulaToParseNodeCache: FormulaToParseNodeCache): MmpParser;
    static buildMmpParserFromUri(textDocumentUri: string, documents: TextDocuments<TextDocument>, disjVarAutomaticGeneration: DisjVarAutomaticGeneration, mmParser: MmParser, formulaToParseNodeCache: FormulaToParseNodeCache): MmpParser | undefined;
}
