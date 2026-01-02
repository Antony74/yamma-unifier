import { MmToken } from '../grammar/MmLexer';
import { IMmpStatement } from './MmpStatement';
export declare class MmpGetProofStatement implements IMmpStatement {
    private getProofKeyword;
    theoremLabel?: MmToken | undefined;
    constructor(getProofKeyword: MmToken, theoremLabel?: MmToken | undefined);
    toText(): string;
}
