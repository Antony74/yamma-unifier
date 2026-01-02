import { MmParser } from '../../yamma/server/src/mm/MmParser';
import { TokenReaderWithIndex } from './tokenReaderWithIndex';
export type ProofToReplace = {
    label: string;
    start: number;
    end: number;
};
export declare const parseForCompressOrDecompressProofs: (mmParser: MmParser, tokenReader: TokenReaderWithIndex, proofIds: string[], all: boolean) => ProofToReplace[];
