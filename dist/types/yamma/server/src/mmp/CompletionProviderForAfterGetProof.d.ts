import { CompletionItem, InsertReplaceEdit } from 'vscode-languageserver';
import { MmpParser } from './MmpParser';
import { CursorContext } from './CursorContext';
import { MmToken } from '../grammar/MmLexer';
export declare class CompletionProviderForAfterGetProof {
    private cursorContext;
    private mmpParser;
    private command;
    constructor(cursorContext: CursorContext, mmpParser: MmpParser);
    getPartialLabel(): MmToken;
    insertReplaceEdit(partialLabel: MmToken, label: string): InsertReplaceEdit | undefined;
    createAndAddItemFromPartialLabel(partialLabel: MmToken, label: string, completionItems: CompletionItem[]): void;
    getCompletionItemsFromPartialLabel(partialLabel: MmToken): CompletionItem[];
    completionItems(): CompletionItem[];
}
