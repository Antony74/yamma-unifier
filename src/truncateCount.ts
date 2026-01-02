import { MmParserEvents } from '../yamma/server/src/mm/MmParser';
import { getParserAndTokenReader } from './helpers/getParserAndTokenReader';
import { UnifierConfig } from './unifierDefinitions';

export const truncateCount = (
    mmData: string,
    count: number,
    config?: UnifierConfig,
): string => {
    const { mmParser, tokenReader } = getParserAndTokenReader(config, mmData);

    let start = 0;
    let end = mmData.length;
    let closingString = '';

    mmParser.on(MmParserEvents.newProvableStatement, () => {
        --count;
        if (count === 0) {
            end = tokenReader.lastIndex + tokenReader.lastTokenLength;
            closingString = tokenReader.getClosingString();
        }
    });

    mmParser.parseFromTokenReader(tokenReader);

    return [mmData.substring(start, end), closingString].join('');
};
