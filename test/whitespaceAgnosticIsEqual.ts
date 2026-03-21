// Determine if a character is white space in Metamath.
export const isMmWs = (ch: string): boolean => {
    // This doesn't include \v ("vertical tab"), as the spec omits it.
    return (
        ch === ' ' || ch === '\n' || ch === '\t' || ch === '\f' || ch === '\r'
    );
};

export const reduceWhitespace = (s: string): string => {
    type Result = { arr: string[]; ws: boolean };

    return s
        .trim()
        .split('')
        .reduce<Result>(
            (acc, char) => {
                if (isMmWs(char)) {
                    if (acc.ws) {
                        return acc;
                    } else {
                        return { arr: [...acc.arr, ' '], ws: true };
                    }
                } else {
                    return { arr: [...acc.arr, char], ws: false };
                }
            },
            { arr: [], ws: true },
        )
        .arr.join('');
};

export const whitespaceAgnosticIsEqual = (s1: string, s2: string): boolean => {
    return reduceWhitespace(s1) === reduceWhitespace(s2);
}