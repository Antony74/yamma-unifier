import { ParseNode } from '../grammar/ParseNode';
import { MmParser } from '../mm/MmParser';
import { IFormulaClassifier } from './IFormulaClassifier';
/** given a formula and a MmParser, returns the syntax tree of the formula,
* as a string representation in rpn format
*/
export declare class RpnSyntaxTreeBuilder implements IFormulaClassifier {
    id: string;
    constructor();
    /** builds a rpn string representing the syntax tree of the given formula */
    buildRpnSyntaxTreeFromParseNode(parseNode: ParseNode, mmParser: MmParser, currentLevel: number, maxLevel: number): string;
    classify(parseNode: ParseNode, mmParser: MmParser): string;
}
