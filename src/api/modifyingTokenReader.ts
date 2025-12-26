import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokenReader } from 'yamma-server/src/mm/TokenReader';

export class TokenReaderWithIndex extends TokenReader {
    lastToken: MmToken | undefined;
    private index = 0;
    private line = 0;
    private column = 0;

    constructor(
        public readonly mmData: string,
        tokens: MmToken[],
    ) {
        super(tokens);
    }

    Read(): MmToken | undefined {
        this.lastToken = super.Read();
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
}

export const logToken = (token: MmToken | undefined) => {
    if (token) {
        console.log(`${token.value} ${token.line} ${token.column}`);
    }
};
