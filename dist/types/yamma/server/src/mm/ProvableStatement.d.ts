import { BlockStatement } from "./BlockStatement";
import { MmToken } from '../grammar/MmLexer';
import { AssertionStatement } from './AssertionStatement';
export declare class ProvableStatement extends AssertionStatement {
    private _compressedProofString;
    private _proofTokens;
    private _compressedProofLabelsTokens;
    isProofVerified: boolean;
    isProofVerificationFailed: boolean;
    constructor(labelToken: MmToken, content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
    get proofTokens(): MmToken[];
    get compressedProofLabelsTokens(): MmToken[];
    get Proof(): string[];
    get compressedProofString(): string;
    get CompressedProofLabels(): string[];
    get isUnproven(): boolean;
}
