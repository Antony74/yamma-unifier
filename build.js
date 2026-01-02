const path = require('path');

require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
    alias: {
        'yamma-server': path.resolve('yamma/server'),
    },
});
