import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            'yamma-server': path.resolve('yamma/server'),
        },
    },
    test: {
        include: ['test/**/*.test.ts'],
        coverage: { exclude: ['/yamma/**'] },
    },
});
