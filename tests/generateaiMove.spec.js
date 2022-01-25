const generateaiMove = require("./generateaiMove");
const generateCoordinates = require("./generateCoordinates");

const array = generateCoordinates();

test("generates a move within provided range", () => {
  expect(array.indexOf(generateaiMove(array))).not.toBe(-1);
});
