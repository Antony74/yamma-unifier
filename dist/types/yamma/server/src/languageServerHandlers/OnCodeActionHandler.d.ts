import { CodeActionParams, CodeAction, Diagnostic, Range, TextDocuments } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
export declare class CodeActionForDiagnostic {
    params: CodeActionParams;
    textDocuments: TextDocuments<TextDocument>;
    private _textDocument;
    codeActions: CodeAction[];
    constructor(params: CodeActionParams, textDocuments: TextDocuments<TextDocument>);
    calculateRangeToAddAtTheEnd(): Range;
    buildCodeAction(title: string, range: Range, text: string, diagnostics: Diagnostic[]): CodeAction;
    private addCodeAction;
    textForNewlyAddedConstraintComment(): string;
    private addCodeActionForMissingDjVarsStatement;
    private addCodeActionForDiscouragedStatement;
    editTextForAddAllMissingDjVarsConstraints(): string;
    codeActionForAddAllMissingDjVarsConstraint(range: Range): CodeAction;
    buildCodeActions(): CodeAction[];
}
export declare class OnCodeActionHandler {
    textDocuments: TextDocuments<TextDocument>;
    constructor(textDocuments: TextDocuments<TextDocument>);
    onCodeActionHandler(params: CodeActionParams): CodeAction[];
}
