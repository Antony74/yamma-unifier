import { IVariableKindConfiguration } from '../mm/ConfigurationManager';
export declare class WorkingVars {
    kindToPrefixMap: Map<string, string>;
    prefixToKindMap: Map<string, string>;
    private _maxIndex;
    private _workingVarPrefixes;
    private _alreadyCreatedWorkingVars;
    private addMap;
    constructor(kindToPrefixMap: Map<string, string>);
    /** creates a map from theory variable's kinds to working var prefix, given the
     * configuration for working vars
     */
    static getKindToWorkingVarPrefixMap(variableKindsConfiguration: Map<string, IVariableKindConfiguration>): Map<string, string>;
    reset(): void;
    /**
     * if workingVar is a working var, returns its kind
     * @param workingVar
     */
    kindOf(workingVar: string): string | undefined;
    /**
     * if workingVar is a working var, returns its index; for instance, for &W12 returns 12
     * @param workingVar
     * @returns
     */
    indexOf(workingVar: string): number;
    isAWorkingVarSymbol(value: string): boolean;
    tokenType(value: string): string | undefined;
    tokenTypeFromKind(kind: string): string;
    getNewWorkingVar(variableKind: string): string | undefined;
    isAlreadyExistentWorkingVar(symbol: string): boolean;
    /**
     * if workingVar is a working var, returns the max index already given for that kind
     * of working var
     * @param workingVar
     * @returns s
     */
    maxIndex(workingVar: string): number | undefined;
    /**
     * if symbol is a Working Var, WorkingVars state is updated
     * @param symbol
     */
    updateWorkingVarsIfTheCase(symbol: string): void;
}
