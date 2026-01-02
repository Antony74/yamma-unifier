import { MmToken } from '../grammar/MmLexer';
import { IMmpStatementWithRange } from './MmpStatement';
import { Range } from 'vscode-languageserver';
/** represents a Disjoint Var constraint statement in the current proof */
export declare class MmpDisjVarStatement implements IMmpStatementWithRange {
    private _toText;
    /** tokens of the disjoint vars */
    disjointVars: MmToken[];
    constructor(disjointVars: MmToken[]);
    get range(): Range;
    /** creates a MmpDisjVarStatement with dummy ranges */
    static CreateMmpDisjVarStatement(var1: string, var2: string): MmpDisjVarStatement;
    toText(): string;
    /** returns the text for a $d statement for two vars*/
    static textForTwoVars(var1: string, var2: string): string;
    private static buildEdgeCliqueCoverSet;
    private static getStrDisjVarMmpStatementContent;
    private static getDisjVarMmpStatementContentFromStrings;
    private static getDisjVarMmpStatementContent;
    private static produceDisjVarMmpStatement;
    private static produceUnsortedDisjVarMmpStatements;
    private static compare;
    private static produceDisjVarMmpStatements;
    private static buildEdgeCliqueCoverFromNumbers;
    /**
     * receives an array of disjoint var statements and builds a heuristic edge clique cover
     * of the represented undirected graph (for a compact representation of the graph)
     * @param mmpDisjVarStatements array of MmpDisjVarStatement representing the undirected graph
     * @returns
     */
    private static buildNumberToVarMap;
    private static buildVarToNumberMap;
    private static buildEdge;
    private static addEdgesForSingleMmpDisjVarStatement;
    private static buildUndirectedGraph;
    /**
     * Given an array of disj var statements produces a heuristic edge clique cover,
     * and then a compact representation of the (pair of) constraints
     * @param mmpDisjVarStatements an array of disj var statements
     * @returns
     */
    static buildEdgeCliqueCover(mmpDisjVarStatements: MmpDisjVarStatement[]): MmpDisjVarStatement[];
}
