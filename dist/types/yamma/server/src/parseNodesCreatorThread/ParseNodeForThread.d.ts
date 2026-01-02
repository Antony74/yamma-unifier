import { MmToken } from '../grammar/MmLexer';
import { ParseNode } from '../grammar/ParseNode';
export interface InternalNodeForThread {
    label: string;
    kind: string;
    parseNodes: ParseNodeForThread[];
}
export interface MmTokenForThread {
    value: string;
    line: number;
    column: number;
}
/**
 * The ParseNodeForThreadConverter class provides methods to convert parse nodes and tokens
 * into a format suitable for multi-threaded processing. We need this because threads cannot
 * pass objects that are not serializable.
 */
export declare abstract class ParseNodeForThreadConverter {
    static convertMmToken(mmToken: MmToken): MmTokenForThread;
    private static convertParseNodes;
    private static convertInternalParseNode;
    static convertParseNode(parseNode: ParseNode): ParseNodeForThread;
    private static convertParseNodesForThread;
    private static convertInternalParseNodeForThread;
    static convertParseNodeForThread(parseNodeForThread: ParseNodeForThread): ParseNode;
}
export type ParseNodeForThread = InternalNodeForThread | MmTokenForThread;
