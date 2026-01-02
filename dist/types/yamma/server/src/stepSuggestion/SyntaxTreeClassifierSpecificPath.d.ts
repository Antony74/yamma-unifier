import { InternalNode } from '../grammar/ParseNode';
import { MmParser } from '../mm/MmParser';
import { IFormulaClassifier } from './IFormulaClassifier';
/** given a formula and a MmParser, returns the syntax tree of the formula,
as a string representation in rpn format; this classifier works with any
theory, it is NOT set.mm specific.


For instance, given set.mm, '|- ( ph -> ps )'
with path = [] it will return 'TOP'
with path = [1] it will return 'wi TOP'
with path = [1,3] it will return 'wff wi TOP'
with path = [1,3,1] it will return ''
with path = [1,1, 1, 0] it will still return ''

given '|- ( ph -> &W1 )'
with path = [1,3] it will return 'wff wi TOP'
with path = [1,3,1] it will return ''

given '|- E. x e. A ph'
with path = [] it will return 'TOP'
with path = [1] it will return 'wrex TOP'
with path = [1,4] it will return 'wff wrex TOP'

given '|- E. x e. A B = B'
with path = [1,4] it will return 'wceq wrex TOP'
*/
export declare class SyntaxTreeClassifierSpecificPath implements IFormulaClassifier {
    private path;
    id: string;
    /**
     *
     * @param path a sequence of indexes of child nodes to be followed
     */
    constructor(path: number[]);
    /** builds a rpn string representing the syntax tree of the given formula */
    private buildRpnSyntaxTreeFromParseNode;
    classify(parseNode: InternalNode, mmParser: MmParser): string;
}
