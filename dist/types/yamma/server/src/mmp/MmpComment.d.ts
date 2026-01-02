import { MmToken } from '../grammar/MmLexer';
import { IMmpStatement } from './MmpStatement';
export declare class MmpComment implements IMmpStatement {
    /** comment tokens, exclued the startin '*' character */
    contentTokens: MmToken[];
    comment: string;
    constructor(contentTokens: MmToken[], comment: string);
    static CreateMmpComment(comment: string): MmpComment;
    toText(): string;
}
