import { BlockStatement } from "./BlockStatement";
import { LabeledStatement } from "./LabeledStatement";
import { AssertionStatement } from "./AssertionStatement";
import { MmToken } from '../grammar/MmLexer';
import { Grammar } from 'nearley';
import { Range } from 'vscode-languageserver-textdocument';
import { Connection, Diagnostic } from 'vscode-languageserver';
import { WorkingVars } from '../mmp/WorkingVars';
import { GlobalState } from '../general/GlobalState';
import { ProgressCallback } from '../parseNodesCreatorThread/ParseNodesCreator';
import { EventEmitter } from 'stream';
import { TokenReader } from './TokenReader';
export declare enum MmParserErrorCode {
    varNotInActiveFStatement = "varNotInActiveFStatement",
    stackHasMoreThanOneItemAtEndOfProof = "stackHasMoreThanOneItemAtEndOfProof",
    stackUnderflow = "stackUnderflow",
    assertionProvenDoesntMatch = "assertionProvenDoesntMatch",
    eHypDoesntMatchTheStackEntry = "eHypDoesntMatchTheStackEntry",
    missingDjVarsStatement = "missingDjVarsStatement",
    missingCloseParenthesisInPStatement = "missingCloseParenthesisInPStatement",
    notALabelOfAssertionOrOptionalHyp = "notALabelOfAssertionOrOptionalHyp",
    labelOfAProvableStatementWithFailedVerification = "labelOfAProvableStatementWithFailedVerification",
    formulaNonParsable = "FormulaNonParsable"
}
export declare enum MmParserWarningCode {
    unprovenStatement = "unprovenStatement"
}
export declare enum MmParserEvents {
    newAxiomStatement = "newAxiomStatement",
    newProvableStatement = "newProvableStatement",
    parsingProgress = "newParsingProgress",
    newLabel = "newLabel"
}
export type AssertionParsedArgs = {
    labeledStatement: LabeledStatement;
    mmParser: MmParser;
};
export type ParsingProgressArgs = {
    percentageOfWorkDone: number;
    connection: Connection;
    progressToken: string;
};
export interface MmDiagnostic extends Diagnostic {
    /** when defined, it is the label of the ProvableStatement of the proof the raises the Diagnostic */
    provableStatementLabel?: string;
    mmFilePath?: string;
}
export declare class MmParser extends EventEmitter {
    private globalState?;
    private progressToken?;
    outermostBlock: BlockStatement;
    labelToStatementMap: Map<string, LabeledStatement>;
    /** it will contain a map to assertions that are NOT for syntax expression */
    labelToNonSyntaxAssertionMap: Map<string, AssertionStatement>;
    lastComment: string;
    isParsingComplete: boolean;
    diagnostics: MmDiagnostic[];
    parseFailed: boolean;
    private _grammar;
    private _percentageOfWorkDone;
    /** it will be set by the theory loader, when all theory parse nodes will
     * be ready
     */
    areAllParseNodesComplete: boolean;
    /** it will be true if at least one theorme has a $= ? $. unproven marker */
    containsUnprovenStatements: boolean;
    get grammar(): Grammar;
    private _workingVars;
    /** returns the WorkingVars class for this theory */
    get workingVars(): WorkingVars;
    constructor(globalState?: GlobalState | undefined, progressToken?: string | undefined);
    private fail;
    private addDiagnosticError;
    static addDiagnosticError(message: string, range: Range, code: MmParserErrorCode, diagnostics: MmDiagnostic[], provableStatementLabel?: string, filePath?: string): void;
    addDiagnosticWarning(message: string, range: Range, code: MmParserWarningCode, provableStatementLabel?: string, filePath?: string): void;
    private notifyProgressIfTheCase;
    private readComment;
    private addFStatement;
    checkEveryVarIsInActiveFStatement(statementContent: MmToken[], currentBlock: BlockStatement): void;
    addAStatement(labelToken: MmToken | undefined, toks: TokenReader, currentBlock: BlockStatement): void;
    addEStatement(labelToken: MmToken | undefined, toks: TokenReader, currentBlock: BlockStatement): void;
    addPStatement(label: MmToken | undefined, toks: TokenReader, currentBlock: BlockStatement): void;
    protected buildLabelToStatementMap(toks: TokenReader, currentBlock?: BlockStatement): void;
    Parse(tokenReader: TokenReader, currentBlock?: BlockStatement): void;
    ParseFileAsync(localFileName: string): void;
    parseFromTokenReader(tokenReader: TokenReader): void;
    ParseFileSync(localFileName: string): void;
    ParseText(text: string, mmFileFullPath?: string): void;
    createParseNodesForAssertionsAsync(progressCallback?: ProgressCallback): Promise<void>;
    /** true iff the formula is a provable statement (typically, it starts with '|-' ) */
    static isParsable(labeledStatement: LabeledStatement): boolean;
    /** createParseNodesForAssertionsSync will lock up an interactive system while it runs, which
     *  could be minutes for a large .mm file.  createParseNodesForAssertionsAsync is usually prefered. */
    createParseNodesForAssertionsSync(progressCallback?: ProgressCallback): void;
}
