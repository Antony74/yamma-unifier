export interface IDiagnosticMessageForSyntaxError {
    diagnosticMessage(earlyParserErrorMessage: string): string;
}
export declare class VerboseDiagnosticMessageForSyntaxError implements IDiagnosticMessageForSyntaxError {
    diagnosticMessage(earlyParserErrorMessage: string): string;
}
export declare class ShortDiagnosticMessageForSyntaxError implements IDiagnosticMessageForSyntaxError {
    private theoryConstants;
    private theoryVariables;
    private maxNumberOfSymbolsDisplayed;
    constructor(theoryConstants: Set<string>, theoryVariables: Set<string>, maxNumberOfSymbolsDisplayed: number);
    getSubstringEndPosition(earlyParserErrorMessage: string): number;
    getFirstPartOfTheMessage(earlyParserErrorMessage: string): string;
    getListOfExpectedSymbols(expectedSymbols: string[]): string;
    diagnosticMessageFromSymbols(earlyParserErrorMessage: string, expectedSymbols: string[]): string;
    diagnosticMessage(earlyParserErrorMessage: string): string;
}
