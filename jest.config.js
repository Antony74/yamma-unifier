module.exports = {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    transformIgnorePatterns: ['/node_modules/(?!yamma-server)'],
};
