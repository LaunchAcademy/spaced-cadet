export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  resolver: "jest-ts-webcompat-resolver"
};
