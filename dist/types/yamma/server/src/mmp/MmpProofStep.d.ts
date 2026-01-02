import { Position } from 'vscode-languageserver';
import { Range } from 'vscode-languageserver-textdocument';
import { MmToken } from '../grammar/MmLexer';
import { InternalNode } from '../grammar/ParseNode';
import { MmpProof } from './MmpProof';
import { IMmpStatementWithRange, UProofStatementStep } from './MmpStatement';
import { ProofStepFirstTokenInfo } from './MmpStatements';
import { BlockStatement } from '../mm/BlockStatement';
import { ILabeledStatementSignature } from '../mmt/MmtParser';
import { AssertionStatement } from "../mm/AssertionStatement";
export declare class MmpProofStep implements IMmpStatementWithRange, ILabeledStatementSignature {
    mmpProof: MmpProof;
    isFirstTokenParsable: boolean;
    isEHyp: boolean;
    stepRef: string;
    eHypUSteps: (MmpProofStep | undefined)[];
    eHypRefs?: MmToken[];
    stepLabelToken?: MmToken;
    stepLabel?: string;
    stepFormula?: MmToken[];
    parseNode?: InternalNode;
    /** true iff this step eHyps contain a ref to a nonexistent proof step */
    containsUnknownStepRef: boolean;
    /** the indentation level for a tree like display of the proof */
    indentationLevel: number | undefined;
    /** this is optional just to allow MmpProofStep not to assign a UProof; but th UProof object will always
     * assign itself in the constructor: thus, the unification / trasformation process can consider this to be
     * an actual UProof
     */
    /**
     * when defined, it contains a map from the mandatory variables of the logical assertion, to the actual
     * parse nodes in the proof
    */
    substitution: Map<string, InternalNode> | undefined;
    /**
     * false by default, it will be assigned true only if the UProofStep is completely proven.
     * isProven will be set to true even if working vars are still present in the proof
    */
    private _isProven;
    get isProven(): boolean;
    private _normalizedFormula?;
    get normalizedFormula(): string | undefined;
    get isQed(): boolean;
    /** call this method if this UProofStep is completeley proven */
    setIsProven(): void;
    private _assertion;
    get assertion(): AssertionStatement | undefined;
    private _hasWorkingVars?;
    setHasWorkingVarsRecursive(parseNode: InternalNode): void;
    private setHasWorkingVars;
    get hasWorkingVars(): boolean;
    firstTokenInfo: ProofStepFirstTokenInfo;
    stepRefToken: MmToken;
    constructor(uProof: MmpProof, firstTokenInfo: ProofStepFirstTokenInfo, isFirstTokenParsable: boolean, isEHyp: boolean, stepRefToken: MmToken, eHypRefs?: MmToken[], eHypMmpSteps?: (MmpProofStep | undefined)[], stepLabelToken?: MmToken, stepFormula?: MmToken[], formulaParseNode?: InternalNode);
    get label(): MmToken | undefined;
    get formula(): MmToken[] | undefined;
    get startPosition(): Position;
    get endPosition(): Position;
    /**
     * returns the range of the whole proof step
     */
    get range(): Range;
    get eHypRefsRange(): Range | undefined;
    get firstTokenInfoToString(): string;
    /** if the current EHyp is undefined, but there was a ref, we leave the original ref unchanged */
    textForEHypRef(eHypIndex: number): string;
    textForEHypRefs(): string;
    textForFirstTokenInfo(): string;
    get textForFormula(): string | undefined;
    /**
     * Returns the full text of the UProofStep
     * @returns
     */
    toText(): string;
    getMandatoryVarsInRPNorder(outermostBlock: BlockStatement): string[];
    proofArrayForFStatements(outermostBlock: BlockStatement): UProofStatementStep[];
    /**
     * returns a proof for the current step (undefined if there is no proof, yet).
     * It assumes that every UProofStep has already been checked for unification
     * and this.isProven has been assigned and this.substitution has been assigned.
     * @proofArrayForFStatements is used to compute the RPN order of the mandatory F Hyps
     *
     */
    proofArray(outermostBlock: BlockStatement): UProofStatementStep[] | undefined;
}
