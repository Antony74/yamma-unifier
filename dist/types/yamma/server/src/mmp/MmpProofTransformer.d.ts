import { Grammar } from 'nearley';
import { Diagnostic, TextEdit } from 'vscode-languageserver';
import { BlockStatement } from '../mm/BlockStatement';
import { InternalNode } from '../grammar/ParseNode';
import { AssertionStatement } from "../mm/AssertionStatement";
import { MmpProof } from './MmpProof';
import { WorkingVars } from './WorkingVars';
import { OrderedPairOfNodes } from './WorkingVarsUnifierFinder';
import { MmpProofStep } from "./MmpProofStep";
import { MmpParser } from './MmpParser';
import { MmpGetProofStatement } from './MmpGetProofStatement';
export interface MmpProofTransformerArgs {
    mmpParser: MmpParser;
    maxNumberOfHypothesisDispositionsForStepDerivation: number;
    renumber: boolean;
    removeUnusedStatements: boolean;
    expectedTheoremLabel?: string;
}
export declare class MmpProofTransformer {
    private mmpProofTransformerArgs;
    mmpParser: MmpParser;
    uProof: MmpProof;
    labelToNonSyntaxAssertionMap: Map<string, AssertionStatement>;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    workingVars: WorkingVars;
    private renumber;
    private removeUnusedStatements;
    private expectedTheoremLabel?;
    private maxNumberOfHypothesisDispositionsForStepDerivation;
    diagnostics: Diagnostic[];
    textEditArray: TextEdit[];
    private _orderedPairsOfNodesForMGUalgorithm;
    private containsGetProof;
    get orderedPairOfNodes(): OrderedPairOfNodes[];
    constructor(mmpProofTransformerArgs: MmpProofTransformerArgs);
    private addMissingStatements;
    private areEHypLabelsToBeTransformed;
    /**
     * builds startingPairsForMGUFinder, that will be used to find the most general unifier
     * for the working vars; when we get here, uProofStep has already been completed and substitution is complete
     * @param substitution
     */
    addStartingPairsForMGUFinder(uProofStep: MmpProofStep, assertion: AssertionStatement, substitution: Map<string, InternalNode>): void;
    foundDisjVarConstraintViolation(uProofStep: MmpProofStep): boolean;
    missingDisjVarConstraints(uProofStep: MmpProofStep): boolean;
    setIsProvenIfTheCase(uProofStep: MmpProofStep, numberOfLogicalEHyps: number): void;
    transformEHyp(currentMmpStatement: MmpProofStep, currentIndexInEHypLabel: number): number;
    tryToDeriveEHypsOnly(uStepIndex: number, mmpProofStep: MmpProofStep): void;
    deriveLabelAndHypotesisWithoutWorkingVars(uStepIndex: number, mmpProofStep: MmpProofStep): void;
    private deriveLabelAndHypotesis;
    /** eHyps derivation should be tried BEFORE a unification attempt,
     * if the current step is parsable, and the ehyps are not complete */
    private isEHypsCompletionToBeTriedBeforUnification;
    private tryEHypsDerivation;
    private tryToDeriveEhypsIfIncomplete;
    tranformProofStepWithValidAssertionLabel(uStepIndex: number, uProofStep: MmpProofStep, assertion: AssertionStatement): number;
    /**
     * adds one step to the new proof and returns the index of the next step to be transformed
     * (this is needed because new proof steps could have been added)
     * @param uStepIndex
     * @param newProof
     */
    protected transformUStep(uStepIndex: number): number;
    buildProof(mmpGetProofStatement: MmpGetProofStatement): MmpProof | undefined;
    getProof(i: number, mmpGetProofStatement: MmpGetProofStatement): number;
    protected transformUSteps(): void;
    protected unifyWorkingVars(): void;
    removeStepDuplicates(): void;
    renumberIfRequired(): void;
    reorganizeDisjointVarConstraintsStatements(): void;
    private removeUnusedStatementsIfRequired;
    transformUProof(): void;
}
