import { DisjointVarMap } from '../mm/DisjointVarMap';
import { MmToken } from '../grammar/MmLexer';
import { Range } from 'vscode-languageserver';
import { MmpDisjVarStatement } from "../mmp/MmpDisjVarStatement";
export interface ILabeledStatementSignature {
    label: MmToken | undefined;
    formula: MmToken[] | undefined;
    rangeIfBothLabelAndFormulaAreEmpty?: Range;
}
/** this interface is used by the TheoremCoherenceChecker to check if the current theorem
 * is coherent w.r.t. the same theory already in the current theory. At the time of writing, it is used
 * both from the MmtSaver (reads a .mmt file and produces a ITheoremSignature that is then checked against the
 * same theorem in the theory) and the MmpParser (to produce Diagnositcs if the current .mmp is not coherent with the
 * same theorem in the theory)
*/
export interface ITheoremSignature {
    disjVarMmpStatements: MmpDisjVarStatement[];
    disjVars: DisjointVarMap;
    eHyps: ILabeledStatementSignature[];
    pStatement: ILabeledStatementSignature | undefined;
}
/** parses a .mmt file, for the sole purpose of checking if a theorem with
 * the same label already exists in the theory (and then see if it is coherent).
 * Thus, the comment is read, but not returned
 */
export declare class MmtParser {
    /** parse result */
    theorem: ITheoremSignature | undefined;
    /** true iff the .mmt content was not parsable */
    parseFailed: boolean;
    private _text;
    private _previousCharMayBeLabel;
    private mmLexer;
    private _disjVarUStatementTokens;
    private _disjVars;
    private _eHyps;
    private _pStatement;
    constructor(text: string);
    readStatement(lastChar: string): MmToken[];
    addDisjVarConstraint(): void;
    private addEStatement;
    addPStatement(): void;
    readComment(): string[];
    addStatement(): void;
    parse(): void;
}
