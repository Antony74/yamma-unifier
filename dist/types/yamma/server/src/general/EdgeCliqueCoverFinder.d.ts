/** this is an edge of the undirected graph. v1 is assumed to be less than v2 */
export interface Edge {
    vertex1: number;
    vertex2: number;
}
/** implements the Kellerman's algorithm for the minimum edge clique cover, see Pag. 3 of
 * https://epubs.siam.org/doi/pdf/10.1137/1.9781611972863.9
 * vertices are assumed to be an interval of integers starting from 0, i.e. in the form ( 0 ... n )
 */
export declare class EdgeCliqueCoverFinder {
    private undirectedGraph;
    cliqueCover: Set<Set<number>> | undefined;
    private numberOfVertices;
    /**
     *
     * @param undirectedGraph
     */
    constructor(undirectedGraph: Edge[]);
    /** builds an edge with vertices in the right order */
    static buildEdge(vertex1: number, vertex2: number): Edge | undefined;
    private computeNumberOfVerticesAndCheckData;
    /** returns the first clique c such that the size of c i^i w is maximal  */
    private getCliqueWithMaximalIntersectionWithW;
    private tryToAddThisVertexToEachOfTheExistingCliques;
    private handleVertex;
    findEdgeCliqueCover(): Set<Set<number>>;
}
