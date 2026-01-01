import { MmParser } from 'yamma-server/src/mm/MmParser';
import { UnifierConfig } from '../unifierDefinitions';
import { TokenReaderWithIndex } from './tokenReaderWithIndex';
export declare const getParserAndTokenReader: (config: UnifierConfig | undefined, mmData: string) => {
    tokenReader: TokenReaderWithIndex;
    mmParser: MmParser;
};
