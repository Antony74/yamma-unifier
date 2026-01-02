import { BlockStatement } from "./BlockStatement";
import { MmToken } from '../grammar/MmLexer';
export declare abstract class Statement {
    ParentBlock?: BlockStatement;
    outermostBlock?: BlockStatement;
    comment?: MmToken[];
    private _normalizedComment;
    private _isDiscouraged?;
    constructor(parentBlock?: BlockStatement, comment?: MmToken[]);
    /** returns the formula as a normalized string: normalized means that
    * between each pair of symbols there will be exactly one character, no matter
    * how the formula was originally written */
    get normalizedComment(): string;
    get isDiscouraged(): boolean;
}
export declare class ZIStatement extends Statement {
    constructor();
}
export declare class ZRStatement extends Statement {
    referencedZ: number;
    constructor(referencedZ: number);
}
