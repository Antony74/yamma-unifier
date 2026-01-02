import { MmParser } from '../mm/MmParser';
import { MmpProof } from '../mmp/MmpProof';
import { MmpDisjVarStatement } from "../mmp/MmpDisjVarStatement";
import { MmpProofStep } from "../mmp/MmpProofStep";
import { IMmpCompressedProofCreator } from '../mmp/proofCompression/MmpCompressedProofCreator';
export interface PathAndUri {
    uri: string;
    fsPath: string;
}
export interface MmtSaverArgs {
    textDocumentPath: string;
    documentContentInTheEditor: string;
    mmParser: MmParser;
    leftMargin: number;
    charactersPerLine: number;
    mmpCompressedProofCreator?: IMmpCompressedProofCreator;
}
export declare class MmtSaver {
    private textDocumentPath;
    private documentContentInTheEditor;
    private mmParser;
    private leftMargin;
    private charactersPerLine;
    private mmpCompressedProofCreator?;
    /** Will be true if the `saveMmt()` method is successful. */
    isMmtFileSuccessfullyCreated: boolean;
    newFileUri: string;
    constructor(mmtSaverArgs: MmtSaverArgs);
    buildUProof(mmpContent: string): MmpProof;
    /** compares two $d statements in lexical order */
    disjVarCompare(disjVarA: MmpDisjVarStatement, disjVarB: MmpDisjVarStatement): number;
    orderDisjVarUStatements(disjVarUStatements: MmpDisjVarStatement[]): MmpDisjVarStatement[];
    /** returns the text for the $d statements in the .mmt file; the statements are produced in lexicographic order */
    private textForDjConstraints;
    textForCurrentEHyp(uProofStep: MmpProofStep): string;
    textForEStatements(uProof: MmpProof): string;
    private textForPStatement;
    private fromTokensToFormattedString;
    /** reformats the given text, using single spacing */
    protected reformat(text: string, leftMarginForFirstLine: number, leftMarginForOtherLines: number): string;
    textForComment(uProof: MmpProof): string;
    protected createTextToBeStored(uProof: MmpProof): string | undefined;
    protected tryToCreateTextToBeStored(mmpContent: string): string | undefined;
    saveToFile(text: string): void;
    saveMmt(): void;
}
