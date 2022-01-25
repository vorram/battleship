const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

const testBoard = new Gameboard();
const testCruiser = new Ship(3);
const testBattleship = new Ship(4);
const testACCarrier = new Ship(5);
const testBoard2 = new Gameboard();
const submarine = new Ship(1);

test("correctly sets coordinates for a horizontal ship", () => {
  testBoard.placeShip(testCruiser, "D3");
  expect(testCruiser.getCoordinates).toEqual(["D3", "D4", "D5"]);
  expect(testBoard.getShips).toHaveLength(1);
});

test("correctly sets coordinates for a vertical ship", () => {
  testBattleship.rotate();
  testBoard.placeShip(testBattleship, "E3");
  expect(testBattleship.getCoordinates).toEqual(["E3", "F3", "G3", "H3"]);
  expect(testBoard.getShips).toHaveLength(2);
});

test("doesn't place the ship if the coordinates are out of range or occupied", () => {
  testBoard.placeShip(testACCarrier, "F2");
  testBoard.placeShip(testACCarrier, "G7");
  testBoard.placeShip(testACCarrier, "I6");
  expect(testACCarrier.getCoordinates).toEqual(["I6", "I7", "I8", "I9", "I10"]);
  expect(testBoard.getShips).toHaveLength(3);
});

test("receiveAttack() reports missed attack correctly", () => {
  expect(testBoard.receiveAttack("D6")).toBe("miss");
});

test("receiveAttack() reports hits correctly", () => {
  expect(testBoard.receiveAttack("D3")).toBe("hit");
});

test("receiveAttack() reports sunk ship correctly", () => {
  expect(testBoard.receiveAttack("D4")).toBe("hit");
  expect(testBoard.receiveAttack("D5")).toBe("sunk");
});

test("receiveAttack() reports game over when all ships are sunk", () => {
  testBoard2.placeShip(submarine, "A1");
  expect(testBoard2.receiveAttack("A1")).toBe("game over");
});
