import { HoverParams, Position, TextDocuments } from 'vscode-languageserver';
import { TextDocument } from "vscode-languageserver-textdocument";
import { MmToken } from '../grammar/MmLexer';
import { MmParser } from '../mm/MmParser';
import { LabeledStatement } from "../mm/LabeledStatement";
export declare abstract class OnHoverHandler {
    /**
     * The text to be shown for the onHover event
     */
    static getLineFromPosition(textDocument: TextDocument, position: Position): string;
    static getTokenGivenTheColumn(line: string, column: number): string;
    static getTokenFromPosition(textDocument: TextDocument, position: Position): string;
    static getMainContentForLabeledStatement(labeledStatement: LabeledStatement): string;
    /** returns the content for the OnHover documentation, but it is also used by the
     * OnCompletionResolveHandler, to return documentation for the completion items.
     * The commentFormatter parameter is used because the OnHover documentation has
     * more horizontal room and can display the original formatting, while the completion item
     * documentation has less horizontal room, and then, using the original
     * formatting, it would not fit and it would trigger the horizontal scrooling bar.
     */
    static getContentValueForLabeledStatement(labeledStatement: LabeledStatement, commentFormatter: (tokens: MmToken[]) => string): string;
    static getContentValueFromToken(parser: MmParser, token: string): string | undefined;
    static getHoverMessage(params: HoverParams, documents: TextDocuments<TextDocument>, parser: MmParser): string | undefined;
}
