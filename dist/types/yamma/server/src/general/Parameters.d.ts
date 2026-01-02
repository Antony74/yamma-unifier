/** parameters shared among all classes; we don't use constants because we want tests to be able
 * to modify these values
 */
export declare abstract class Parameters {
    /** the leftmost position of a formula in a mmp proof displayed in indented mode */
    static startCharForIndentedMmpFormula: number;
    static defaultLeftMarginForCompressedProofs: number;
    static charactersPerLine: number;
    static defaultLeftMarginForMmtFilesCompressedProof: number;
    /** the minimum number of characters, for a partial label, that triggers
     * the 'last resort' step suggestion
     */
    static numberOfCharsTriggeringCompletionItemsFromPartialLabel: number;
    /** the maximum number of characters that will populate a new search statement
     * (computed from the statemente where the cursor is placed)
     */
    static maxNumberOfSymbolsComputedForSearch: number;
    /** max number of hypothesis dispositions to be tried for a single
     * assertion, candidate for a step derivation; for instance, if
     * a logical assertion has 3 hypothesis and the step to be derived
     * follows 10 steps, then in the worst case, 10^3 dispositions
     * should be tried; if the worst case exceedes this parameter,
     * the derivation is not even tried
     */
    static maxNumberOfHypothesisDispositionsForStepDerivation: number;
    static defaultComment: string;
    static dummyConstraintsComment: string;
    static newlyAddedConstraintComment: string;
}
