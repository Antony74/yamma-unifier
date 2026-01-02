import { CreateLabelMapArgs, ILabelMapCreatorForCompressedProof } from './MmpCompressedProofCreator';
export declare class MmpFifoLabelMapCreator implements ILabelMapCreatorForCompressedProof {
    createLabelMap(createLabelMapArgs: CreateLabelMapArgs): Map<string, number>;
}
