import { Command, CompletionItem, Range, TextEdit } from 'vscode-languageserver';
import { MmStatistics } from '../mm/MmStatistics';
import { AssertionStatement } from "../mm/AssertionStatement";
import { MmpSearchStatement } from '../mmp/MmpSearchStatement';
import { MmpParser } from '../mmp/MmpParser';
export declare class SearchStatementCompletionProvider {
    private mmpParser;
    static noAssertionFoundLabel: string;
    mmpSearchStatement: MmpSearchStatement;
    mmStatistics: MmStatistics;
    constructor(mmpSearchStatement: MmpSearchStatement, mmpParser: MmpParser, mmStatistics: MmStatistics);
    addAssertionSet(symbol: string, result: Set<Set<AssertionStatement>>): void;
    private assertionsSets;
    private assertionOrEHypsContainSubstring;
    private assertionContainsAllSubstrings;
    private selectAssertionsContainingNormalizedSubstrings;
    private getAssertionsFromSymbolFilter;
    addItemNotFound(completionItems: CompletionItem[]): void;
    getLineToInsertLabel(): number;
    getRangeToInsertLabel(): Range;
    createCommand(label: string, labelRange: Range): Command;
    addAssertion(assertion: AssertionStatement, completionItems: CompletionItem[], rangeToInsertLabel: Range, _textEditToRemoveSearchStatement: TextEdit): void;
    completionItemsForAssertionsInTheIntersections(assertionsToBeReturned: Set<AssertionStatement> | undefined): CompletionItem[];
    addAssertionIfItPassesCommentFilter(assertion: AssertionStatement, assertionsFromSymbolAndCommentFilters: Set<AssertionStatement>): void;
    private doesCommentContainAllSubstrings;
    applyCommentFilter(assertionsFromSymbolFilter: Set<AssertionStatement> | undefined): Set<AssertionStatement> | undefined;
    completionItems(): CompletionItem[];
}
