import { Range, SemanticTokenModifiers, SemanticTokens, SemanticTokensParams, SemanticTokenTypes, uinteger } from 'vscode-languageserver';
import { MmToken } from '../grammar/MmLexer';
import { IConfigurationManager, IVariableKindConfiguration } from '../mm/ConfigurationManager';
import { MmParser } from '../mm/MmParser';
import { MmpParser } from '../mmp/MmpParser';
import { MmpComment } from '../mmp/MmpComment';
export declare const semanticTokenTypes: SemanticTokenTypes[];
export declare class OnSemanticTokensHandler {
    private semanticTokenParams;
    private configurationManager;
    private mmParser;
    private mmpParser;
    private workingVars;
    semanticTokensData: uinteger[];
    /** this is used to compute relative lines */
    private previousTokenStartLine;
    /** this is used to compute relative character */
    private previousTokenStartCharacter;
    private semanticTokenTypesMap;
    constructor(semanticTokenParams: SemanticTokensParams, semanticTokenTypes: SemanticTokenTypes[], configurationManager: IConfigurationManager, mmParser: MmParser, mmpParser: MmpParser);
    setVariableKindsConfiguration(): Promise<Map<string, IVariableKindConfiguration>>;
    addSemanticToken(tokenRange: Range, semanticTokenType: string, _semanticTokenModifier?: SemanticTokenModifiers): void;
    addSemanticTokensForComment(uComment: MmpComment): void;
    addSemanticTokenForKind(range: Range, kind: string, variableKindsConfiguration: Map<string, IVariableKindConfiguration>): Promise<void>;
    getKindForVariable(symbol: string, mmParser: MmParser): string | undefined;
    addSemanticTokensForArrayOfSymbols(symbols: MmToken[] | undefined, mmParser: MmParser, variableKindsConfiguration: Map<string, IVariableKindConfiguration>): void;
    addSemanticTokensForSearchStatement(searchStatementTokens: MmToken[]): void;
    /** adds two semantic tokens: one for '$=' , the first symbol of the proof,
     *  and one for '$.' , the last symbol of the proof */
    private addSemanticTokensForProofStatement;
    protected buildSemanticTokens(mmParser: MmParser, mmpParser: MmpParser, variableKindsConfiguration: Map<string, IVariableKindConfiguration>): SemanticTokens;
    semanticTokens(): Promise<SemanticTokens>;
}
