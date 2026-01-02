/**
 * An efficient representation for a set of disjoint vars
 */
export declare class DisjointVarMap {
    map: Map<string, Set<string>>;
    constructor();
    /**Adds the two vars (in the right order) to the map */
    add(var1: string, var2: string): void;
    containsDjContraint(var1: string, var2: string): boolean;
    /**
    * Disjoint Vars are sorted lexicographically (each constraint is returned as an array with two elements)
    */
    get sortedDisjVarPairs(): Array<[string, string]>;
}
