import { Grammar } from 'nearley';
import { InternalNode } from '../grammar/ParseNode';
import { BlockStatement } from '../mm/BlockStatement';
import { AssertionStatement } from "../mm/AssertionStatement";
import { MmpProofStep } from '../mmp/MmpProofStep';
import { MmpSubstitutionBuilder } from '../mmp/MmpSubstitutionBuilder';
import { WorkingVars } from '../mmp/WorkingVars';
import { MmpParser } from '../mmp/MmpParser';
/** tries to derive a label for the given MmpProofStep */
export declare class StepDerivation {
    private mmpProofStepIndex;
    private mmpProofStep;
    private maxNumberOfHypothesisDispositionsForStepDerivation;
    private uProof;
    labelToNonSyntaxAssertionMap: Map<string, AssertionStatement>;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    workingVars: WorkingVars;
    constructor(mmpParser: MmpParser, mmpProofStepIndex: number, mmpProofStep: MmpProofStep, maxNumberOfHypothesisDispositionsForStepDerivation: number);
    private isDeriveToBeTried;
    computeNumberOfHypothesisDispositions(assertion: AssertionStatement): number;
    private isWorstCaseTooSlow;
    tryEHypsDerivation(assertion: AssertionStatement, uSubstitutionBuilder: MmpSubstitutionBuilder, substitution: Map<string, InternalNode>): void;
    private tryCurrentAssertionActually;
    tryCurrentAssertion(labeledStatement: AssertionStatement): void;
    /** tries all possibles theorems in the theory, to see if one unifies the
     * MmpProofStep, using as hypothesis the preceding steps.
     * If a valid, complete, unification is found, then this.mmpProofStep is completed with
     * the label and the hypSteps that unify; otherwise, this.mmpProofStep is left unchanged
      */
    deriveLabelAndHypothesis(): void;
}
