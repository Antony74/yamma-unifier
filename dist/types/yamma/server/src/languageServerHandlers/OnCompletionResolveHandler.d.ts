import { CompletionItem } from 'vscode-languageserver';
import { MmParser } from '../mm/MmParser';
export declare class OnCompletionResolveHandler {
    private mmParser?;
    constructor(mmParser?: MmParser | undefined);
    addDocumentationIfPossible(item: CompletionItem): void;
}
