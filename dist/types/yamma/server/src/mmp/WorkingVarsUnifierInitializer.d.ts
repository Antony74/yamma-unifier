import { Grammar } from 'nearley';
import { BlockStatement } from '../mm/BlockStatement';
import { InternalNode, ParseNode } from '../grammar/ParseNode';
import { AssertionStatement } from "../mm/AssertionStatement";
import { OrderedPairOfNodes } from './WorkingVarsUnifierFinder';
import { MmpProofStep } from "./MmpProofStep";
/**
 * this class helps to initialize the Working Vars MGU Finder.
 * It takes a UProofStep, an assertion and a valid substitution for the logical vars to uProofStep's parse nodes
 * and returns a set of ordered pairs of nodes to be later unified by the MGU Finder
 */
export declare class WorkingVarsUnifierInitializer {
    uProofStep: MmpProofStep;
    assertion: AssertionStatement;
    substitution: Map<string, InternalNode>;
    outermostBlock: BlockStatement;
    grammar: Grammar;
    startingPairsForMGUFinder: OrderedPairOfNodes[];
    constructor(uProofStep: MmpProofStep, assertion: AssertionStatement, substitution: Map<string, InternalNode>, outermostBlock: BlockStatement, grammar: Grammar);
    addStartingPairsForMGUFinderForParseNodeWithLogicalNodeSubstituted(uStepParseNode: ParseNode, newNodeWithSubstitution: ParseNode): void;
    addStartingPairsForMGUAlgorithmForParseNode(uStepParseNode: InternalNode, logicalSystemFormulaParseNode: InternalNode): void;
    addStartingPairsForMGUAlgorithmForEHyps(): void;
    /** builds the starting pairs for the MGU algorithm, for the MmpProofStep given to the constructor  */
    buildStartingPairsForMGUAlgorithm(): OrderedPairOfNodes[];
}
