import { MmToken } from '../grammar/MmLexer';
import { BlockStatement } from './BlockStatement';
import { LabeledStatement } from './LabeledStatement';
export declare class EHyp extends LabeledStatement {
    constructor(labelToken: MmToken, content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
}
