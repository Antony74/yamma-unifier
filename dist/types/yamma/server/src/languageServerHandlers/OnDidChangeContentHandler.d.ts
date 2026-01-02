import { Connection, Diagnostic, Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ConfigurationManager } from '../mm/ConfigurationManager';
import { MmParser } from '../mm/MmParser';
import { MmpParser } from '../mmp/MmpParser';
import { GlobalState } from '../general/GlobalState';
export declare class OnDidChangeContentHandler {
    private globalState;
    connection: Connection;
    hasConfigurationCapability: boolean;
    hasDiagnosticRelatedInformationCapability: boolean;
    configurationManager: ConfigurationManager;
    mmParser: MmParser;
    suggestedRangeForCursorPosition?: Range;
    constructor(connection: Connection, hasConfigurationCapability: boolean, hasDiagnosticRelatedInformationCapability: boolean, globalState: GlobalState);
    private static cursorRangeForTextProofStatement;
    private static getFirstDiagnostic;
    private static computeRangeFromDiagnostics;
    /** if the proof text is found, the cursor is moved to that line, otherwise it
     * returns the Range of the first missing label */
    protected static computeRangeForCursor(diagnostics: Diagnostic[], mmpParser?: MmpParser): Range | undefined;
    /** sends a request to the client, to update the cursor position;
     * this method should be used by all the classes that want to request to
     * the client a cursor move
     */
    private requestMoveCursor;
    private updateCursorPosition;
    private requestTriggerSuggest;
    private triggerSuggestIfRequired;
    validateTextDocument(textDocument: TextDocument, unifyDoneButCursorPositionNotUpdatedYet: boolean): Promise<void>;
    static validateTextDocument(textDocument: TextDocument, connection: Connection, hasConfigurationCapability: boolean, hasDiagnosticRelatedInformationCapability: boolean, globalState: GlobalState): Promise<void>;
}
