import { MmpProof } from '../MmpProof';
import { IMmpStatement } from '../MmpStatement';
import { RpnStep } from '../RPNstep';
import { ILabelMapCreatorForCompressedProof } from './MmpCompressedProofCreator';
export declare class MmpCompressedProofStatementFromPackedProof implements IMmpStatement {
    uProof: MmpProof;
    private _leftMargin;
    private _charactersPerLine;
    private _labelSequenceCreator;
    private _mmpPackedProofStatement;
    /**
     * step labels
     */
    labelMap: Map<string, number>;
    upperCaseLetterSequence: string[];
    private _proofInNormalMode?;
    /** maps each label (form mandatory hyps and for step labels) to the corresponding
     * number in the compressed proof */
    private _mandatoryHypsLabels;
    /**
     * a statement that represents a compressed proof
     * @param uProof
     * @param leftMargin the number of spaces to the left of the proof
     * @param charactersPerLine the max text column for the proof
     */
    constructor(uProof: MmpProof, leftMargin?: number, charactersPerLine?: number, labelSequenceCreator?: ILabelMapCreatorForCompressedProof);
    setLabelSequenceCreator(labelSequenceCreator: ILabelMapCreatorForCompressedProof | undefined): ILabelMapCreatorForCompressedProof;
    private addMandatoryHypLabel;
    private createMandatoryHypsLabels;
    private createLabelSequence;
    protected base5base20representation(givenNumber: number): number[];
    protected upperCaseLettersFromNumber(givenNumber: number): string[];
    getCurrentNumber(rpnStep: RpnStep): number;
    getUpperCaseLettersForThisStep(rpnStep: RpnStep): string[];
    private createUpperCaseLetterSequence;
    createCompressedProof(): void;
    get stringForLabelSequence(): string;
    computeLeftPaddingForTheSecondRow(): number;
    private addLabels;
    addUpperCaseLetterSequenceAnd(currentRow: string, text: string[]): string;
    toText(): string;
}
