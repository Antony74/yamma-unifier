const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        ...tsJestTransformCfg,
    },
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    transformIgnorePatterns: ['/node_modules/(?!yamma-server)'],
};
