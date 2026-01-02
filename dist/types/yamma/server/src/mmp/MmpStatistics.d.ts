import { MmpParser } from './MmpParser';
import { MmpProofStep } from "./MmpProofStep";
export declare class MmpStatistics {
    mmpParser: MmpParser;
    /** the set of symbols in the given MmpParser */
    symbols?: Set<string>;
    constructor(mmpParser: MmpParser);
    addSymbolsForCurrentMmpProofStep(mmpProofStep: MmpProofStep): void;
    /**
     * builds the statistics for the given MmpParser
     */
    buildStatistics(): void;
}
