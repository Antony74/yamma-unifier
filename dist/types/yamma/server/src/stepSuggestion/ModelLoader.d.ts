import { CompletionItemKind, Connection } from 'vscode-languageserver';
import { IFormulaClassifier } from './IFormulaClassifier';
import { StepSuggestionMap, StepSuggestionsForFormulaCluster } from './StepSuggestionMap';
export interface IStepSuggestion {
    completionItemKind: CompletionItemKind;
    label: string;
    multiplicity: number;
    stepSuggestionsForFormulaCluster: StepSuggestionsForFormulaCluster;
}
export declare class ModelLoader {
    private mmFilePath;
    /** maps a classifierId to a CompletionItemKind */
    private completionItemKind;
    constructor(mmFilePath: string, formulaClassifiers: IFormulaClassifier[]);
    private initializeCompletionItemKind;
    private static getModelRows;
    private buildSuggestionsMap;
    protected buildSuggestionsMapForModel(model: string): StepSuggestionMap;
    private loadSuggestionsMapForExistingModel;
    loadSuggestionsMap(connection: Connection): Promise<StepSuggestionMap>;
}
