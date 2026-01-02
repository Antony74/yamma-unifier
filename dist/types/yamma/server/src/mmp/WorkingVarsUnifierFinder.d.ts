import { InternalNode } from '../grammar/ParseNode';
/**
 * the input of the MGU algorithm is a vector of these pairs
 */
export type OrderedPairOfNodes = {
    parseNode1: InternalNode;
    parseNode2: InternalNode;
};
export declare enum UnificationAlgorithmState {
    running = "running",
    clashFailure = "clashFailure",
    occourCheckFailure = "occourCheckFailure",
    complete = "complete"
}
/**
 * Implements the Martelli Montanari algorithm, to find
 * the Most General Unifier (if it exists) for the Working Vars in a UProof;
 *
 * Here is a list of the 6 rules, referred in the code:
 * 1. f(s1,...,sn) ~ f(t1,...,tn)                   action: replace by s1=t1,...,sn=tn
 * 2. f(s1,...,sn) ~ g(t1,...,tm)  where f != g     action: halt with "clash" failure (this case will never happen,
 *                                                          because we get here, only when we've found a valid substitution)
 * 3. x ~ x                                         action: delete the pair
 * 4. t ~ x   where t is not a variable             action: replace by x ~ t
 * 5. x ~ t   where x does not occour in t and      action: peform substitution { x / t } on all other pairs
 *                  x occours in some other pair
 * 6. x ~ t   where x is occurs in t and x != t     action: halt with "occur check" failure
 */
export declare class WorkingVarsUnifierFinder {
    currentState: UnificationAlgorithmState | undefined;
    /**
     * when the unification is succesfully completed, this substitutionResult will contain
     * a Most General Unifier for Working Vars
     */
    mostGeneralUnifierResult: Map<string, InternalNode>;
    /**if the MGU algorith ends in error, this will contain the pair of nodes that gave the occur check error;
     * the first node is a node for a working var
     */
    occourCheckOrderedPair: OrderedPairOfNodes | undefined;
    /** if the MGU algorith ends in clash failure error, this will contain the pair of nodes that gave the clash failure error;
    * the first node is a node for a working var
    */
    clashFailureOrderedPair: OrderedPairOfNodes | undefined;
    private currentOrderedPairsOfNodes;
    private workingVarsForWhichRule5hasAlreadyBeenApplied;
    constructor(startingOrderedPairsOfNodes: OrderedPairOfNodes[]);
    private isInternalNodeForVariable;
    buildOrderedPairsForChildren(node1: InternalNode, node2: InternalNode): OrderedPairOfNodes[];
    protected applyRule1(i: number, node1: InternalNode, node2: InternalNode): void;
    protected replaceNodeInDescendants(workingVarToBeReplaced: string, replacingNode: InternalNode, nodeToBeReplaced: InternalNode): void;
    applyRule5(i: number, node1: InternalNode, node2: InternalNode): void;
    tryToPerformAnActionForCurrentPair(i: number): boolean;
    runUnificationCycles(): void;
    /**
     *
     * @returns the most general unifier for the UProof
     */
    findMostGeneralUnifier(): Map<string, InternalNode> | undefined;
    static buildErrorMessageForOccourCheckOrderedPair(occourCheckOrderedPair: OrderedPairOfNodes): string;
}
