import { LabeledStatement } from '../../mm/LabeledStatement';
import { CreateLabelMapArgs, ILabelMapCreatorForCompressedProof } from './MmpCompressedProofCreator';
export interface MapEntry {
    index: number;
    numberOfOccurences: number;
}
export declare class MmpSortedByReferenceLabelMapCreator implements ILabelMapCreatorForCompressedProof {
    private createLabeledStatementToOccourencesMap1;
    /** reorders labelToNumberOfOccourencesMap, putting Hyps first */
    buildEntry(numberOfOccurences: number, index: number): MapEntry;
    private createLabelToNumberOfOccourencesMapWithHypsFirst;
    /** returns a Map whith number of occourences; they are in the order of RpnSteps in the packed proof, but
     *  with Hyps at the beginning */
    protected createLabeledStatementToOccourencesMap(createLabelMapArgs: CreateLabelMapArgs): Map<LabeledStatement, MapEntry>;
    protected labelsToLabelMap(labels: string[]): Map<string, number>;
    createLabelMap(createLabelMapArgs: CreateLabelMapArgs): Map<string, number>;
}
