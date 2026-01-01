import { UnifierConfig } from './unifierDefinitions';
export declare const compressOrDecompressProofs: (command: "compress" | "decompress", mmData: string, proofIds: string[], all: boolean, config?: UnifierConfig) => string;
