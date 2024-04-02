// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
const { TextDecoder, TextEncoder } = require("util");

module.exports = {
globals: {
    TextDecoder: TextDecoder,
    TextEncoder: TextEncoder,
},
};

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
