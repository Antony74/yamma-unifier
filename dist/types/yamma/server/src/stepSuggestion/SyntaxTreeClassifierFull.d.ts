import { ParseNode } from '../grammar/ParseNode';
import { MmParser } from '../mm/MmParser';
import { IFormulaClassifier } from './IFormulaClassifier';
/** given a formula and a MmParser, returns the syntax tree of the formula,
as a string representation in rpn format; this classifier works with any
theory, it is NOT set.mm specific.

For instance, given set.mm, '|- ( ph -> ps )'
with maxlevel = 0 it will return 'TOP'
with maxlevel = 1 it will return 'wi TOP'
with maxlevel = 2 it will return 'wff wff wi TOP'
with maxlevel = 3 it will still return 'wff wff wi TOP'

whereas given '|- E. x e. A ph'
with maxlevel = 2 it will return setvar class wff wrex TOP'

whereas given '|- E. x e. A B = B'
with maxlevel = 1 it will return 'wrex TOP'
with maxlevel = 2 it will return 'setvar class wceq wrex TOP'
*/
export declare class SyntaxTreeClassifierFull implements IFormulaClassifier {
    maxLevel: number;
    id: string;
    /**
     *
     * @param maxLevel the zero-based max level of the syntax tree produced;
     * 0 is for root (for instance, in set.mm it will always be 'TOP')
     */
    constructor(maxLevel: number);
    /** builds a rpn string representing the syntax tree of the given formula */
    private buildRpnSyntaxTreeFromParseNode;
    classify(parseNode: ParseNode, mmParser: MmParser): string;
}
