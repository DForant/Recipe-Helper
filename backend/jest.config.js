module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // This tells Jest to use babel-jest for transpiling files with .js, .jsx, .ts, and .tsx extensions.
    },
    testEnvironment: 'node', // This sets the testing environment to Node.js.
  };
  