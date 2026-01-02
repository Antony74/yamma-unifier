import { Connection, DidChangeConfigurationParams } from 'vscode-languageserver';
import { GlobalState } from '../general/GlobalState';
export declare enum ProofMode {
    normal = "normal",
    packed = "packed",
    compressed = "compressed"
}
export declare enum DisjVarAutomaticGeneration {
    GenerateNone = "GenerateNone",
    GenerateDummy = "GenerateDummy",
    GenerateAll = "GenerateAll"
}
export declare enum LabelsOrderInCompressedProof {
    fifo = "fifo",
    mostReferencedFirst = "mostReferencedFirst",
    mostReferencedFirstAndNiceFormatting = "mostReferencedFirstAndNiceFormatting"
}
export declare enum DiagnosticMessageForSyntaxError {
    short = "short",
    verbose = "verbose"
}
export default DiagnosticMessageForSyntaxError;
export interface IVariableKindConfiguration {
    workingVarPrefix: string;
    lspSemantictokenType: string;
}
interface IKindConfiguration {
    variablekind: string;
    workingvarprefix: string;
    lspsemantictokentype: string;
}
/** this is the configuration that will be provided to all the other classes. It is
 * built on the fly from IExtensionConfiguration, transforming IKindConfiguration[]
 * to a map (for better perfomance); the reason we use two interfaces is that we cannot store
 * the map direcly in the .config file
 */
export interface IExtensionSettings {
    mmFileFullPath: string;
    disjVarAutomaticGeneration: DisjVarAutomaticGeneration;
    maxNumberOfProblems: number;
    proofMode: ProofMode;
    labelsOrderInCompressedProof: LabelsOrderInCompressedProof;
    diagnosticMessageForSyntaxError: DiagnosticMessageForSyntaxError;
    variableKindsConfiguration: Map<string, IVariableKindConfiguration>;
}
export declare const defaultSettings: IExtensionSettings;
export interface IConfigurationManager {
    variableKindsConfiguration(uri: string): Map<string, IVariableKindConfiguration> | PromiseLike<Map<string, IVariableKindConfiguration>>;
}
export declare class ConfigurationManager implements IConfigurationManager {
    private globalState;
    hasConfigurationCapability: boolean;
    hasDiagnosticRelatedInformationCapability: boolean;
    defaultSettings: IExtensionSettings;
    globalSettings: IExtensionSettings;
    private _connection;
    private _documentSettings;
    constructor(hasConfigurationCapability: boolean, hasDiagnosticRelatedInformationCapability: boolean, defaultSettings: IExtensionSettings, globalSettings: IExtensionSettings, connection: Connection, globalState: GlobalState);
    updateTheoryIfTheCase(): Promise<void>;
    didChangeConfiguration(change: DidChangeConfigurationParams): Promise<void>;
    buildMap(kindConfigurations: IKindConfiguration[]): Map<string, IVariableKindConfiguration>;
    private currentConfiguration;
    private extensionSettings;
    private setGlobalStateSettings;
    private updateGlobalSettings;
    private getScopeUriSettings;
    /** deletes from the cache the settings for the given document */
    delete(uri: string): void;
    maxNumberOfProblems(textDocumentUri: string): Promise<number>;
    proofMode(textDocumentUri: string): Promise<ProofMode>;
    labelsOrderInCompressedProof(textDocumentUri: string): Promise<LabelsOrderInCompressedProof>;
    /** the full path for the .mm file containing the theory for the new proof */
    mmFileFullPath(textDocumentUri: string): Promise<string>;
    variableKindsConfiguration(textDocumentUri: string): Promise<Map<string, IVariableKindConfiguration>>;
    diagnosticMessageForSyntaxError(textDocumentUri: string): Promise<DiagnosticMessageForSyntaxError>;
}
