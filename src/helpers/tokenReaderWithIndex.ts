import { MmToken } from '../../yamma/server/src/grammar/MmLexer';
import { TokenReader } from '../../yamma/server/src/mm/TokenReader';

export class TokenReaderWithIndex extends TokenReader {
    lastToken: MmToken | undefined;
    private index = 0;
    private line = 0;
    private column = 0;
    private inComment = false;
    private scopeDepth = 0;

    constructor(
        public readonly mmData: string,
        tokens: MmToken[],
    ) {
        super(tokens);
    }

    Read(): MmToken | undefined {
        this.lastToken = super.Read();

        if (!!this.lastToken) {
            const value = this.lastToken.value;

            if (this.inComment) {
                if (value === '$)') {
                    this.inComment = false;
                } else if (value.includes('$(')) {
                    throw new Error('Characters $( found in a comment');
                }
                if (value.includes('$)')) {
                    throw new Error('Characters $) found in a comment');
                }
            } else {
                if (value === '${') {
                    ++this.scopeDepth;
                } else if (value === '$}') {
                    --this.scopeDepth;
                    if (this.scopeDepth < 0) {
                        throw new Error('$} without corresponding ${');
                    }
                }
            }
        }

        return this.lastToken;
    }

    get lastIndex(): number {
        while (
            this.line < (this.lastToken?.line ?? 0) ||
            (this.line === (this.lastToken?.line ?? 0) &&
                this.column < (this.lastToken?.column ?? 0))
        ) {
            switch (this.mmData[this.index]) {
                case '\r':
                    break;

                case '\n':
                    ++this.line;
                    this.column = 0;
                    break;

                default:
                    ++this.column;
            }
            ++this.index;
        }

        return this.index;
    }

    get lastTokenLength(): number {
        return this.lastToken?.value.length ?? 0;
    }

    getClosingString(): string {
        const lines: string[] = [''];

        if (this.inComment) {
            // Would be trivial to close, but this should not be needed to truncate about a particular proof
            throw new Error(`getClosingString called while in comment`);
        }

        for (let index = this.scopeDepth; index > 0; --index) {
            lines.push('  '.repeat(index) + '$}');
        }

        lines.push('');

        return lines.join('\n');
    }
}

export const logToken = (token: MmToken | undefined) => {
    if (token) {
        console.log(`${token.value} ${token.line} ${token.column}`);
    }
};
