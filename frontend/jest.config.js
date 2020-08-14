const modules = [].join("|");

module.exports = {
  modulePathIgnorePatterns: [
    "<rootDir>/static/frontend/",
    "<rootDir>/node_modules/",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$":
      "jest-transform-stub",
  },
  transform: {
    "^.+\\.(ts|js|tsx)$": "babel-jest",
  },
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${modules})/)`],
};
