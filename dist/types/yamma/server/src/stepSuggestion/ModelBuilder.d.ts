import { AssertionStatement } from "../mm/AssertionStatement";
import { Connection } from 'vscode-languageserver';
import { IFormulaClassifier } from './IFormulaClassifier';
import { StepSuggestionTripleMap } from './StepSuggestionTripleMap';
import { EventEmitter } from 'stream';
export declare class ModelBuilder extends EventEmitter {
    private connection?;
    private progressToken?;
    private mmFilePath;
    private formulaClassifiers;
    private _fHypLabels;
    private _mmParser;
    /** change this one if you want ConsoleLog messages */
    private notifyProgressEnabled;
    /** maps a rpn string representation of a parse node to a map that associates
     * every label (with multiplicity) used to justify such a formula
     */
    stepGiustificationStatistics: Map<string, Map<string, number>>;
    stepSuggestionTripleMap: StepSuggestionTripleMap;
    constructor(mmFilePath: string, formulaClassifiers: IFormulaClassifier[], notifyProgressEnabled: boolean, connection?: Connection | undefined, progressToken?: string | undefined);
    private buildFHyps;
    /** builds a rpn string representing the syntax tree of the given formula */
    private syntaxTree;
    private parseNode;
    addStepGiustificationStatistics(formulaClassifierId: string, formulaClusterId: string, currentStepLabel: string): void;
    addAssertionStatementWithSubstitution(assertionStatementProofStep: AssertionStatement, assertionStatementWithSubstitution: string[]): void;
    private addSingleStepToTheModel;
    private addDecompressedProofToModel;
    private addSingleProofToModel;
    private notifyProgress;
    protected buildStepSuggestionTripleMap(): void;
    save(textToWrite: string): void;
    private sortSuggestionsAndSave;
    buildModel(): void;
    static buildModelFileFullPath(mmFilePath: string): string;
}
