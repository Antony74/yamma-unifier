import { MmToken } from 'yamma-server/src/grammar/MmLexer';

// Determine if a character is white space in Metamath.
let isWhitespace = (ch: string): boolean => {
    // This doesn't include \v ("vertical tab"), as the spec omits it.
    return (
        ch === ' ' || ch === '\n' || ch === '\t' || ch === '\f' || ch === '\r'
    );
};

export const tokenize = (data: string): MmToken[] => {
    const tokens: MmToken[] = [];
    let token: MmToken;
    let line = 0;
    let column = 0;
    let ch = '';

    for (let index = 0; index < data.length; ) {
        // Get whitespace
        token = new MmToken('', line, column, 'ws');
        while (!!(ch = data.charAt(index)) && isWhitespace(ch)) {
            token.value += ch;
            ++index;
            if (ch === '\n') {
                ++line;
                column = 0;
            } else {
                ++column;
            }
        }

        if (token.value.length) {
            tokens.push(token);
        }

        // Get token
        token = new MmToken('', line, column);
        while (!!(ch = data.charAt(index)) && !isWhitespace(ch)) {
            if (ch < '!' || ch > '~') {
                throw new Error(
                    'Invalid character read with code 0x' +
                        ch.charCodeAt(0).toString(16),
                );
            }

            token.value += ch;
            ++index;
            ++column;
        }

        if (token.value.length) {
            tokens.push(token);
        }
    }

    return tokens;
};
