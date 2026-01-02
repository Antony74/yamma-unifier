import { ParseNode } from '../grammar/ParseNode';
import { MmParser } from '../mm/MmParser';
/** classes that implement this interface, create clusters of
 * 'similar' formulas
 */
export interface IFormulaClassifier {
    /** a unique identifier to distinguish among different classifiers */
    id: string;
    /** given a formula and a MmParser, returns a string that
     * classifies the formula; undefined if the classifier doesn't
     * want to classify the given formula (for instance, the classifier might
     * be ment to classifiy only the implications)
     */
    classify(formula: ParseNode, mmParser: MmParser): string | undefined;
}
/** an example of classifiers */
export declare function formulaClassifiersExample(): IFormulaClassifier[];
