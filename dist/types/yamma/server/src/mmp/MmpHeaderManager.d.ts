import { MmpComment } from './MmpComment';
import { MmpProof } from './MmpProof';
import { IMmpStatement } from './MmpStatement';
export declare class MmpHeaderManager {
    private mmpProof;
    private expectedTheoremName?;
    private mmpComment;
    constructor(mmpProof: MmpProof, expectedTheoremName?: string | undefined);
    buildDefaultComment(): MmpComment;
    /** searches the first index for a MmpStatement that is not
     * a MmpTheoremLabel. If this is not a MmpComment, than a comment is inserted
     */
    getIndexToInsertMissingComment(): number | undefined;
    addCommentIfMissing(): void;
    getFirstStatement(): IMmpStatement | undefined;
    addTheoremLabelStatement(expectedTheoremName: string): void;
    private addTheoremLabelStatementIfMissing;
    addMissingStatements(): void;
}
