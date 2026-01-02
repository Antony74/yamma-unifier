import { MmToken } from '../grammar/MmLexer';
export declare class TokensCreator {
    private imported_files;
    private isInAComment;
    constructor();
    private addTokensFromIncludedFile;
    createTokensFromLine(line: string, lineNumber: number, tokens: MmToken[], fileFullPath?: string): void;
    private addTokensFromLines;
    addTokensFromText(text: string, tokens: MmToken[], fileFullPath?: string): MmToken[];
    createTokensFromText(text: string, fileFullPath?: string): MmToken[];
    addTokensFromFile(fileFullPath: string, tokens: MmToken[]): MmToken[];
    createTokensFromFile(fileFullPath: string): MmToken[];
}
