import { IMmpStatement, UProofStatementStep } from './MmpStatement';
/** Proof statement in 'normal' (non compressed) mode */
export declare class UProofStatement implements IMmpStatement {
    private charactersPerLine;
    proof: UProofStatementStep[];
    constructor(proof: UProofStatementStep[], charactersPerLine: number);
    static labelsArray(proof: UProofStatementStep[]): string[];
    buildLabelRows(labels: string[], charactersPerLine: number): string[];
    toText(): string;
}
