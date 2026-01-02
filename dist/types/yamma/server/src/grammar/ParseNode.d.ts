import { Grammar } from 'nearley';
import { BlockStatement } from '../mm/BlockStatement';
import { MmToken } from './MmLexer';
import { UProofStatementStep } from '../mmp/MmpStatement';
export declare class InternalNode {
    private _cachedStringFormula?;
    private _cachedStringRepresentation?;
    label: string;
    kind: string;
    parseNodes: ParseNode[];
    constructor(label: string, kind: string, parseNodes: ParseNode[]);
    /** true iff this node represents an $f statement */
    isNodeForFStatement(logicalVars: Set<string>): boolean;
    /**
     * if this InternalNode is the parsing node of an $f statement, it
     * returns the label of the the $f statement; undefined otherwise
     */
    labelForFStatement(logicalVars: Set<string>): string | undefined;
    get stringFormula(): string;
    get cachedStringFormula(): string;
    private childrenRepresentation;
    get rpnRepresentation(): string;
    get cachedRpnRepresentation(): string;
    /**
     * returns the set (populated in RPN order) of the labels of the mandatory
     * $f statements for the current parse node
     */
    fStatementLabels(logicalVars: Set<string>): Set<string>;
    /**
     * true iff any of the nodes in the subtree is a MmToken that has the given value
     * @param value
     */
    containsTokenValue(value: string): boolean;
    /**
     * Returns the set of alla tokens with value in the given symbols set
     * @param logicalVariables
     */
    mmTokensContaining(symbols: Set<string>): Set<MmToken>;
    /**
     * Returns the set of alla tokens values within the given symbols' set
     * @param symbols
     */
    symbolsSubsetOf(symbols: Set<string>): Set<string>;
    /** the logical variables contained in this parse node */
    logicalVariables(outermostBlockStatement: BlockStatement): Set<string>;
    buildSubstitutionForLogicalParseNode(logicalSystemParseNode: InternalNode, statementMandatoryVars: Set<string>, substitution: Map<string, InternalNode>): void;
    buildSubstitution(outermostBlock: BlockStatement, grammar: Grammar): Map<string, InternalNode>;
    reorderSubstitution(substitution: Map<string, InternalNode>, outermostBlock: BlockStatement): Map<string, InternalNode>;
    /**
     * returns a substitution for a logical syntax assertion. It is meant to be invoked only when
     * a normal proof is computed, thus it is assumed to be a valid parse node,
     * for the assertion, and then no check is done for failed unification.
     * Notice the difference from
     * the methods provided by USubstitutionBuilder: that class performes a substitution for a full
     * UProofStep (with its EHyps), whereas this method builds a substitution for a syntax axiom
     */
    buildSubstitutionInRpnOrder(outermostBlock: BlockStatement, grammar: Grammar): Map<string, InternalNode>;
    proofArrayWithSubstitution(outermostBlock: BlockStatement, grammar: Grammar, substitutionInRpnOrder: Map<string, InternalNode>): UProofStatementStep[];
    /**
     * returns the syntactic proof corresponding to the internal node
     */
    proofArray(outermostBlock: BlockStatement, grammar: Grammar): UProofStatementStep[];
}
export type ParseNode = InternalNode | MmToken;
