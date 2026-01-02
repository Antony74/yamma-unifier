import { Range } from 'vscode-languageserver';
import { MmToken } from '../grammar/MmLexer';
import { IMmpStatementWithRange } from './MmpStatement';
export declare class MmpSearchStatement implements IMmpStatementWithRange {
    searchStatementTokens: MmToken[];
    static searchSymbolsKeyword: string;
    static searchCommentKeyword: string;
    symbolsToSearch: string[];
    normalizedSubstringsToSearch: string[];
    substringsToSearchInComments: string[];
    constructor(searchStatementTokens: MmToken[]);
    getSymbolsToSearch(searchStatementFormula: string[], searchCommentIndex: number): string[];
    private getIndexesForStringDelimiter;
    getSubarrayOfSymbols(searchStatementFormula: string[], indexesForStringDelimiter: number[], delimiterIndex: number): string[];
    getNormalizedSubstring(searchStatementFormula: string[], indexesForStringDelimiter: number[], delimiterIndex: number): string;
    getNormalizedSubstringsFromDelimeterIndexes(searchStatementFormula: string[], indexesForStringDelimiter: number[]): string[];
    /** returns an array of normalized strings to search; such strings are delimited by ' characters;
     * if the delimiters are in odd number, the substring from the last delimeter to the end of
     * the search string is considered to be an additional string to search
     */
    private getNormalizedSubstringsToSearch;
    getSubstringsForComments(searchStatementFormula: string[], searchCommentIndex: number): string[];
    get range(): Range;
    toText(): string;
}
