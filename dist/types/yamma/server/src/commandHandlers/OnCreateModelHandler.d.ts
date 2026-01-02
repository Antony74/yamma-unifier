import { Connection } from 'vscode-languageserver';
import { GlobalState } from '../general/GlobalState';
import { ParsingProgressArgs } from '../mm/MmParser';
export declare abstract class OnCreateModelHandler {
    static buildModelFileFullPath(globalState: GlobalState): string;
    static notifyProgress(parsingProgressArgs: ParsingProgressArgs): void;
    static createModel(connection: Connection, mmFilePath: string): Promise<void>;
}
