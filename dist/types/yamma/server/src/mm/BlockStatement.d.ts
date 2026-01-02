import { Grammar } from 'nearley';
import { DisjointVarMap } from './DisjointVarMap';
import { MmToken } from '../grammar/MmLexer';
import { MmParser } from './MmParser';
import { Statement } from "./Statements";
import { LabeledStatement } from "./LabeledStatement";
import { EHyp } from './EHyp';
import { FHyp } from './FHyp';
export declare class BlockStatement extends Statement {
    c: Set<string>;
    v: Set<string>;
    disjVars: DisjointVarMap;
    fHyps: FHyp[];
    eHyps: EHyp[];
    labelToStatementMap: Map<string, LabeledStatement>;
    /**maps a variable to the FHyp assigning a typecode to the var*/
    varToFHypMap: Map<string, FHyp>;
    varToKindMap: Map<string, string>;
    varKinds: Set<string>;
    /** at the end of the .mm parsing, this property will be assigned with the generated grammar */
    grammar: Grammar | undefined;
    /** at the end of the .mm parsing, this property will be assigned with the MmParser that did the parsing */
    mmParser: MmParser | undefined;
    private _nextLabeledStatementNumber;
    get nextLabeledStatementNumber(): number;
    constructor(parentBlock?: BlockStatement, mmParser?: MmParser, comment?: MmToken[]);
    isConstantAlreadyDefinedInScope(constant: string): boolean;
    isVariableAlreadyDefinedInScope(variable: string): boolean;
    add_v(variable: string): void;
    add_d(statementContent: MmToken[]): void;
    add_c(constant: string): void;
    addFHyp(fHyp: FHyp): void;
    lookup_d(x: string, y: string): boolean;
    lookup_v(variable: string): boolean;
    private addVar;
    get_mand_vars(statement: string[], eHyps: EHyp[]): string[];
    addDisjointVarsForSingleBlock(disjVars: DisjointVarMap): DisjointVarMap;
    getDisjointVars(): DisjointVarMap;
    mandatoryEHyps(): EHyp[];
    mandatoryFHyps(mandatoryVariables: string[]): FHyp[];
    mandatoryFHypsRecursive(mandatoryVariables: string[]): FHyp[];
    /** this version is faster then mandatoryFHyps, but the code is more complex, and
     * the gain doesn't seem to be worthwile, thus we keep using mandatoryFHyps, for the
     * time being
     */
    mandatoryFHypsFasterVersion(mandatoryVariables: string[]): FHyp[];
    /**
     * returns an $f or an $e statement that was defined in the current
     * scope (but not in the outermost scope: those are handeled by
     * the parser, for better performance)
     * @param label
     */
    getLabeledStatement(label: string): LabeledStatement | undefined;
    /**
     * returns true if the given kind is "active" in the current block (or in its parent blocks)
     * @param kind
     */
    hasKind(kind: string): boolean;
    /**
     * Returns the kind of the given variable.
     * @param variable
     */
    kindOf(variable: string): string | undefined;
    /**
     * given a set of vars, it returns an array of those vars, in RPN order
     * @param vars
     */
    getVariablesInRPNorder(vars: Set<string>): string[];
}
