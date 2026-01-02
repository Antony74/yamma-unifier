import { Grammar } from 'nearley';
import { LabeledStatement } from '../mm/LabeledStatement';
import { MmParser } from '../mm/MmParser';
import { WorkingVars } from '../mmp/WorkingVars';
import { IMmpRuleForThread } from './GrammarManagerForThread';
import { ParseNodeForThread } from './ParseNodeForThread';
type MessageProgress = {
    kind: 'progress';
    index: number;
    count: number;
};
type MessageLog = {
    kind: 'log';
    text: string;
};
type MessageDone = {
    kind: 'done';
    labelToParseNodeForThreadMap: Map<string, ParseNodeForThread>;
};
type Message = MessageDone | MessageProgress | MessageLog;
export type ProgressCallback = (message: MessageProgress | MessageLog) => void;
export declare const createMessageProgress: (index: number, count: number) => MessageProgress;
export declare const createMessageLog: (text: string) => MessageLog;
export declare const createMessageDone: (labelToParseNodeForThreadMap: Map<string, ParseNodeForThread>) => MessageDone;
export declare const postMessage: (message: Message) => void;
export declare const defaultProgressCallback: ProgressCallback;
export declare function createParseNodeForThread(formula: string, grammar: Grammar, workingVars: WorkingVars): ParseNodeForThread | undefined;
export declare function createLabelToParseNodeForThreadMap(labelToFormulaMap: Map<string, string>, mmpRulesForThread: IMmpRuleForThread[], progressCallback?: ProgressCallback): Map<string, ParseNodeForThread>;
export declare function createLabelToFormulaMap(mmParser: MmParser): Map<string, string>;
export declare function addParseNodes(labelToParseNodeForThreadMap: Map<string, ParseNodeForThread>, labelToStatementMap: Map<string, LabeledStatement>): void;
export declare function createParseNodesInANewThread(mmParser: MmParser, progressCallback: ProgressCallback): Promise<void>;
export declare function createParseNodesInCurrentThread(mmParser: MmParser, progressCallback: ProgressCallback): void;
export {};
