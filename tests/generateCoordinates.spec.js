const generateCoordinates = require("./generateCoordinates");

const newArray = generateCoordinates();

test("correctly generates array of coordinates from A1 to J10", () => {
  expect(newArray[0]).toBe("A1");
  expect(newArray[99]).toBe("J10");
  expect(newArray[13]).toBe("B4");
});
