import { InternalNode } from '../grammar/ParseNode';
export declare class FormulaToParseNodeCache {
    formulaToInternalNodeMap: Map<string, InternalNode>;
    /** cache for formula recently parsed. It really speeds up the MmpParser, because
     * it allows avoiding most of the parsing time (an .mmp file, often doesn't
     * change much from an edit to the other)
     */
    constructor();
    add(formula: string, internalNode: InternalNode): void;
    invalidate(stepFormulaString: string): void;
}
