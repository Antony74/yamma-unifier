import { Lexer, LexerState, Token } from 'nearley';
import { MmToken } from './MmLexer';
/**
 * This is a lexer for Nearly.js that uses an already computed array of strings.
 * Thus, it will not consider the string to be passed from the Parser.parse() method.
 * This is useful to parse a formula that's already been split, but token's range is not important.
 * This class will be used by the ModelBuilder, to build parse nodes for formulas on the (proof verification)
 * stack.
 */
export declare class MmLexerFromStringArray implements Lexer {
    private stringArray;
    private nextTokenIndex;
    constructor(stringArray: string[]);
    reset(_data: string, _state?: LexerState): void;
    next(): MmToken | undefined;
    save(): LexerState;
    formatError(_token: Token, _message: string): string;
}
