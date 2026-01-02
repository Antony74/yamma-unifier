/** This class computes a number of theory related statistics */
import { MmParser } from './MmParser';
import { AssertionStatement } from "./AssertionStatement";
import { GlobalState } from '../general/GlobalState';
export declare class MmStatistics {
    mmParser: MmParser;
    /** maps every symbol to the set of assertions wher it appears */
    symbolToAssertionsMap: Map<string, Set<AssertionStatement>> | undefined;
    constructor(mmParser: MmParser);
    buildStatisticsForSingleFormula(formula: string[], assertion: AssertionStatement): void;
    private buildStatisticsForAssertion;
    /**
     * builds the statistics for the given theory
     */
    buildStatistics(): void;
    static updateStatistics(mmParser: MmParser, globalState: GlobalState): void;
}
