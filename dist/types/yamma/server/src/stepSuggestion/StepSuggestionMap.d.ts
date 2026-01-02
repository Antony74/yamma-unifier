import { CompletionItemKind } from 'vscode-languageserver';
import { IStepSuggestion } from './ModelLoader';
export interface StepSuggestionsForFormulaCluster {
    formulaClassifierId: string;
    formulaClusterId: string;
    stepSuggestions: IStepSuggestion[];
    totalMultiplicityForThisCluster: number;
}
export interface StepSuggestionsForClassifier {
    formulaClassifierId: string;
    formulaClusterToStepSuggestionsMap: Map<string, StepSuggestionsForFormulaCluster>;
}
/** for each IFormulaClassifier, returns a map, that provides steps suggestions for
formulas  */
export declare class StepSuggestionMap {
    /** maps a IFormulaClassifier to another map, that gives steps suggestions for
     * a cluster of formula
     */
    map: Map<string, StepSuggestionsForClassifier>;
    constructor();
    add(formulaClassifierId: string, completionItemKind: CompletionItemKind, formulaClusterId: string, giustificationLabel: string, multiplicity: number): void;
    getStepSuggestions(classifierId: string, formulaClusterId: string): IStepSuggestion[] | undefined;
}
