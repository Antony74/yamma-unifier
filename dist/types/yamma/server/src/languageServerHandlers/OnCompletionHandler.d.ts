import { CompletionItem, CompletionList, TextDocumentPositionParams } from 'vscode-languageserver';
import { ConfigurationManager } from '../mm/ConfigurationManager';
import { MmParser } from '../mm/MmParser';
import { MmStatistics } from '../mm/MmStatistics';
import { MmpParser } from '../mmp/MmpParser';
import { MmpStatistics } from '../mmp/MmpStatistics';
import { StepSuggestionMap } from '../stepSuggestion/StepSuggestionMap';
import { CursorContext } from '../mmp/CursorContext';
export declare class OnCompletionHandler {
    textDocumentPosition: TextDocumentPositionParams;
    /** line of the cursor */
    cursorLine: number;
    /** column of the cursor */
    cursorCharacter: number;
    configurationManager: ConfigurationManager;
    private stepSuggestionMap?;
    private mmParser?;
    private mmpParser?;
    private mmStatistics?;
    private mmpStatistics;
    constructor(textDocumentPosition: TextDocumentPositionParams, configurationManager: ConfigurationManager, stepSuggestionMap?: StepSuggestionMap, mmParser?: MmParser, mmpParser?: MmpParser, mmStatistics?: MmStatistics, mmpStatistics?: MmpStatistics);
    /** returns the array of symbols expected from the early parser */
    stepSuggestion(cursorContext: CursorContext, mmParser: MmParser): CompletionItem[];
    completionItems(): Promise<CompletionList>;
}
