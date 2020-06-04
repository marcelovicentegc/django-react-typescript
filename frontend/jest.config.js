const modules = [].join("|");

module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$":
      "jest-transform-stub"
  },
  transform: {
    "^.+\\.(ts|js|tsx)$": "babel-jest"
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  verbose: true,
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${modules})/)`]
};
