import { integer } from 'vscode-languageserver';
import { MmpProofStep } from './MmpProofStep';
export interface BuildNewLabelArgs {
    /** the name of the current therem */
    theoremLabel: string;
    /** current EHYp, for which the label may be updated */
    eHyp: MmpProofStep;
    /** if the current label is changed, this will be incremented */
    nextLabelIndexToBeAssigned: integer;
}
export declare abstract class EHypLabelManager {
    static buildNewLabel(buildNewLabelArgs: BuildNewLabelArgs): void;
    /** label are created to be of the form <theoremName>.nn where nn is
     * an incrementing suffix.
     * But if a label exists with a prefix not equal
     * to <theoremName>, it is left unchanged.
     * If a label exists with a prefix equal to <theoremName> but
     * with a suffix which is not a number, it is left unchanged.
     * If a label exists with a prefix equal to <theoremName>, a
     * suffix which is a number, but it is not the expected number,
     * the suffix is updated to reflect its actual order.
     */
    static buildNewLabelIfNeeded(buildNewLabelArgs: BuildNewLabelArgs): void;
}
