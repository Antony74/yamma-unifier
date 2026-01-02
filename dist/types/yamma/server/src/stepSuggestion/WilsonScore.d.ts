export interface WilsonScoreArgs {
    totalVotes: number;
    upVotes: number;
}
export interface WilsonScoreInterval {
    leftSide: number;
    rightSide: number;
}
export declare function calculateWilsonScore(wilsonScoreArgs: WilsonScoreArgs): WilsonScoreInterval;
