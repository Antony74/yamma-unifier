import { MmToken } from '../grammar/MmLexer';
import { IMmpStatement } from './MmpStatement';
export declare class MmpTheoremLabel implements IMmpStatement {
    static dollarTokenWidhDefaultRange: MmToken;
    dollarStatementKeyword: MmToken;
    theoremLabel?: MmToken;
    constructor(dollarStatementKeyword: MmToken, theoremLabel?: MmToken);
    toText(): string;
    /** creates a MmpTheoremLabel from the given string, using dummy ranges */
    static CreateMmpTheoremLabel(theoremLabel: string): MmpTheoremLabel;
}
