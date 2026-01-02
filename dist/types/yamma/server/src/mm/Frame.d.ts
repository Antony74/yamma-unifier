import { DisjointVarMap } from './DisjointVarMap';
import { AssertionStatement } from "./AssertionStatement";
import { EHyp } from './EHyp';
import { FHyp } from './FHyp';
export declare class Frame {
    disjVars: DisjointVarMap;
    eHyps: EHyp[];
    fHyps: FHyp[];
    assertionStatement: AssertionStatement;
    constructor(assertionStatement: AssertionStatement);
    static createFrame(assertionStatement: AssertionStatement): void;
}
