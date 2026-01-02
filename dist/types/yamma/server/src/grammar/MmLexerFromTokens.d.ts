import { Lexer, LexerState, Token } from 'nearley';
import { MmToken } from './MmLexer';
/**
 * This is a lexer for Nearly.js that uses an already computed array of tokens.
 * Thus, it will not consider the string to be passed from the Parser.parse() method.
 * This is useful to parse every formula keeping the range of each token.
 * This class will be used by the MmpParser, to build parse nodes with token ranges
 * that are exactly the same as in the original fomula.
 */
export declare class MmLexerFromTokens implements Lexer {
    private mmTokens;
    private nextTokenIndex;
    constructor(mmTokens: MmToken[]);
    reset(_data: string, _state?: LexerState): void;
    next(): Token | undefined;
    save(): LexerState;
    formatError(_token: Token, _message: string): string;
}
