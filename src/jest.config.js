// const { defaults } = require("jest-config");
module.exports = {
  collectCoverageFrom: ['**/*.{jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/coverage/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/../node_modules/babel-jest',
    '^.+\\.less$': '<rootDir>/lessTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss|less)$'],
  //   moduleNameMapper: {
  //     '\\.(css|less)$': '<rootDir>/test.mock.js',
  //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //       '<rootDir>/test.mock.js',
  //   },
  moduleNameMapper: {
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
  },
};

// console.log(defaults);