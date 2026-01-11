import { Grammar } from 'nearley';
import { TextEdit } from 'vscode-languageserver';
import { BlockStatement } from '../mm/BlockStatement';
import { MmpParser } from './MmpParser';
import { MmpProof } from './MmpProof';
import { WorkingVars } from './WorkingVars';
import { ProofMode } from '../mm/ConfigurationManager';
import { IMmpCompressedProofCreator } from './proofCompression/MmpCompressedProofCreator';
import { GlobalState } from '../general/GlobalState';
export interface MmpUnifierArgs {
    mmpParser: MmpParser;
    proofMode: ProofMode;
    maxNumberOfHypothesisDispositionsForStepDerivation: number;
    renumber: boolean;
    removeUnusedStatements: boolean;
    expectedTheoremLabel?: string;
    leftMarginForCompressedProof?: number;
    characterPerLine?: number;
    mmpCompressedProofCreator?: IMmpCompressedProofCreator;
    globalState?: GlobalState;
}
export declare class MmpUnifier {
    mmpParser: MmpParser;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    workingVars: WorkingVars;
    proofMode: ProofMode;
    private maxNumberOfHypothesisDispositionsForStepDerivation;
    private renumber;
    private removeUnusedStatements;
    private expectedTheoremLabel?;
    private leftMarginForCompressedProof?;
    private characterPerLine?;
    /** the final proof produced with by the unify() method */
    uProof: MmpProof | undefined;
    protected textLastLine: number;
    textEditArray: TextEdit[];
    /** true iff the last unify() threw an exceptio*/
    thrownError: boolean;
    private _charactersPerLine;
    private _mmpCompressedProofCreator;
    private globalState?;
    private isProofCompleteAndItContainsWorkingVarsAndThereAreNoUnusedTheoryVars;
    constructor(args: MmpUnifierArgs);
    buildTextEditArray(newUProof: MmpProof): TextEdit[];
    private isDiscouragedNotAProblem;
    private isProofToBeGenerated;
    private replaceRemainingWorkingVarsWithTheoryVars;
    buildProofStatement(uProof: MmpProof): void;
    private ifProofCompleteReplaceRemainingWoringVarsAndBuildProofStatement;
    /**
     * Unifies textToParse and builds a UProof and a single TextEdit to replace the whole
     * current document
     * @param textToParse
     */
    unify(): void;
}
