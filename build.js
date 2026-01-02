require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
});
