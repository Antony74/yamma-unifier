import { MmpParser } from 'yamma-server/src/mmp/MmpParser';

export const getDiagnosticsString = (mmpParser: MmpParser): string => {
    return mmpParser.diagnostics
        .map(({ range: { start }, severity, code, message }) => {
            return `${start.line}:${start.character} - ${severity} ${code}: ${message}`;
        })
        .join('\n');
};
