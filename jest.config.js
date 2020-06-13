// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,

    moduleFileExtensions: [
        "ts",
        "js"
    ],

    transform: {
        "^.+\\.(ts)$": "babel-jest"
    },

    testMatch: [
        "**/__tests__/**/*.test.(ts|js)"
    ],

    testEnvironment: "node"
};