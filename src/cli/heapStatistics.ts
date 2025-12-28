import { getHeapStatistics } from 'v8';
import { MmParser, MmParserEvents } from 'yamma-server/src/mm/MmParser';

const bytesToMB = (bytes: number) => bytes / 1024 / 1024;

export const getUsedHeapMB = () => {
    return Math.ceil(bytesToMB(getHeapStatistics().used_heap_size));
};

export const getHeapLimitMB = () => {
    return Math.floor(bytesToMB(getHeapStatistics().heap_size_limit));
};

let peakMem = getUsedHeapMB();
let lastPoll = performance.now();

export const pollMemory = () => {
    if (performance.now() + 50 >= lastPoll) {
        peakMem = Math.max(peakMem, getUsedHeapMB());
        lastPoll = performance.now();
    }
};

export const getPeakMB = () => peakMem;

export const monitorMmParser = (mmParser: MmParser) => {
    mmParser.on(MmParserEvents.newLabel, pollMemory);
};
