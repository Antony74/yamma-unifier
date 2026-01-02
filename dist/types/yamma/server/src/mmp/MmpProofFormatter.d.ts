import { MmpProofStep } from './MmpProofStep';
import { MmpProof } from './MmpProof';
export declare class MmpProofFormatter {
    uProof: MmpProof;
    constructor(uProof: MmpProof);
    private updateIndentationLevel;
    protected computeIndentationLevels(): void;
    getTextForFormula(uProofStep: MmpProofStep): string;
    private textForUProofStep;
    textWithIndentedProof(): string;
}
