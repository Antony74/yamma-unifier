import { MmToken } from '../grammar/MmLexer';
import { BlockStatement } from './BlockStatement';
import { LabeledStatement } from './LabeledStatement';
export declare class FHyp extends LabeledStatement {
    constructor(label: MmToken, content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
    get Variable(): string;
    get Kind(): string;
}
