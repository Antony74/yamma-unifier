import { Command, CompletionItem } from 'vscode-languageserver';
import { CursorContext } from './CursorContext';
import { MmpParser } from './MmpParser';
export declare class CompletionProviderForEmptyLine {
    private cursorContext;
    private mmpParser;
    private command;
    constructor(cursorContext: CursorContext, mmpParser: MmpParser);
    private insertReplaceEdit;
    addCompletionItem(suggestedLable: string, sortText: string, completionItems: CompletionItem[], command?: Command): void;
    addCompletionItemForTheoremLabel(completionItems: CompletionItem[]): void;
    addCompletionItemForGetProof(completionItems: CompletionItem[]): void;
    private addCompletionItemForAllowDiscouraged;
    completionItems(): CompletionItem[];
}
