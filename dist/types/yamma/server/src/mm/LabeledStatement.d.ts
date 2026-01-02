import { Grammar, Parser } from 'nearley';
import { BlockStatement } from "./BlockStatement";
import { MmToken } from '../grammar/MmLexer';
import { InternalNode, ParseNode } from '../grammar/ParseNode';
import { WorkingVars } from '../mmp/WorkingVars';
import { NonBlockStatement } from "./NonBlockStatement";
import { EventEmitter } from 'stream';
export interface FormulaNonParsableEventArgs {
    labeledStatement: LabeledStatement;
    parseResult: ParseResult;
}
export declare enum LabeledStatementEvents {
    formulaNonParsable = "formulaNonParsable"
}
export type ParseResult = {
    parseNode?: ParseNode;
    parser: Parser;
    error?: Error;
};
export declare abstract class LabeledStatement extends NonBlockStatement {
    labelToken: MmToken;
    private readonly emitter;
    on: <E extends string | symbol>(eventName: string | symbol, listener: (...args: any[]) => void) => EventEmitter<any>;
    emit: <E extends string | symbol>(eventName: string | symbol, ...args: any[]) => boolean;
    Label: string;
    private _parseNode;
    /** statement number for labeled statements */
    statementNumber: number;
    /** this is set to true when the formula is found to be non parsable
     * this avoids trying to parse it again and again: it's tried only once
     * and if it's not parsable, this is set to true and the parseNode is never set
     * (it remains undefined)
     */
    isFormulaMarkedAsNonParsable: boolean;
    static parseString(formula: string, grammar: Grammar, workingVars: WorkingVars): ParseResult;
    protected parseStrArray(theoryFormula: string[], grammar: Grammar, workingVars: WorkingVars): ParseNode | undefined;
    isParseNodeDefined(): boolean;
    get parseNode(): InternalNode | undefined;
    setParseNode(parseNode: InternalNode): void;
    private _logicalVariables;
    get logicalVariables(): Set<string> | undefined;
    /**
     *
     * @param strToParse
     * @param grammar
     */
    parseForTypecode(typecode: string, strToParse: string, grammar: Grammar): InternalNode;
    /** this should be invoked for SyntaxAxioms. The first symbol is replaced by
     * the provable typecode and then the parse method is invoked
     */
    parseNodeForSyntaxAxiom(grammar: Grammar): InternalNode;
    constructor(labelToken: MmToken, content: MmToken[], parentBlock: BlockStatement, comment?: MmToken[]);
}
