const Ship = require("./Ship");
const Player = require("./Player");

const destroyer = new Ship(2);
const testPlayer = new Player("test", [destroyer]);

test("correctly provides the outcome to the attack on player's board", () => {
  testPlayer.gameboard.placeShip(destroyer, "B2");
  expect(testPlayer.getAttacked("B3")).toBe("hit");
});
