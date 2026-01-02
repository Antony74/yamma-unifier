import {
    MmParserEvents,
    AssertionParsedArgs,
} from '../yamma/server/src/mm/MmParser';

import { getParserAndTokenReader } from './helpers/getParserAndTokenReader';
import { UnifierConfig } from './unifierDefinitions';

export const truncateAfter = (
    mmData: string,
    proofId: string,
    config?: UnifierConfig,
): string => {
    const { mmParser, tokenReader } = getParserAndTokenReader(config, mmData);

    let start = 0;
    let end = mmData.length;
    let closingString = '';
    let found = false;

    mmParser.on(
        MmParserEvents.newProvableStatement,
        (parsedArgs: AssertionParsedArgs) => {
            if (parsedArgs.labeledStatement.Label === proofId) {
                end = tokenReader.lastIndex + tokenReader.lastTokenLength;
                closingString = tokenReader.getClosingString();
                found = true;
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    if (!found) {
        throw new Error(`proofId ${proofId} was not found`);
    }

    return [mmData.substring(start, end), closingString].join('');
};
