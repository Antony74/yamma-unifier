import * as color from 'picocolors';
import { MmpParser } from 'yamma-server/src/mmp/MmpParser';

const severityFnArray = [
    color.red,
    color.red,
    color.yellowBright,
    color.blue,
    color.gray,
];

const severityStringArray = [
    'error',
    'error',
    'warning',
    'information',
    'hint',
].map((value, index) => severityFnArray[index](value));

export const getDiagnosticsString = (
    filename: string,
    mmpParser: MmpParser,
): string => {
    const lines = mmpParser.textToParse.split('\n');

    return mmpParser.diagnostics
        .map(
            ({
                range: {
                    start: { line, character },
                    end,
                },
                severity,
                code,
                message,
            }) => {
                const filenameString = color.cyanBright(filename);
                const lineString = color.yellowBright(line);
                const characterString = color.yellowBright(character);
                const severityString = severityStringArray[severity ?? 1];
                const severityFn = severityFnArray[severity ?? 1];
                const codeString = color.gray(`${code}:`);

                const lineNumberString = color.bgWhite(color.black(line));
                const lineText = lines[line].replaceAll('\r', '');

                const lineTextSpaces = color.bgWhite(
                    ' '.repeat(`${line}`.length),
                );

                const underline = [
                    ' '.repeat(character),
                    severityFn(
                        '~'.repeat(Math.max(end.character - character, 1)),
                    ),
                ].join('');

                return [
                    `${filenameString}:${lineString}:${characterString} - ${severityString} ${codeString} ${message}`,
                    ``,
                    `${lineNumberString} ${lineText}`,
                    `${lineTextSpaces} ${underline}`,
                    ``,
                ].join('\n');
            },
        )
        .join('\n');
};
