import { BlockStatement } from '../mm/BlockStatement';
import { DisjointVarMap } from '../mm/DisjointVarMap';
import { MmToken } from '../grammar/MmLexer';
import { MmpProofStep } from "./MmpProofStep";
import { MmpDisjVarStatement } from "./MmpDisjVarStatement";
import { IMmpStatement, TextForProofStatement } from './MmpStatement';
import { MmpTheoremLabel } from "./MmpTheoremLabel";
import { WorkingVars } from './WorkingVars';
import { ITheoremSignature } from '../mmt/MmtParser';
import { MmpComment } from './MmpComment';
export declare class MmpProof implements ITheoremSignature {
    private startIndexForNewRefs?;
    outermostBlock: BlockStatement;
    workingVars: WorkingVars;
    maxRefAlreadyAssigned: number;
    mmpStatements: IMmpStatement[];
    mmpTheoremLabels: MmpTheoremLabel[];
    allowDiscouragedStatement: boolean;
    private _mandatoryHypLabels?;
    private _mandatoryVars?;
    /** the theorem label is expected to be the first statement */
    get theoremLabel(): MmToken | undefined;
    mainComment?: MmpComment;
    /** If dummy constraints (denoted by $d) are present, this comment precedes them. */
    commentForDummyConstraints?: MmpComment;
    /**
     * The main comment is expected to be the second statement, just after
     * the theorem label statement
     */
    /** if the qed step is proven, proofStatement will contain the proof statement */
    proofStatement: IMmpStatement | undefined;
    /** true iff the proof is complete (a proof statement has been generated) */
    get isProofComplete(): boolean;
    /**the last MmpProofStep in the array of uStatements*/
    lastMmpProofStep: MmpProofStep | undefined;
    /** the (compressed or normal) proof text */
    textProofStatement?: TextForProofStatement;
    /**contains an efficient (for search) representation of the Disjoint Vars Statement defined. It's introduced for performance only */
    disjVars: DisjointVarMap;
    eHyps: MmpProofStep[];
    /** the array of defined disjoint var constraints */
    disjVarMmpStatements: MmpDisjVarStatement[];
    get pStatement(): MmpProofStep | undefined;
    /** maps a (normalized) formula to the index of its MmpProofStep
     * (its first occourence)
    */
    formulaToProofStepMap: Map<string, number>;
    /** the number of steps added by the unification; this is added to
     * this.formulaToProofStepMap to find the real step index
     */
    private statementsInsertedAtASpecificIndexSoFar;
    constructor(outermostBlock: BlockStatement, workingVars: WorkingVars, startIndexForNewRefs?: number | undefined);
    private reset;
    /** the set of the mandatory vars for this UProof */
    private setMandatoryVars;
    get mandatoryVars(): Set<string>;
    updateMaxRefIfItsTheCase(stepRef: string): void;
    /**
     * returns the ref for the new MmpProofStep; if stepRef is not undefined, it is assigned as is; if it
     * is an automatically generated ref, this._maxNewRef is updated, it needed; if stepRef
     * is undefined, a new ref is generated
     * @param stepRef
     */
    getRef(stepRef: MmToken | undefined): string;
    updateWorkingVarsIfTheCase(stepFormula: MmToken[]): void;
    updateFormulaToProofStepMap(normalizedFormula: string): void;
    /** if the current proof step is an eHyp, it is added to the array of eHyps  */
    private updateEHyps;
    addMmpStep(mmpProofStep: MmpProofStep): void;
    updateAllWorkingVars(): void;
    incrementFormulaToProofStepMap(): void;
    insertStatementToTheHeader(mmpStatement: IMmpStatement, index: number): void;
    insertMmpProofStepAtIndex(uProofStep: MmpProofStep, index: number): void;
    addMmpStatement(mmpStatement: IMmpStatement): void;
    /** insert statements at the given index */
    insertMmpStatements(mmpStatements: IMmpStatement[], i: number): void;
    containsDjVarStatement(var1: string, var2: string): boolean;
    addDisjointVarStatement(statement: MmToken[]): void;
    /**
     * returns a new ref in the form 'dnn'
     * @returns
     */
    getNewRef(): string;
    /**
     * creates a new MmpProofStep, with a new ref, empty formula and empty parse node
     * and adds it to the proof, inserting it just before the proof step with position index
     * @param index the position of the UStatement, before which the new MmpProofStep has to be inserted
     * @returns
     */
    createEmptyUStepAndAddItBeforeIndex(index: number): MmpProofStep;
    toText(): string;
    /** returns the proof text, without indentation */
    toTextWithoutIndentation(): string;
    /**inserts a proofStatement just after the qed step */
    insertProofStatement(proofStatement: IMmpStatement): void;
    /**
     * returns the labels of the mandatory $f labels in RPN order. This method can be
     * invoked only when the proof is found (and then both the qed statement and the
     * $e hyps have valid parse nodes)
     */
    get mandatoryFHypsLabelsInRPNorder(): Set<string>;
    setMandatoryHypLabels(): void;
    get mandatoryHypLabels(): Set<string>;
    /** returns the actual index for the given formula; formulaToProofStepMap is
     * adjusted, considering proof steps that could have been added, so far
     */
    adjustedStepIndexForThisFormula(formula: string): number | undefined;
}
