import { Connection, Position, Range } from 'vscode-languageserver/node';
import { GlobalState } from '../general/GlobalState';
import { MmStatistics } from '../mm/MmStatistics';
import { MmpParser } from '../mmp/MmpParser';
import { MmpProofStep } from "../mmp/MmpProofStep";
export interface ISearchCommandParameters {
    uri: string;
    cursorLine: number;
}
export declare class SearchCommandHandler {
    private globalState;
    maxNumberOfReturnedSymbols: number;
    searchCommandParameter: ISearchCommandParameters;
    connection: Connection;
    mmpParser?: MmpParser;
    mmStatistics?: MmStatistics;
    constructor(maxNumberOfReturnedSymbols: number, searchCommandParameter: ISearchCommandParameters, globalState: GlobalState);
    private getCurrentProofStep;
    /** if the cursor is on a MmpProofStep, it returns the line where the step begins (it could be
     * multine); otherwise, it returns the first line after the main comment */
    protected static positionForInsertionOfTheSearchStatement(cursorLine: number, currentMmpProofStep?: MmpProofStep): Position;
    private static addSymbol;
    private static unorderedSymbols;
    static symbolsOrderedByIncreasingPopularity(currentMmpProofStep?: MmpProofStep, mmStatistics?: MmStatistics): string[];
    private static symbolsString;
    private static buildSymbolsString;
    protected static buildSearchStatement(maxNumberOfReturnedSymbols: number, currentMmpProofStep?: MmpProofStep, mmStatistics?: MmStatistics): string;
    private insertNewSearchStatement;
    protected static computeRangeForCursor(insertPosition: Position, searchStatement: string): Range;
    private setSuggestedRangeForCursorPosition;
    private insertSearchStatementAfterStep;
    insertSearchStatement(): void;
}
