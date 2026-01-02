import { MmToken } from '../grammar/MmLexer';
import { MmpParser } from './MmpParser';
import { IMmpStatementWithRange, IMmpStatement } from './MmpStatement';
/** the cursor position determines which kind of completion is required */
export declare enum CursorContextForCompletion {
    firstCharacterOfAnEmptyALine = "firstCharacterOfAnEmptyALine",
    afterGetProof = "afterGetProof",
    searchStatement = "searchStatement",
    stepLabel = "stepLabel",
    stepFormula = "stepFormula"
}
/** build info about the cursor context, and the proof step where the cursor is */
export declare class CursorContext {
    /** line of the cursor */
    cursorLine: number;
    /** column of the cursor */
    cursorCharacter: number;
    mmpParser: MmpParser;
    /** after the execution of buildContext() this property contains the cursor context for autocompletion */
    contextForCompletion?: CursorContextForCompletion;
    private _mmpStatement?;
    /** sets the mmpStatement the cursor is positioned on */
    private setMmpStatement;
    /** the MmpProofStep the cursor is positioned on, if any */
    get mmpStatement(): IMmpStatementWithRange | undefined;
    constructor(cursorLine: number, cursorCharacter: number, mmpParser: MmpParser);
    /** returns the IMmpStatementWithRange at the given line (it may be a multiline proof step) */
    static getMmpStatement(uStatements: IMmpStatement[], line: number): IMmpStatementWithRange | undefined;
    private isOnStepLabel;
    private tokenStartsBefore;
    /** returns the formula before the cursor. If there is no formula or the cursor is not in the formula, it
     * returns undefined
     */
    private getFormulaBeforeCursorInUProofStep;
    /** returns undefined if the cursor is not on a proof step; returns [] if the cursor is on an empty proof step formula;
     * returns the portion of formula that preceeds the cursor (if the cursor is on a nonempty proof step formula)
     */
    formulaBeforeCursor(): MmToken[] | undefined;
    /**
     * tokens in the line where the cursor is
     */
    get currentLine(): MmToken[];
    /** the first token, if it touches the cursor (the cursor could be just after the token) */
    static firstTokenIfItTouchesTheCursor(cursorLine: number, cursorCharacter: number, mmpParser: MmpParser): MmToken | undefined;
    private isAfterDollarSign;
    private isfirstCharacterOrAfterDollarSign;
    isAfterGetProof(): boolean;
    buildContext(): void;
}
