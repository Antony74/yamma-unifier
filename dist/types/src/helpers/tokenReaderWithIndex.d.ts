import { MmToken } from '../../yamma/server/src/grammar/MmLexer';
import { TokenReader } from '../../yamma/server/src/mm/TokenReader';
export declare class TokenReaderWithIndex extends TokenReader {
    readonly mmData: string;
    lastToken: MmToken | undefined;
    private index;
    private line;
    private column;
    private inComment;
    private scopeDepth;
    constructor(mmData: string, tokens: MmToken[]);
    Read(): MmToken | undefined;
    get lastIndex(): number;
    get lastTokenLength(): number;
    getClosingString(): string;
}
export declare const logToken: (token: MmToken | undefined) => void;
