import { MmpProof } from '../MmpProof';
import { IMmpStatement } from '../MmpStatement';
import { RpnStep } from '../RPNstep';
export declare class MmpPackedProofStatement implements IMmpStatement {
    private mmpProof;
    private charactersPerLine;
    packedProof: RpnStep[];
    constructor(mmpProof: MmpProof, charactersPerLine: number);
    createPackedProof(): RpnStep[];
    rpnPackedStepLabels(): string[];
    buildLabelRows(labels: string[], charactersPerLine: number): string[];
    toText(): string;
}
