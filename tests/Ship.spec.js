const Ship = require("./Ship");

const testCruiser = new Ship(3);

testCruiser.setCoordinates(["D1", "E1", "F1"]);

test("hit() removes the coordinate from array", () => {
  testCruiser.hit("E1");
  expect(testCruiser.getCoordinates).toEqual(["D1", "F1"]);
});
test("isSunk() correctly reports that ship is not sunk when coordinates array is not empty", () => {
  expect(testCruiser.isSunk()).toBe(false);
});
test("isSunk() returns true is the ship's coordinate array is empty", () => {
  testCruiser.hit("D1");
  testCruiser.hit("F1");
  expect(testCruiser.isSunk()).toBe(true);
});
test("rotate() sets the isVertical property to opposite", () => {
  testCruiser.rotate();
  expect(testCruiser.isVertical).toEqual(true);
});
