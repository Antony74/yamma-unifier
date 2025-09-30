/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        ...tsJestTransformCfg,
    },
};
