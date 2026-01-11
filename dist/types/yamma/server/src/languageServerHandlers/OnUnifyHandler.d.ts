import { Connection, TextDocuments, TextEdit } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { GlobalState } from '../general/GlobalState';
import { ConfigurationManager } from '../mm/ConfigurationManager';
import { MmParser } from '../mm/MmParser';
import { MmpParser } from '../mmp/MmpParser';
export interface UnifyAndValidateArgs {
    textDocumentUri: string;
    connection: Connection;
    documents: TextDocuments<TextDocument>;
    hasConfigurationCapability: boolean;
    maxNumberOfHypothesisDispositionsForStepDerivation: number;
    globalState: GlobalState;
    renumber: boolean;
    removeUnusedStatements: boolean;
}
export interface IUnificationResult {
    textEdits: TextEdit[];
    mmpParser?: MmpParser;
}
export declare class OnUnifyHandler {
    private textDocumentUri;
    private mmpParser;
    private renumber;
    private removeUnusedStatements;
    mmParser: MmParser;
    configurationManager: ConfigurationManager;
    maxNumberOfHypothesisDispositionsForStepDerivation: number;
    globalState: GlobalState;
    constructor(textDocumentUri: string, mmParser: MmParser, mmpParser: MmpParser, configurationManager: ConfigurationManager, maxNumberOfHypothesisDispositionsForStepDerivation: number, renumber: boolean, removeUnusedStatements: boolean, globalState: GlobalState);
    private buildMmpCompressedProofCreator;
    private parseMmpFile;
    private unify;
    static unifyIfTheCase(unifyAndValidateArgs: UnifyAndValidateArgs): Promise<IUnificationResult>;
    private static requireValidation;
    private static applyTextEditsAndValidate;
    static unifyAndValidate(unifyAndValidateParams: UnifyAndValidateArgs): Promise<IUnificationResult>;
}
