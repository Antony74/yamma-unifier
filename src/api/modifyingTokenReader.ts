import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokenReader } from 'yamma-server/src/mm/TokenReader';

export class ModifyingTokenReader extends TokenReader {
    private writing = true;

    output: string = '';

    Read(): MmToken | undefined {
        let token: MmToken | undefined;

        while (!!(token = super.Read())) {
            if (this.writing) {
                this.output += token.value;
            }

            if (token.type !== 'ws') {
                break;
            }
        }

        return token;
    }

    setWriting(writing: boolean) {
        this.writing = writing;
    }
}
