import { BlockStatement } from "./BlockStatement";
import { MmToken } from '../grammar/MmLexer';
import { Statement } from './Statements';
export declare abstract class NonBlockStatement extends Statement {
    Content: MmToken[];
    private _formula;
    private _normalizedFormula;
    constructor(content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
    /**
     * Return the content as a string array. If the content contains a proof,
     * it returns only the content BEFORE the proof
     */
    get formula(): string[];
    /** returns the formula as a normalized string: normalized means that
     * between each pair of symbols there will be exactly one character, no matter
     * how the formula was originally written */
    get normalizedFormula(): string;
}
