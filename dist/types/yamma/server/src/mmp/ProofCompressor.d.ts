import { Statement } from "../mm/Statements";
import { ProvableStatement } from "../mm/ProvableStatement";
import { LabeledStatement } from "../mm/LabeledStatement";
import { Diagnostic } from 'vscode-languageserver';
export declare class ProofCompressor {
    private diagnostics;
    failed: boolean;
    constructor(diagnostics: Diagnostic[]);
    static getDecompressedIntsFromString(compressedString: string): number[];
    private getDecompressedInts;
    private addDiagnosticForNotALabelForAssertion;
    private addDiagnosticForLabelOfAProvableStatementWithFailedVerification;
    getDecompressedProof(provableStatement: ProvableStatement, decompressed_ints: number[], labelToStatementMap: Map<string, LabeledStatement>): Statement[];
    /** it tries to decompress the proof of a ProvableStatement; it will set the value of the failed property;
     * it will return diagnostics if error are encountered
    */
    DecompressProof(provableStatement: ProvableStatement, labelToStatementMap: Map<string, LabeledStatement>): Statement[];
}
