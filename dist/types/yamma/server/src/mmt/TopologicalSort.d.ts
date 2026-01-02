/** this class performs Topological Sorting, using Kahn’s algorithm */
export declare class TopologicalSort<T> {
    graph: Map<T, Set<T>>;
    /** computes the topological sort of the given graph */
    constructor(graph: Map<T, Set<T>>);
    /** returns the topological sort of the given graph, if the the graph is acyclic; undefined otherwise */
    sort(): T[] | undefined;
}
