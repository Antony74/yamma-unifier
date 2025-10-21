import { UserConfig } from 'vite';

const config: UserConfig = {
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'yamma-unifier',
            fileName: 'index',
            formats: ['cjs'],
        },
        rollupOptions: {
            external: [
                'events',
                'fs',
                'fs/promises',
                'picocolors',
                'readline',
                'stream',
                'url',
                'worker_threads',
            ],
        },
        minify: false,
        sourcemap: true,
    },
};

export default config;
