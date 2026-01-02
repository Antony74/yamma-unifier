import { MmParser } from '../mm/MmParser';
import { ITheoremSignature } from './MmtParser';
import { ProvableStatement } from "../mm/ProvableStatement";
import { Diagnostic, Range } from 'vscode-languageserver';
import { MmStatistics } from '../mm/MmStatistics';
import { GlobalState } from '../general/GlobalState';
export declare class MmtLoader {
    private globalState?;
    textDocumentPath: string;
    mmParser: MmParser;
    diagnostics: Diagnostic[];
    /** maps every .mmt uri to its diagnostics */
    diagnosticsMap: Map<string, Diagnostic[]>;
    loadFailed: boolean;
    /** used to allow testing */
    mmStatistics: MmStatistics | undefined;
    private _dirname;
    constructor(textDocumentPath: string, mmParser: MmParser, globalState?: GlobalState | undefined);
    /** if the graph of dependencies is acyclic, it returns file names in topological order;
     * if the graph is not acyclic, it returns undefined*/
    computeLoadOrder(dependencies: Map<string, Set<string>>): string[] | undefined;
    protected addGlobalDependenciesForSingleTheorem(theorem: string, globalDependencies: Map<string, Set<string>>): void;
    private readMmtFile;
    private addGlobalDependenciesForSingleFile;
    /** reads all dependencies in the .mmt files, even those w.r.t. theorems that are not proven
     * in the .mmt files
     */
    private readGlobalDependenciesInMustFollowForm;
    private addLocalMmtDependencyInMustPrecedeForm;
    protected restrictToLocalMmtDependenciesInMustPrecedeForm(globalDependenciesInMustFollowForm: Map<string, Set<string>>): Map<string, Set<string>>;
    /**
     * reads all .mmt file in the folder and build a dependency graph
     */
    private readDependencyGraph;
    private theoremLabelsInLoadOrder;
    addDiagnosticsForUri(fileUri: string, diagnostics: Diagnostic[]): void;
    private addDiagnostics;
    protected tryToAddTheoremToTheory(fileName: string, fileContent: string): void;
    getDefaultRangeForDiagnostic(theorem: ITheoremSignature): Range;
    isTheoremCoherent(theorem: ITheoremSignature, labeledStatement: ProvableStatement): boolean;
    canTheoremBeAdded(fileContent: string): boolean;
    private loadFile;
    private loadFiles;
    private completeDataForStatement;
    private addDiagnosticError;
    private updateStatistics;
    /** loads all the .mmt file found in the current folder */
    loadMmt(): void;
}
