import { MmParserEvents } from 'yamma-server/src/mm/MmParser';
import { getParserAndTokenReader } from './helpers/getParserAndTokenReader';
import { UnifierConfig } from './unifierDefinitions';

export const truncateCount = (
    mmData: string,
    count: number,
    config?: UnifierConfig,
): string => {
    const { mmParser, tokenReader } = getParserAndTokenReader(config, mmData);

    const chunks: string[] = [];
    let start = 0;
    let end = mmData.length;

    mmParser.on(MmParserEvents.newProvableStatement, () => {
        --count;
        if (count === 0) {
            end = tokenReader.lastIndex + tokenReader.lastTokenLength;
        }
    });

    mmParser.parseFromTokenReader(tokenReader);

    chunks.push(mmData.substring(start, end));

    return Buffer.concat(chunks.map(Buffer.from)).toString();
};
