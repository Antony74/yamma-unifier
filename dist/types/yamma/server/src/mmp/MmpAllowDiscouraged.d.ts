import { MmToken } from '../grammar/MmLexer';
import { IMmpStatement } from './MmpStatement';
export declare class MmpAllowDiscouraged implements IMmpStatement {
    private dollarStatementKeyword;
    constructor(dollarStatementKeyword: MmToken);
    toText(): string;
}
