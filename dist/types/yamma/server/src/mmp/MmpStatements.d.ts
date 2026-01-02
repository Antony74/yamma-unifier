import { Range } from 'vscode-languageserver-textdocument';
import { MmToken } from '../grammar/MmLexer';
export declare class ProofStepFirstTokenInfo {
    /** the original whole token */
    firstToken: MmToken;
    isEHyp: boolean;
    stepRef: MmToken;
    eHypRefs: MmToken[] | undefined;
    stepLabel?: MmToken;
    unparsableToken?: string;
    constructor(firstToken: MmToken, isEHyp: boolean, stepRef: MmToken, eHypRefs?: MmToken[], stepLabel?: MmToken, unparsableToken?: string);
    get eHypRefsRange(): Range | undefined;
}
