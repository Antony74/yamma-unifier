import { MmToken } from '../grammar/MmLexer';
export declare class TokenReader {
    tokens: MmToken[];
    indexForNextToken: number;
    imported_files: Set<any>;
    private _lastComment;
    /** retrieves and resets the value of the last comment */
    get lastComment(): MmToken[];
    constructor(tokens: MmToken[]);
    Read(): MmToken | undefined;
    Readf(): MmToken | undefined;
    Readc(): MmToken | undefined;
    readstat(): MmToken[];
}
