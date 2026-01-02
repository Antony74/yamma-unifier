import { Grammar, Rule } from 'nearley';
import { MmToken } from './MmLexer';
import { InternalNode, ParseNode } from './ParseNode';
import { AxiomStatement } from "../mm/AxiomStatement";
import { LabeledStatement } from "../mm/LabeledStatement";
import { AssertionStatement } from "../mm/AssertionStatement";
import { WorkingVars } from '../mmp/WorkingVars';
import { FHyp } from '../mm/FHyp';
type NearleyLiteral = {
    literal: string;
};
type NearleyType = {
    type: string;
};
type NearleyItem = NearleyLiteral | NearleyType | string;
export declare class MmpRule extends Rule {
    label: string;
    constructor(label: string, name: string, symbols: NearleyItem[]);
}
export declare abstract class GrammarManager {
    static areInternalParseNodeEqual(parseNode1: InternalNode, parseNode2: ParseNode): boolean;
    static areParseNodesEqual(parseNode1: ParseNode, parseNode2: ParseNode): boolean;
    static areCoherentInternalParseNode(parseNode1: InternalNode, parseNode2: ParseNode): boolean;
    /** two parse nodes are coherent if they are equal up to working vars */
    static areParseNodesCoherent(parseNode1: ParseNode, parseNode2: ParseNode): boolean;
    static CreateRule(label: string, kind: string, symbols: NearleyItem[]): MmpRule;
    static CreateLiteralForFHyp(statement: FHyp): Rule;
    static CreateRuleForSyntaxAxiom(statement: AxiomStatement): Rule;
    static isSyntaxAxiom(statement: LabeledStatement, syntacticKinds: Set<string>): boolean;
    static isSyntaxAxiom2(assertionStatement: AssertionStatement): boolean;
    static addRulesForStatements(labelToStatementMap: Map<string, LabeledStatement>, rules: Rule[]): void;
    static addRulesForWorkingVars(workingVars: WorkingVars, rules: Rule[]): void;
    static typeCodeForProvable: string;
    static CreateGrammar(labelToStatementMap: Map<string, LabeledStatement>, workingVars: WorkingVars): Grammar;
    static isInternalParseNodeForWorkingVar(parseNode: ParseNode): boolean;
    /** true iff parseNode is a ParseNode for a fHyp */
    static isInternalParseNodeForFHyp(parseNode: InternalNode, variables: Set<string>): boolean;
    static containsWorkingVar(uStepParseNode: InternalNode): boolean;
    /**
     * this method can be invoded only when parseNode is an InternalNode with
     * a single child, that is a MmToken
     * @param parseNode
     * @returns
     */
    static getTokenValueFromInternalNode(parseNode: InternalNode): string;
    /**
     * this method can be invoded only when parseNode is an InternalNode with
     * a single child, that is a MmToken
     * @param parseNode
     * @returns
     */
    static getTokenFromInternalNode(parseNode: InternalNode): MmToken;
    static createInternalNodeForWorkingVar(workingVar: string, kind: string, tokenType: string): InternalNode;
    /**
     * builds the array of symbols starting froma a ParseNode
     * @param parseNode the node for which the array of symbols is returned
     * @returns
     */
    static buildStringArray(parseNode: ParseNode): string[];
    /**
     * rebuilds the origina formula, from the parseNode
     * @param parseNode the node the represents the formula to be rebuilt
     * @returns
     */
    static buildStringFormula(parseNode: ParseNode): string;
    /**
     * rebuilds the original formula, from the parseNode, but substitutes
     * variables with the given substitution
     * @param parseNode the node the represents the formula to be rebuilt
     * @param substitution the substitution to be applied to variables
     */
    static buildStringFormulaWithSubstitution(parseNode: ParseNode, substitution: Map<string, string[]>): string;
}
export {};
