import { Connection } from 'vscode-languageserver';
import { GlobalState } from '../general/GlobalState';
import { MmDiagnostic, MmParser, ParsingProgressArgs } from './MmParser';
/** loads a new .mm file and updates the step suggestions model */
export declare class TheoryLoader {
    private globalState;
    /** the path of the .mm to be loaded */
    mmFilePath: string;
    connection: Connection;
    mmParser?: MmParser;
    constructor(mmFilePath: string, connection: Connection, globalState: GlobalState);
    notifyProgress(parsingProgressArgs: ParsingProgressArgs): void;
    getCurrentDocumentDir(): Promise<string | undefined>;
    removeTheCurrentTheoryFromTheGlobalState(): void;
    private buildDiagnosticsForEachFile;
    private sendDiagnostiForSingleMmFile;
    sendDiagnostics(mmFilePath: string, diagnostics: MmDiagnostic[]): void;
    /** Attach diagnostic listeners to all labeled statements */
    private attachDiagnosticListeners;
    loadTheoryFromMmFile(mmFilePath: string): Promise<void>;
    private loadNewTheorySync;
    /** starts a thread to load a step suggestion model  */
    private loadStepSuggestionModelAsync;
    /** checks if the current mmFilePath is different from the one stored in the GlobalState: if that's the
     * case, then:
     * 1. loads the new theory
     * 2. starts the async update of the step suggestion model
     * 3. updates statistics for the theory (TODO later)
     *
     */
    loadNewTheoryIfNeededAndThenTheStepSuggestionModel(): Promise<void>;
}
