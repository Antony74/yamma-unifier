import { MmParser, MmParserEvents, AssertionParsedArgs } from "yamma-server/src/mm/MmParser";
import { TokenReaderWithIndex } from "./modifyingTokenReader";

export type ProofToReplace = { label: string; start: number; end: number };

export const parseForCompressOrDecompressProofs = (
    mmParser: MmParser,
    tokenReader: TokenReaderWithIndex,
    proofIds: string[],
    all: boolean,
): ProofToReplace[] => {
    const proofsToReplace: ProofToReplace[] = [];

    let lastLabelStart: number;

    mmParser.on(MmParserEvents.newLabel, () => {
        lastLabelStart = tokenReader.lastIndex;
    });

    mmParser.on(
        MmParserEvents.newProvableStatement,
        (assertionArgs: AssertionParsedArgs) => {
            const label = assertionArgs.labeledStatement.Label;
            if (
                all ||
                proofIds.find((wantedLabel) => label === wantedLabel) !==
                    undefined
            ) {
                const start = lastLabelStart;
                const end = tokenReader.lastIndex + tokenReader.lastTokenLength;

                proofsToReplace.push({ label, start, end });
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    return proofsToReplace;
};