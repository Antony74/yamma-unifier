import { CompletionItem, CompletionItemKind } from 'vscode-languageserver';
import { CursorContext } from "../mmp/CursorContext";
import { MmParser } from '../mm/MmParser';
import { MmpProofStep } from "../mmp/MmpProofStep";
import { IFormulaClassifier } from './IFormulaClassifier';
import { StepSuggestionMap } from './StepSuggestionMap';
import { IStepSuggestion } from './ModelLoader';
export declare class StepSuggestion {
    cursorContext: CursorContext;
    stepSuggestionMap: StepSuggestionMap;
    formulaClassifiers: IFormulaClassifier[];
    mmpProofStep: MmpProofStep;
    mmParser: MmParser;
    private command;
    private completionItemKindOrder;
    private completionItemKindForPartialLabel;
    constructor(cursorContext: CursorContext, stepSuggestionMap: StepSuggestionMap, formulaClassifiers: IFormulaClassifier[], mmpProofStep: MmpProofStep, mmParser: MmParser);
    private initializeCompletionItemKindOrder;
    classifyProofStepFormula(formulaClassifier: IFormulaClassifier): string | undefined;
    isUnifiable(stepSuggestionLabel: string): boolean;
    private getUnifiableStepSuggestions;
    doesLabelMatchTheProofStepLabel(label: string): boolean;
    private insertReplaceEdit;
    sortText(completionItemKind: CompletionItemKind, index: number): string;
    private getWilsonScore;
    private addCompletionItemFromModel;
    private getCompletionItemsFromStepSuggestions;
    addSetSuggestionsForClassifier(formulaClassifier: IFormulaClassifier, stepSuggestions: IStepSuggestion[]): void;
    getStepSuggestionsFromAllModels(): IStepSuggestion[];
    private wilsonScore;
    orderStepSuggestionsByWilsonScore(stepSuggestions: IStepSuggestion[]): void;
    getStepSuggestionsFromModelsWithoutDuplication(stepSuggestions: IStepSuggestion[]): {
        stepSuggestionsWithoutDuplication: IStepSuggestion[];
        alreadyAddedLabels: Set<string>;
    };
    private getCompletionItemsFromModels;
    static buildRegExp(partialLabel: string): RegExp;
    createAndAddItemFromPartialLabel(partialLabel: string, label: string, i: number, completionItems: CompletionItem[]): void;
    private addCompletionItemsFromPartialLabelActually;
    /** when the user inputs some characters, then this method adds more CompletionItem(s), using
     * a general algorithm that does not depend on a trained model: all 'matching' assertions
     * are returned
     */
    private addCompletionItemsFromPartialLabel;
    completionItems(): CompletionItem[];
}
