import { ParseNode } from '../grammar/ParseNode';
import { MmParser } from '../mm/MmParser';
import { IFormulaClassifier } from './IFormulaClassifier';
/** given a formula and a MmParser, returns the syntax tree of the formula,
as a string representation in rpn format; it returns a "meaningful"
classification only if the given formula is in the form ( ph -> ps ) ; if
it's the case, than this classifier looks the ps formula only.
This classifier is set.mm specific (or, at least, assumes implications are
part of the teory).
For instance, '|- ( B e. V -> dom { <. A , B >. } = { A } )' with maxLevel 2
will be classified with 'csn cdm class csn wceq'; with maxLevel 3 will
be classified with 'cop csn cdm class csn wceq'
*/
export declare class SyntaxTreeClassifierImp implements IFormulaClassifier {
    maxLevel: number;
    id: string;
    /**
     *
     * @param maxLevel the zero-based max level of the syntax tree produced
     */
    constructor(maxLevel: number);
    /** builds a rpn string representing the syntax tree of the given formula */
    private buildRpnSyntaxTreeFromParseNode;
    isImplication(parseNode: ParseNode): boolean;
    classify(parseNode: ParseNode, mmParser: MmParser): string | undefined;
}
