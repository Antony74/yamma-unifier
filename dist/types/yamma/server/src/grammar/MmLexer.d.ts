import { WorkingVars } from "../mmp/WorkingVars";
import { Lexer, LexerState, Token } from "nearley";
import { Range } from 'vscode-languageserver-textdocument';
export declare class MmToken {
    filePath?: string | undefined;
    value: string;
    line: number;
    column: number;
    type: string | undefined;
    get range(): Range;
    constructor(value: string, line: number, column: number, type?: string, filePath?: string | undefined);
    containsTokenValue(value: string): boolean;
    clone(): MmToken;
    static joinValues(tokens: MmToken[], separator: string): string;
    static fromTokensToStrings(tokens: MmToken[]): string[];
}
export interface MmLexerState extends LexerState {
    mmTokens: MmToken[];
    nextTokenIndex: number;
}
export declare class MmLexer implements Lexer {
    tokens: MmToken[];
    tokenLines: MmToken[][];
    textToTokenize: string;
    nextTokenIndex: number;
    workingVars: WorkingVars;
    constructor(workingVars: WorkingVars);
    reset(data: string, state?: MmLexerState): void;
    next(): MmToken | undefined;
    /** returns the next token, without advancing the index */
    current(): MmToken | undefined;
    save(): LexerState;
    formatError(_token: Token, _message: string): string;
}
