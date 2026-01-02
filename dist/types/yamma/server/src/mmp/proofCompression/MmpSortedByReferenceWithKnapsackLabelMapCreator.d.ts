import { LabeledStatement } from '../../mm/LabeledStatement';
import { CreateLabelMapArgs } from './MmpCompressedProofCreator';
import { MapEntry, MmpSortedByReferenceLabelMapCreator } from './MmpSortedByReferenceLabelMapCreator';
/** This class orders the labels of the compressed proof, according to the following rules:
 * 1. LabeledStatements are ordered w.r.t. the number of occurrences in the packed proof
 * (mandatory Hyps are not considered; backRef statements are not considered). In the event
 * of a tie in the number of occurrences, Hyps are placed first.
 * 2. the list of LabeledStatements are then split in groups (blocks) where statements are
 * indexed by uppercase letters (representing integers) of the same length
 * 3. the knapsack algorithm is applied to each of these blocks (but within every single
 * block, labels are reordered in proof order)
 */
export declare class MmpSortedByReferenceWithKnapsackLabelMapCreator extends MmpSortedByReferenceLabelMapCreator {
    private compressedProofLeftColumn;
    private compressedProofRightColumn;
    constructor(compressedProofLeftColumn: number, compressedProofRightColumn: number);
    allocateDoubleArray(dim1: number, dim2: number): number[][];
    knapsackFit(lengthBlock: [LabeledStatement, MapEntry][], size: number): [LabeledStatement, MapEntry][];
    removeItemsFromLenghBlock(included: [LabeledStatement, MapEntry][], lengthBlock: [LabeledStatement, MapEntry][]): void;
    processBlock(parenStmt: string[], lengthBlock: [LabeledStatement, MapEntry][], width: number, linePos: number): number;
    /** mimics the mmj2 behavior:
     * - LabeledStatements with the same number of characters in the capital letter represent, are processed
     * in the same processBlock
     * - each processBlock applies a knapsack algorithm for each line, until the block is completed
     */
    private applyKnapSackFit;
    createLabelMap(createLabelMapArgs: CreateLabelMapArgs): Map<string, number>;
}
