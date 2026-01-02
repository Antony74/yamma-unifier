import { Grammar } from 'nearley';
import { BlockStatement } from '../mm/BlockStatement';
import { LabeledStatement } from "../mm/LabeledStatement";
import { AssertionStatement } from "../mm/AssertionStatement";
import { MmpProofStep } from '../mmp/MmpProofStep';
import { MmpProof } from '../mmp/MmpProof';
import { WorkingVars } from '../mmp/WorkingVars';
import { MmpSubstitutionBuilder } from '../mmp/MmpSubstitutionBuilder';
import { InternalNode } from '../grammar/ParseNode';
import { EHyp } from '../mm/EHyp';
export interface IEHypsDerivationResult {
    isSuccessful: boolean | undefined;
    eHypsMmpProofSteps: (MmpProofStep | undefined)[];
}
export declare class EHypsDerivation {
    uProof: MmpProof;
    mmpProofStepIndex: number;
    mmpProofStep: MmpProofStep;
    assertion: AssertionStatement;
    labelToStatementMap: Map<string, LabeledStatement>;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    workingVars: WorkingVars;
    maxNumberOfHypothesisDispositionsForStepDerivation: number;
    uSubstitutionBuilder: MmpSubstitutionBuilder;
    substitution: Map<string, InternalNode>;
    eHypsDerivationResult: IEHypsDerivationResult;
    constructor(uProof: MmpProof, mmpProofStepIndex: number, mmpProofStep: MmpProofStep, assertion: AssertionStatement, labelToStatementMap: Map<string, LabeledStatement>, outermostBlock: BlockStatement, grammar: Grammar, workingVars: WorkingVars, maxNumberOfHypothesisDispositionsForStepDerivation: number, uSubstitutionBuilder: MmpSubstitutionBuilder, substitution: Map<string, InternalNode>);
    private initializeEHypsDerivationResult;
    private isEHypUnifiableWithCurrentProofStep;
    removeSubstitutionForCurrentEHypIndex(currentEHypIndexForStepDerivation: number): void;
    tryEHypProofStepCandidate(currentEHypIndexForStepDerivation: number, currentEHypRealIndex: number, currentEHyp: EHyp, eHypProofStepCandidate: MmpProofStep): void;
    /** this method is invoked when the current EHyp requires additional logical
     * vars to be unified; in this case, the formula for the EHyp is not completely
     * determined, thus we need to cycle through all previous MmpProofStep's to
     * see if one unifies (using the additional logical variables)
     */
    private searchCurrentEHypWithAdditionalVarsToBeUnified;
    buildFormulaForCurrentEHypProofStep(currentEHyp: EHyp): string;
    /** invoked when the current EHypStep does not require additional logical
     * variables to be unified; the expected formula is completely determined, thus
     * a single trial in a look up table is enough
    */
    private searchCurrentEHypWithoutAdditionalVarsToBeUnified;
    searchEHypsRecursive(currentEHypIndexForStepDerivation: number): void;
    /** tries all permutations of previous mmp proof steps, to see if one can be unified with the given
     * assertion
     */
    searchEHyps(): IEHypsDerivationResult;
}
