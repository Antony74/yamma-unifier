import { getHeapStatistics } from 'v8';

const bytesToMB = (bytes: number) => bytes / 1024 / 1024;

export const getUsedHeapMB = () => {
    return Math.ceil(bytesToMB(getHeapStatistics().used_heap_size));
};

export const getHeapLimitMB = () => {
    return Math.floor(bytesToMB(getHeapStatistics().heap_size_limit));
};
