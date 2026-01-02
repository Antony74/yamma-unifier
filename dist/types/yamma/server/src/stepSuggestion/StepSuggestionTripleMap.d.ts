/** an efficient data structure to store classifierId, formulaClusterId,
 * theoremLabelUsedInThePast, multiplicity (while building the model)
  */
export declare class StepSuggestionTripleMap {
    map: Map<string, Map<string, Map<string, number>>>;
    constructor();
    private addNewDoubleMap;
    add(classifierId: string, formulaClusterId: string, currentStepLabel: string): void;
    buildTextToWrite(): string;
}
