import { MmpProof } from '../MmpProof';
import { IMmpStatement, UProofStatementStep } from '../MmpStatement';
import { MmpCompressedProofStatementFromPackedProof } from './MmpCompressedProofStatementFromPackedProof';
import { MmpPackedProofStatement } from './MmpPackedProofStatement';
import { LabelsOrderInCompressedProof } from '../../mm/ConfigurationManager';
export interface IMmpCompressedProofCreator {
    createMmpCompressedProof(mmpProof: MmpProof, leftMargin?: number, charactersPerLine?: number): IMmpStatement;
}
export interface CreateLabelMapArgs {
    mandatoryHypsLabels: Set<string>;
    proofInNormalMode?: UProofStatementStep[];
    mmpPackedProofStatement?: MmpPackedProofStatement;
}
export interface ILabelMapCreatorForCompressedProof {
    createLabelMap(createLabelMapArgs: CreateLabelMapArgs): Map<string, number>;
}
export declare class MmpCompressedProofCreatorFromPackedProof implements IMmpCompressedProofCreator {
    private _labelMapCreator;
    constructor(labelMapCreator?: ILabelMapCreatorForCompressedProof);
    createMmpCompressedProof(mmpProof: MmpProof, leftMargin: number, charactersPerLine: number): MmpCompressedProofStatementFromPackedProof;
    static getLabelMapCreatorForCompressedProof(labelsOrderInCompressedProof: LabelsOrderInCompressedProof, compressedProofLeftColumn: number, compressedProofRightColumn: number): ILabelMapCreatorForCompressedProof;
}
