import { MmToken } from 'yamma-server/src/grammar/MmLexer';
import { TokenReader } from 'yamma-server/src/mm/TokenReader';

export class ModifyingTokenReader extends TokenReader {
    private writing = true;

    chunks: string[] = [''];

    Read(): MmToken | undefined {
        let token: MmToken | undefined;

        while (!!(token = super.Read())) {
            if (this.writing) {
                this.chunks[this.chunks.length - 1] += token.value;
            }

            if (token.type !== 'ws') {
                break;
            }
        }

        return token;
    }

    setWriting(writing: boolean) {
        if (writing === true && this.writing === false) {
            this.chunks.push('');
        }

        this.writing = writing;
    }
}
