import { MmpProof } from './MmpProof';
import { FormulaToParseNodeCache } from './FormulaToParseNodeCache';
import { Diagnostic } from 'vscode-languageserver';
/**
 * This class provides methods to replace all working variables in a proof
 * with unused variables of the same kind from the theory.
 * This is needed when the proof is complete, but still contains working variables.
 */
export declare class WorkingVarReplacerForCompleteProof {
    private uProof;
    constructor(uProof: MmpProof);
    /**
     * Recursive method that traverses the parse node and adds any working var found to the set
     * @param parseNode the parse node to traverse
     * @param workingVars the set of working vars to update
     */
    private gatherWorkingVars;
    /**
     * Returns the set of working vars present in the proof
     */
    private getWorkingVars;
    /**
     * Returns the set of variables present in the proof. This is used to avoid using a variable
     * that is already present in the proof (even if it is not mandatory)
     */
    private getVarsPresentInProof;
    /**
     * Returns a variable of the given kind that is not in the set of used variables
     * @param kind the kind of the variable to find
     * @param usedVars the set of used variables
     */
    private findUnusedVar;
    /**
     * Creates a parse node for the given variable, to be used as a replacement
     * @param unusedVar the variable to create the node for
     * @param kind the kind of the variable
     * @returns the created InternalNode, or undefined if the variable definition cannot be found
     */
    private createReplacementNode;
    /**
     * Builds the map of substitutions from working vars to theory vars
     * @param workingVars the working variables to replace
     * @param usedVars the variables currently used in the proof (updated in place)
     * @returns a map where keys are working vars and values are their replacement nodes
     */
    private buildUnifier;
    /**
     * Applies the unification substitution to the proof
     * @param unifier the substitution map
     * @param formulaToParseNodeCache optional cache to update
     */
    private applyUnifier;
    /**
     * Replaces all working vars in the proof with unused variables (in the theory) of the same kind.
     * This is needed when the proof is complete, but still contains working variables.
     * @param formulaToParseNodeCache if provided, the cache will be updated with the new formulas
     */
    replaceWorkingVarsWithTheoryVars(formulaToParseNodeCache?: FormulaToParseNodeCache, diagnostics?: Diagnostic[]): void;
    /** adds diagnostics for working vars that cannot be replaced by an unused theory variable.
     * This method is used when the prof is complete, but still contains working variables and
     * there are no unused theory variables to replace them with.
     * This method is called both from the MmpUnifier (to check if the proof can be generated) and
     * from the MmpValidator (to add diagnostics after unification). When called from the MmpUnifier,
     * the diagnostics are not sent to the editor, but only used to decide if the proof can be generated.
     * Only when called from the MmpValidator, the diagnostics are actually sent to the editor.
     */
    addDiagnosticsForMissingUnusedVars(diagnostics: Diagnostic[]): void;
}
