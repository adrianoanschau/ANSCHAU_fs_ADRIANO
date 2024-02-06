export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "^@/mocks/(.*)$": ["<rootDir>/src/test/__mocks__/$1"],
    "^@/components/(.*)$": ["<rootDir>/src/components/$1"],
    "^@/contexts/(.*)$": ["<rootDir>/src/contexts/$1"],
    "^@/hooks/(.*)$": ["<rootDir>/src/hooks/$1"],
    "^@/helpers/(.*)$": ["<rootDir>/src/helpers/$1"],
    "^@/routes/(.*)$": ["<rootDir>/src/routes/$1"],
  },
};
