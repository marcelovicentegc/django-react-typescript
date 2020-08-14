const crypto = require("crypto");
jest.setTimeout(1000 * 60);

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
  },
});
