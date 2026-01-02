import { CompletionItem } from 'vscode-languageserver';
import { CursorContext } from "../mmp/CursorContext";
import { MmParser } from '../mm/MmParser';
import { MmStatistics } from '../mm/MmStatistics';
import { MmpParser } from '../mmp/MmpParser';
import { MmpStatistics } from '../mmp/MmpStatistics';
export declare class SyntaxCompletion {
    /** the cursor context for autocompletion */
    cursorContext: CursorContext;
    mmParser: MmParser;
    mmpParser: MmpParser;
    mmStatistics: MmStatistics;
    mmpStatistics?: MmpStatistics;
    constructor(cursorContext: CursorContext, mmParser: MmParser, mmpParser: MmpParser, mmStatistics: MmStatistics, mmpStatistics?: MmpStatistics);
    static getSymbolsFromErrorMessage(errorMessage: string): string[];
    private getSymbols;
    /** returns '0' if the symbol is in the current .mmp file, returns '1' otherwise */
    firstCharacterForSorting(symbol: string): string;
    sortingByPopularity(symbol: string): string;
    /** symbols already in the current .mmp file are listed first; then are
     * sorted by popularity in the whole theory
     */
    private sortText;
    getCompletionItems(symbols: string[]): CompletionItem[];
    completionItems(): CompletionItem[];
}
