import { BlockStatement } from "./BlockStatement";
import { MmToken } from '../grammar/MmLexer';
import { NonBlockStatement } from './NonBlockStatement';
export declare class DisjointStatement extends NonBlockStatement {
    constructor(content: MmToken[], parentBlock: BlockStatement);
}
