import { Connection, Diagnostic, Position, Range, TextEdit } from 'vscode-languageserver';
import { MmToken } from '../grammar/MmLexer';
import { MmpParserErrorCode, MmpParserWarningCode } from '../mmp/MmpParser';
import { MmParserErrorCode } from './MmParser';
export declare function AreArrayTheSame(array1: any[], array2: any[]): boolean;
/**
 * Splits a string and also returns the position of each substring
 * @param str string to be split
 * @param regex regular expression to match (the negation of the separator)
 * @returns two arrays: the substrings and their position in the original string
 */
export declare function splitWithPosition(str: string, regex: RegExp): {
    subStrings: string[];
    positions: number[];
};
/**
 * Splits a string and also returns the position of each substring
 * @param str string to be split
 * @param regex regular expression to match (the negation of the separator)
 * @returns an array of tokens (string and starting position)
 */
export declare function splitToTokens(str: string, regex: RegExp, currentLine: number, fistCharColumn: number): MmToken[];
export declare function splitToTokensDefaultInLine(str: string, line: number): MmToken[];
export declare function splitToTokensDefaultInLineColumn(str: string, line: number, fistCharColumn: number): MmToken[];
export declare function splitToTokensAllowingForEmptyValues(str: string, separator: string, line: number, fistCharColumn: number): MmToken[];
/**
 * Splits a string with respect to blank separators and also returns the position of each substring
 * @param str string to be split
 * @returns
 */
export declare function splitToTokensDefault(str: string): MmToken[];
/**
 * Retuns the range of a string
 * @param token string for wich the range has to be computed
 * @param line the string is assumed to be on a single line
 * @param startCharacter the column where the string begins
 */
export declare function range(token: string, line: number, startCharacter: number): Range;
export declare function currentDateTimeWithMilliseconds(): string;
export declare function consoleLogWithTimestamp(message: string): void;
export declare function notifyProgressWithTimestampAndMemory(message: string, current: number, total: number): void;
/**
 * Concats strings adding a space between each of them
 * @param stringArray array of strings to concat
 */
export declare function concatWithSpaces(stringArray: string[]): string;
/** builds a formula where each symbol is surrounded exactly by one space,
 * on both side
 */
export declare function normalizedFormula(stringArray: string[]): string;
/**
 * Concats strings adding a space between each of them, but skips the first skip items
 * @param skip numbero of elements to skip
 * @param stringArray
 * @returns
 */
export declare function concatWithSpacesSkippingStart(skip: number, stringArray: string[]): string;
/**
 * Concats strings adding a comma between each of them
 * @param stringArray
 * @returns
 */
export declare function concatWithCommas(stringArray: string[]): string;
/**
 * Concats token values adding the given separatore between each of them
 * @param tokens array of tokens to concat
 * @param separator separator to be added between tokens
 * @returns a string where token values are concatenated, separated by the separator
 */
export declare function concatTokenValuesWithSeparator(tokens: MmToken[], separator: string): string;
export declare function concatTokenValuesOrUndefinedWithSeparator(tokens: (MmToken | undefined)[], separator: string): string;
/**
 * Concats token values adding a space between each of them
 * @param tokens array of tokens to concat
 * @returns
 */
export declare function concatTokenValuesWithSpaces(tokens: MmToken[]): string;
/**
 * returns a one character range, starting at position
 * @param position the starting position for the one character range
 * @returns
 */
export declare function oneCharacterRange(position: Position): Range;
export declare const dummyRange: Range;
export declare function dummyToken(value: string): MmToken;
export declare function removeItemsFromEndOfArray(array: any[], numberOfElementsToBeRemoved: number): void;
/** rebuilds the original string, inserting the right number of spaces and of endOfLine characters */
export declare function rebuildOriginalStringFromTokens(tokens: MmToken[]): string;
export declare function doesDiagnosticsContain(diagnostics: Diagnostic[], errorCode: MmpParserErrorCode | MmpParserWarningCode | MmParserErrorCode): boolean;
export declare function fromTokensToStrings(tokens: MmToken[]): string[];
export declare function fromStringsToTokens(stringArray: string[]): MmToken[];
/** returns the range of the whole array of tokens; it cannot be invoked with empty arrays */
export declare function arrayRange(tokens: MmToken[]): Range;
export declare function notifyInformation(informationMessage: string, connection: Connection): void;
export declare function notifyShortInformation(informationMessage: string, connection: Connection): void;
export declare function notifyWarning(warningMessage: string, connection: Connection): void;
export declare function notifyError(errorMessage: string, connection: Connection): void;
/** returns the intersection of a (finite) set ; if the set is empty,
 * we return undefined
*/
export declare function intersection<T>(set: Set<Set<T>>): Set<T> | undefined;
export declare function intersection2<T>(a: Set<T>, b: Set<T>): Set<T>;
export declare function subset<T>(a: Set<T>, b: Set<T>): boolean;
export declare function union2<T>(a: Set<T>, b: Set<T>): Set<T>;
export declare function difference<T>(a: Set<T>, b: Set<T>): Set<T>;
export declare function notifyProgress(current: number, total: number, message?: string): void;
export declare function applyTextEdits(textEdits: TextEdit[], textDocumentUri: string, connection: Connection): Promise<void>;
export declare function updateOccurrences<T>(map: Map<T, number>, key: T): Map<T, number>;
