import {
    MmParserEvents,
    AssertionParsedArgs,
} from '../yamma/server/src/mm/MmParser';

import { getParserAndTokenReader } from './helpers/getParserAndTokenReader';
import { UnifierConfig } from './unifierDefinitions';

export const truncateBefore = (
    mmData: string,
    proofId: string,
    config?: UnifierConfig,
): string => {
    const { mmParser, tokenReader } = getParserAndTokenReader(config, mmData);

    let start = 0;
    let end = 0;
    let closingString = '';
    let found = false;

    mmParser.on(
        MmParserEvents.newProvableStatement,
        (parsedArgs: AssertionParsedArgs) => {
            if (found === true) {
            } else if (parsedArgs.labeledStatement.Label === proofId) {
                found = true;
            } else {
                end = tokenReader.lastIndex + tokenReader.lastTokenLength;
                closingString = tokenReader.getClosingString();
            }
        },
    );

    mmParser.parseFromTokenReader(tokenReader);

    if (!found) {
        throw new Error(`proofId ${proofId} was not found`);
    }

    if (end === 0) {
        throw new Error(`can't truncate before the very first proof`);
    }

    return [mmData.substring(start, end), closingString].join('');
};
