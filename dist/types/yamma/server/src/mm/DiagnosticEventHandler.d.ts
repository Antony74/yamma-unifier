import { PublishDiagnosticsParams } from 'vscode-languageserver';
import { FormulaNonParsableEventArgs } from './LabeledStatement';
export interface IDiagnosticSink {
    sendDiagnostics(params: PublishDiagnosticsParams): void;
}
export declare class DiagnosticEventHandler {
    private static _instance;
    private sink;
    constructor(sink: IDiagnosticSink);
    formulaNonParsableEventHandler: (eventArgs: FormulaNonParsableEventArgs) => void;
    static getInstance(sink?: IDiagnosticSink): DiagnosticEventHandler;
}
