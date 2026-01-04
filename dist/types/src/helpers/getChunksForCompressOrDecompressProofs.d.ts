import { Unifier } from '../unifierDefinitions';
import { ProofToReplace } from './parseForCompressOrDecompressProofs';
export declare const getChunksForCompressOrDecompressProofs: (command: "compress" | "decompress", mmData: string, proofsToReplace: ProofToReplace[], unifier: Unifier, actionCallback?: (label: string) => void) => string[];
