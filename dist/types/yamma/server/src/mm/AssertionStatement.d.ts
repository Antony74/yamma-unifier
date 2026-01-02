import { BlockStatement } from "./BlockStatement";
import { Frame } from "./Frame";
import { MmToken } from '../grammar/MmLexer';
import { LabeledStatement } from "./LabeledStatement";
export interface IEHypOrderForStepDerivation {
    /** the additional variables to be unified for the current EHyp*/
    additionalVariablesToBeUnified: Set<string>;
    /** the index of the EHyp in the assertion */
    eHypIndex: number;
}
export declare abstract class AssertionStatement extends LabeledStatement {
    frame: Frame | undefined;
    /** this is used to dinamically build the eHyp order for step derivation */
    private eHypToNotYetUnifiedLogicalVarsMap;
    /** the suggested order to try step derivation */
    private _eHypsOrderForStepDerivation;
    private emptySetOfStrings;
    private _eHypsWithAdditionalVariablesToBeUnifiedForStepDerivation;
    setEHypsWithAdditionalVariablesToBeUnifiedForStepDerivation(): void;
    /** the number of EHyps that require additional variables to be unified for step
     * derivation; these EHyps require cycling through all previous proof steps, and then
     * exponential complexity
     */
    get eHypsWithAdditionalVariablesToBeUnifiedForStepDerivation(): number | undefined;
    private initializeSingleEHypToNotYetUnifiedLogicalVarsMap;
    /** initializes this.eHypToNotYetUnifiedLogicalVarsMap with all the logical variables
     * in each EHyp, minus the logical variables in the assertion
     */
    private initializeEHypToNotYetUnifiedLogicalVarsMap;
    private initializeLogicalVarsInEachFormula;
    getIndexesWithNoVarsToBeUnified(indexesNotAddedYet: number[]): number[];
    /** sorts descending */
    sortIndexesWithNoVarsToBeUnifiedByFormulaLenghtDescending(indexesNotAddedYet: number[]): void;
    removeAdditionalVarsUnified(additionalVariablesJustUnified: Set<string>, indexesNotAddedYet: number[]): void;
    setEHypOrder(eHypIndex: number, additionalVariablesToBeUnified: Set<string>, indexesNotAddedYet: number[]): void;
    private setEHypsOrderForIndexesWithNoVarsToBeUnified;
    /** eHyps with the largest number of additional variables to be unfied, are
     * tried first; when two EHyps have the same number of additional variables to be unified,
     * the longest is tried, first
     */
    sortIndexesNotAddedYetByAdditionalVarsAndLength(indexesNotAddedYet: number[]): void;
    getAdditionalVariablesToBeUnified(eHypIndex: number): Set<string>;
    private pickOneEHypWithMaximalNumberOfAdditionalVarsToBeUnified;
    setEHypOrderForStepDerivation(indexesNotAddedYet: number[]): void;
    setEHypsOrderForStepDerivation(): void;
    /** the suggested order to try step derivation; the goal is to
     * have fast failure if no derivation is possible. From heuristics,
     * we first try the longest ones. Furthermore, EHyps with all logical vars
     * substituted are tried first, because they can be addressed using maps (from
     * formulas to MmpProofStep's; assuming the MmpProofStep to be derived
     * has no working vars)
     */
    get eHypsOrderForStepDerivation(): IEHypOrderForStepDerivation[] | undefined;
    constructor(labelToken: MmToken, content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
    mandatoryVars(outermostrBlock: BlockStatement): Set<string>;
}
