import { describe, expect, it } from 'vitest';
import { cli } from '../../src/cli/cli';

describe('cli', () => {
    it('exists', () => {
        expect(cli).toBeTruthy();
    });
});
