/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js?$": "babel-jest",
      "d3": "jest-transform-stub"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(d3|d3-*)/)"
    ]
};